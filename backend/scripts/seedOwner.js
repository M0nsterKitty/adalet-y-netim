import bcrypt from 'bcrypt';
import { PrismaClient, Role } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const email = process.env.OWNER_EMAIL;
  const password = process.env.OWNER_PASSWORD;
  if (!email || !password) throw new Error('OWNER_EMAIL and OWNER_PASSWORD are required');

  const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (existing) {
    console.log('Owner user already exists.');
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      passwordHash,
      role: Role.owner,
      isActive: true
    }
  });

  console.log('Owner user created successfully.');
}

main().finally(async () => {
  await prisma.$disconnect();
});
