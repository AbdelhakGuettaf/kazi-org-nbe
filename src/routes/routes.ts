import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const api = Router().use('/test', async (req, res) => {
  const prisma = new PrismaClient();
  const t = await prisma.user.create({ data: { userId: 'test' } });

  res.status(200).json(t);
});
export default Router().use('/api', api);
