export interface NewCalendar {
    name: string;
    color: string;
    userId: string;
}

export interface Calendar extends NewCalendar {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}
