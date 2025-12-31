import { Request, Response } from 'express';
import { prisma } from '../prisma/client';

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
  res.json(users);
  } catch (e) {
    console.log(e);
  }
}