
import prisma from '../../prisma/prisma-client';

const getAllZones = async () => {
  const zones = await prisma.zone.findMany();
  return zones;
};

export default getAllZones