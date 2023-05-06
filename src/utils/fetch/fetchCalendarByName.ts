import prisma from "../../lib/prisma";

export async function fetchCalendars(email: string) {
    const user = await prisma.user.findUnique({
        where: {
          id: email
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
  return calendar;
}