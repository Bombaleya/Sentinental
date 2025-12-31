import { Request, Response } from 'express';
import { prisma } from '../prisma/client';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from '../config';

const generateAccessToken = (id: number, roles: string[]) => {
  const payload = { id, roles };

  return jwt.sign(payload, config.jwtSecret, { expiresIn: "24h" });
}

export async function loginController(req: Request, res: Response) {

  const { username, password } = req.body;

  const userRole = await prisma.role.findFirst({
    where: {
      roles: "USER"
    },
  });

  if(!userRole) {
    return res.status(500).json({ message: 'Role USER not found' });
  }
  
  const user = await prisma.user.findFirst({
    where: {
      username
    },
    include: {
      role: true
    }
  });

  if (!user) {
    return res.status(400).json({ message: `User ${username} already exists`, user });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  const token = generateAccessToken(user.id, [user.role.roles]);

  return res.json({ token });
}