import { NewCalendar } from "@/models/calendar.model";
import prisma from "@/lib/prisma";

export const createDefaultCalendar = async (userId: string) => {
    const calendar = await prisma.calendar.create({
        data: {
            name: "default",
            color: "#000000",
            userId: userId
        },
    });
    return calendar;
}


export const createCalendar = async (newCalendar: NewCalendar) => {
    const calendar = await prisma.calendar.create({
        data: newCalendar,
    });
    return calendar;
}

export const getAllCalendars = async () => {
    const calendars = await prisma.calendar.findMany();
    return calendars;
}

export const getCalendarsByUserId = async (userId: string) => {
    const calendars = await prisma.calendar.findMany({
        where: {
            userId: userId
        }
    });
    return calendars;
}

export const getCalendarById = async (id: string) => {
    const calendar = await prisma.calendar.findUnique({
        where: {
            id: id
        }
    });
    return calendar;
}

export const updateCalendar = async (id: string, updatedCalendar: NewCalendar) => {
    const calendar = await prisma.calendar.update({
        where: {
            id: id
        },
        data: updatedCalendar
    });
    return calendar;
}

export const deleteCalendar = async (id: string) => {
    const calendar = await prisma.calendar.delete({
        where: {
            id: id
        }
    });
    return calendar;
}

