import { PrismaClient, Zone } from '@prisma/client';

const prisma = new PrismaClient();

const addZones = async (zones: Zone[]) => {
  try {
    // Vous pouvez mettre ici la logique de validation des données si nécessaire.

    const createdAgency = await prisma.agency.findFirstOrThrow();

    const createdZone = await prisma.zone.createMany({
      data: zones.map((z) => ({ ...z, agencyId: createdAgency.id })),
    });

    return createdZone;
  // eslint-disable-next-line no-useless-catch
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export default addZones;
