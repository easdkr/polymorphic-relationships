import { prisma } from "./prisma/prisma-client";

async function bootstrap() {}

await bootstrap().finally(async () => {
  await prisma.$disconnect();
});
