import { env } from "prisma/config"

const config = {
  jwtSecret: env("SECRET_KEY")
};

export { config };