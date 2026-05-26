import { prisma } from '../config/prisma.js';

export async function listUsers(req, res) {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, role: true, isActive: true, createdAt: true },
    orderBy: { createdAt: 'desc' }
  });

  return res.json({ users });
}
