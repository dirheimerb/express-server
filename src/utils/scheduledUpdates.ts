import cron from 'node-cron';
import { getCurrentWeather } from './currentWeather';


const weatherUpdate = cron.schedule('* */2 * * *', () => {
        console.log('Running cron job');
        getCurrentWeather('45013').then((data) => {
            console.log(data);
        }).catch((error) => {
            console.log(error);
        });
    }, {
        scheduled: true,
        timezone: 'America/New_York'
    });

    weatherUpdate.start();


