export default class CalendarEvent {
    title: string;
    start: string;
    end: string;
    allDay: boolean;
    calendarId: string;

    constructor(title: string, start: string, end: string, allDay: boolean, calendarId: string) {
        this.title = title;
        this.start = start;
        this.end = end;
        this.allDay = allDay;
        this.calendarId = calendarId;
    }

    changeTitle(title: string) {
        this.title = title;
    }

    changeStart(start: string) {
        this.start = start;
    }

    changeEnd(end: string) {
        this.end = end;
    }

    changeAllDay(allDay: boolean) {
        this.allDay = allDay;
    }

    changeCalendarId(calendarId: string) {
        this.calendarId = calendarId;
    }
    
    static async create(event: CalendarEvent) {
        const newEvent = new CalendarEvent(
            event.title,
            event.start,
            event.end,
            event.allDay,
            event.calendarId
        );
        await newEvent.save();
        return newEvent;
    }

    async save() {
        // save to database
    }

    
}