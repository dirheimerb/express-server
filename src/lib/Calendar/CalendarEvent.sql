CREATE TABLE IF DOES NOT EXIST CalendarEvent (
    CalendarID Text NOT NULL,
    EventID Text NOT NULL,
    PRIMARY KEY (CalendarID, EventID),
    FOREIGN KEY (CalendarID) REFERENCES Calendar (CalendarID),
    FOREIGN KEY (EventID) REFERENCES Event (EventID)
);