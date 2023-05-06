import prisma from "../../lib/prisma";

export interface UserResponse {
    id: string;
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
};

export const fetchUser = async (email: string): Promise<UserResponse | null> => {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    return user;
};