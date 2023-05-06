import { NewUser } from "@/models/users.model";
import prisma from "@/lib/prisma";

export const createUser = async (newUser: NewUser) => {
    const user = await prisma.user.create({
        data: newUser,
    });
    return user;
};

export const getAllUsers = async () => {
    const users = await prisma.user.findMany();
    return users;
}

export const getUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    });
    return user;
}

export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    return user;
}

export const updateUser = async (id: string, updatedUser: NewUser) => {
    const user = await prisma.user.update({
        where: {
            id: id
        },
        data: updatedUser
    });
    return user;
}

export const deleteUser = async (id: string) => {
    const user = await prisma.user.delete({
        where: {
            id: id
        }
    });
    return user;
}
