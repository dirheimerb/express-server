CREATE TABLE IF DOES NOT EXIST Calendar (
    id Text NOT NULL PRIMARY KEY,
    name Text NOT NULL,
    description Text, 
    color Text,
    members Text[],

    FOREIGN KEY (members) REFERENCES Member (id)
);

CREATE TABLE IF DOES NOT EXIST CalendarEvent (
    calendar_id Text NOT NULL,
    event_id Text NOT NULL,
    PRIMARY KEY (calendar_id, event_id),
    FOREIGN KEY (calendar_id) REFERENCES Calendar (id),
    FOREIGN KEY (event_id) REFERENCES Event (id)
);

CREATE TABLE IF DOES NOT EXIST CalendarMember (
    calendar_id Text NOT NULL,
    member_id Text NOT NULL,
    PRIMARY KEY (calendar_id, member_id),
    FOREIGN KEY (calendar_id) REFERENCES Calendar (id),
    FOREIGN KEY (member_id) REFERENCES Member (id)
);

CREATE TABLE IF DOES NOT EXIST CalendarOwner (
    calendar_id Text NOT NULL,
    owner_id Text NOT NULL,
    PRIMARY KEY (calendar_id, owner_id),
    FOREIGN KEY (calendar_id) REFERENCES Calendar (id),
    FOREIGN KEY (owner_id) REFERENCES Member (id)
);

CREATE TABLE IF DOES NOT EXIST CalendarTag (
    calendar_id Text NOT NULL,
    tag_id Text NOT NULL,
    PRIMARY KEY (calendar_id, tag_id),
    FOREIGN KEY (calendar_id) REFERENCES Calendar (id),
    FOREIGN KEY (tag_id) REFERENCES Tag (id)
);

CREATE TABLE IF DOES NOT EXIST CalendarTask (
    calendar_id Text NOT NULL,
    task_id Text NOT NULL,
    PRIMARY KEY (calendar_id, task_id),
    FOREIGN KEY (calendar_id) REFERENCES Calendar (id),
    FOREIGN KEY (task_id) REFERENCES Task (id)
);

