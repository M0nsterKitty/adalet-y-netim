import dotenv from 'dotenv';

dotenv.config();

const required = [
  'DATABASE_URL',
  'JWT_ACCESS_SECRET',
  'JWT_REFRESH_SECRET',
  'FRONTEND_ORIGIN'
];

for (const key of required) {
  if (!process.env[key]) throw new Error(`Missing required env var: ${key}`);
}

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),
  databaseUrl: process.env.DATABASE_URL,
  jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  accessTokenTtl: process.env.ACCESS_TOKEN_TTL || '15m',
  refreshTokenTtl: process.env.REFRESH_TOKEN_TTL || '7d',
  frontendOrigin: process.env.FRONTEND_ORIGIN,
  ownerEmail: process.env.OWNER_EMAIL,
  ownerPassword: process.env.OWNER_PASSWORD
};
