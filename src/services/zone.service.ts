import prisma from '../../prisma/prisma-client';

const getZones = async () => {
  const zones = await prisma.zone.findMany();

  return zones;
};
export default getZones;
