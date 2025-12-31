import { prisma } from './client'
import { env } from "prisma/config";


async function main() {
  // Create a new user with a post
  const roleAdmin = await prisma.role.create({
    data: {
      roles: "ADMIN"
    },
  });

  if(!roleAdmin){
    return console.log('Ошибка связанная с ролью')
  }

  const userAdmin = await prisma.user.create({
    data: {
      username: env("DATABASE_ADMIN_NAME"),
      password: env("DATABASE_ADMIN_PASSWORD"),
      role: { connect: { id: roleAdmin.id } },
    }
  });
  console.log('Created user:', userAdmin)

  
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })