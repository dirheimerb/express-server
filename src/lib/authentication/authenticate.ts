import { PrismaClient } from '@prisma/client';
import { comparePassword } from './password-check';

const prisma = new PrismaClient();

export async function authenticateUser(
  email: string,
  password: string
): Promise<boolean> {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error('User not found');
  }

  const isMatch = await comparePassword(password, user.password);
  return isMatch;
}
