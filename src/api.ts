import express, {Request, Response, NextFunction} from 'express';
import cors from 'cors';
import getForecast from "./lib/Weather/getForcast";
import getHourlyForecast from "./lib/Weather/getHourlyForecast";
import { getDistanceMiles } from "./utils/geo";
import getLatLongFromZipCode from "./utils/getLocation";
import { generateMonthGridWithAdjacentMonths } from "./utils/dates";
import { hashPassword } from "./lib/authentication/password-hash";
import { authenticateUser } from "./lib/authentication/authenticate";
import prisma from "./lib/prisma";
import { CalendarEvents } from './models/calendarEvent.model';
import { fetchUser } from "./utils/fetch/fetchUser";
import { fetchCalendars } from "./utils/fetch/fetchCalendarByName";

interface CurrentUser {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export const app = express();

app.use(cors({ origin: true }));

app.use(express.json());
app.use(express.raw({ type: 'application/vnd.custom-type' }));
app.use(express.text({ type: 'text/html' }));

// Healthcheck endpoint
app.get('/', (req, res) => {
  res.status(200).send({ status: 'ok' });
});

let currentUser: CurrentUser | null = null;


app.post('/users', async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });
  res.send({ user });
});
app.post('/auth/login', async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const user = await authenticateUser(email, password);
  if (user === true) {
    currentUser = await fetchUser(email);
    res.send({ message: 'Login successful' });
  } else {
    res.status(401).send({ message: 'Login failed' });
  }
});

app.get(
  "/calendar/:month/:year",
  async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params as { month: string; year: string };
    const monthGrid = generateMonthGridWithAdjacentMonths(parseInt(params.month), parseInt(params.year));
    res.send({ monthGrid });
  });

app.get(
  "/forecast/:postalCode",
  async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params as { postalCode: string };
    const forecast = await getForecast(params.postalCode);
    res.send({ forecast });
  }
);

app.get(
  "/hourly-forecast/:postalCode",
  async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params as { postalCode: string };
    const hourlyForecast = await getHourlyForecast(params.postalCode);
    res.send({ hourlyForecast });
  }
);

app.get(
  "/location/:postalCode",
  async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params as { postalCode: string };
    const Location = await getLatLongFromZipCode(params.postalCode);
    console.log(`Latitude: ${Location.lat}, Longitude: ${Location.lon}`);
    res.send({ Location });
  }
);

app.get(
  "/location-difference",
  (req: Request, res: Response, next: NextFunction) => {
    const lat1 = req.body.lat1;
    const lon1 = req.body.lon1;
    const lat2 = req.body.lat2;
    const lon2 = req.body.lon2;
    const distance = getDistanceMiles(lat1, lon1, lat2, lon2);
    res.send({ distance });
    next();
  }
);

app.get(
  "/calendar/:month/:year",
  async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params as { month: string; year: string };
    const monthGrid = generateMonthGridWithAdjacentMonths(parseInt(params.month), parseInt(params.year));
    res.send({ monthGrid });
  });

  app.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await prisma.user.findMany();
    res.send({ users });
  });
  
  app.get('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params as { id: string };
    const user = await prisma.user.findUnique({
      where: {
        id: params.id
      }
    });
    res.send({ user });
  });
  
  app.get('/users/email/:email', async (req: Request, res: Response, next: NextFunction) => {
      const params = req.params as { email: string };
      const user = await prisma.user.findUnique({
        where: {
          email: params.email
        }
      });
  
      console.log('param', params.email);
      res.send({ user });
    });
  
  app.delete('/users/:id', async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params as { id: string };
    const user = await prisma.user.delete({
      where: {
        id: params.id
      }
    });
    res.send({ user });
  });
  
  app.get('/fetch/calendars/:email', async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params as { email: string };
    const calendars = fetchCalendars(params.email);
    res.send({ calendars });
  });
  
  
  app.post('/calendar-events', async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, start, end, calendarName } = req.body
    const updatedStart = new Date(start).toLocaleString();
    const updatedEnd = new Date(end).toLocaleString();
    const user = await prisma.user.findUnique({
      where: {
        email: currentUser?.email
      },
      include: {
        calendars: true
      }
    });
    const calendarEvent = await prisma.calendarEvent.create({
      data: {
        title,
        description,
        start: updatedStart,
        end: updatedEnd,
        calendar: {
          connect: {
            id: user?.calendars.find((calendar) => calendar.name === calendarName)?.id
          }
        }        
      }
    });
    res.send({ calendarEvent });
  });
  
  app.put('/edit/calendar-events/:id', async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params as { id: string };
    const { title, description, start, end, calendarId } = req.body as CalendarEvents;
    const updatedStart = new Date(start).toLocaleString();
    const updatedEnd = new Date(end).toLocaleString();
    const calendarEvent = await prisma.calendarEvent.update({
      where: {
        id: params.id
      },
      data: {
        title,
        description,
        start: updatedStart,
        end: updatedEnd,
        calendarId
      }
    });
    res.send({ calendarEvent });
  });
  
  
  
  app.delete('/calendar-events/:id', async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params as { id: string };
    const calendarEvent = await prisma.calendarEvent.delete({
      where: {
        id: params.id
      }
    });
    res.send({ calendarEvent });
  });
  
  app.get('/calendar-events/email/:email', async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params as { email: string };
    const calendarEvents = await prisma.calendarEvent.findMany({
      where: {
        calendar: {
          user: {
            email: params.email
          }
        }
      }
    });
    res.send({ calendarEvents });
  });

  app.get('/api/fetch/user/:email', async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params as { email: string };
    const user = await fetchUser(params.email);
    res.send({ user });
  });
  
  
  app.post('/api/event/calendars', async (req: Request, res: Response, next: NextFunction) => {
    const { name, color } = req.body;
    
    const calendar = await prisma.calendar.create({
      data: {
        name,
        color,
        user: { 
          connect: {
            id: currentUser?.id
          }
        },
        calendarMembers: {
          create: {
            email: currentUser!.email,
            role: 'admin'
          }
        }
      }   
    });
    res.send({ calendar });
  });
  
  app.delete('/api/event/calendars/:id', async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params as { id: string };
    const calendar = await prisma.calendar.delete({
      where: {
        id: params.id
      }
    });
    res.send({ calendar });
  });
  
  
  app.get('/api/event/calendars/email/:email', async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params as { email: string };
    const user = await prisma.user.findUnique({
      where: {
        id: params.email
      },
      include: {
        calendars: true
      }
    });
    const calendarId = user?.calendars.map((calendar) => calendar.id);
    const calendar = await prisma.calendar.findMany({
      where: {
        id: {
          in: calendarId
        },
      },
    });
    res.send({ calendar });
  });
  
  
  app.get('/api/event/calendars/:id', async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params as { id: string };
    const calendar = await prisma.calendar.findUnique({
      where: {
        id: params.id
      }
    });
    res.send({ calendar });
  });
  app.post('/api/event/calendars/add/member/:email', async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params as { email: string };
    const { addUserEmail, role } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email: params.email
      },
      include: {
        calendars: true
      }
    }); 
    const calendar = await prisma.calendarMember.create({
      data: {
        calendarId: user!.calendars.map((calendar) => calendar.id)[0],
        email: addUserEmail,
        role: role
      }
    });
    res.send({ calendar });
  });
  
  app.get('/api/event/calendars/members/:email', async (req: Request, res: Response, next: NextFunction) => {
    const params = req.params as { email: string };
    const user = await prisma.user.findUnique({
      where: {
        email: params.email
      },
      include: {
        calendars: true
      }
    });

    const calendar = await prisma.calendar.findUnique({
      where: {
        id: user!.calendars.map((calendar) => calendar.id)[0]
      },
      include: {
        calendarMembers: true
      }
    });
    res.send({ calendar });
  });
  

const api = express.Router();

api.get('/hello', (req, res) => {
  res.status(200).send({ message: 'hello world' });
});

// Version the api
app.use('/v1', api);
