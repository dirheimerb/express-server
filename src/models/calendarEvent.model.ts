export interface NewCalendarEvent {
    title: string;
    description?: string;
    start: Date;
    end: Date;
    calendarId: string;
};

export interface CalendarEvents extends NewCalendarEvent {
    id: string;
    createdAt: Date;
    updatedAt: Date;
};