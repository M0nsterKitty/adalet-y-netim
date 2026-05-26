import bcrypt from 'bcrypt';
import { prisma } from '../config/prisma.js';
import { signAccessToken, signRefreshToken } from '../utils/tokens.js';

function sanitizeUser(user) {
  return { id: user.id, email: user.email, role: user.role, isActive: user.isActive, createdAt: user.createdAt };
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (!user || !user.isActive) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  const refreshTokenHash = await bcrypt.hash(refreshToken, 12);

  await prisma.user.update({ where: { id: user.id }, data: { refreshTokenHash } });

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/auth',
    maxAge: 7 * 24 * 60 * 60 * 1000
  });

  return res.json({ accessToken, user: sanitizeUser(user) });
}

export async function me(req, res) {
  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.json({ user: sanitizeUser(user) });
}
