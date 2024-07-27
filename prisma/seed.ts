import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("aaaaaa", 12);

  const user = await prisma.user.upsert({
    where: {
      // email: "test@gmail.com",
      username: "new",
    },
    update: {},
    create: {
      email: "new@gmail.com",
      password: hashedPassword,
      username: "new",
      role: "ADMIN",
    },
  });

  console.log({ user });

  /*   const zone = await prisma.zone.upsert({
    where: {
      name: "Forest",
    },
    update: {},
    create: {
      name: "Forest",
    },
  });

  console.log({ zone }); */
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
