export interface NewUser {
    email: string;
    name: string;
    password: string;
    salt: string;
}

export interface User extends NewUser {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

