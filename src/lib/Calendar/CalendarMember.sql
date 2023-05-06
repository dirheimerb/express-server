CREATE TABLE IF DOES NOT EXIST CalendarMember (
    CalendarID Text NOT NULL,
    MemberID INTEGER NOT NULL,
    PRIMARY KEY (CalendarID, MemberID),
    FOREIGN KEY (CalendarID) REFERENCES Calendar (CalendarID),
    FOREIGN KEY (MemberID) REFERENCES Member (MemberID)
);

/* Create function to add calendar and member */
CREATE FUNCTION AddCalendarMember (CalendarID Text, MemberID Text)
RETURNS VOID AS $$
BEGIN
    INSERT INTO CalendarMember (CalendarID, MemberID)
    VALUES (CalendarID, MemberID);
END;
$$ LANGUAGE plpgsql;

/* Create function to remove calendar and member */
CREATE FUNCTION RemoveCalendarMember (CalendarID Text, MemberID Text)
RETURNS VOID AS $$
BEGIN
    DELETE FROM CalendarMember
    WHERE CalendarID = CalendarID AND MemberID = MemberID;
END;
$$ LANGUAGE plpgsql;
-- Path: src/lib/Calendar/CalendarMember.sql