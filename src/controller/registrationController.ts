import { Request, Response } from 'express';
import { prisma } from '../prisma/client';
import bcrypt from "bcryptjs";
import { validationResult } from 'express-validator';

export async function registrationController(req: Request, res: Response) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Registration error', errors });
  }

  const { username, password } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      username
    },
  });

  if (user) {
    return res.status(400).json({ message: 'User already exists', user });
  }

  const hashPassword = await bcrypt.hash(password, 7);
  const userRole = await prisma.role.findFirst({
    where: {
      roles: "ADMIN"
    },
  });
  
  if (!userRole) {
    return res.status(500).json({ message: 'Role not found'})
  }

  await prisma.user.create({
    data: {
      username,
      password: hashPassword,
      role: { connect: { id: userRole.id } },
    }
  });

  return res.json({ message: 'User successfully registered' });

}