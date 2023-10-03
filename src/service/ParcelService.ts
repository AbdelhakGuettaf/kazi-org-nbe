import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const searchParcelByCodeAndDate = async (codeSearch: string, dateFilter: string) => {
  const parcels = await prisma.parcel.findMany({
    where: {
      code: codeSearch,
      createdAt: {
        gte: new Date(`${dateFilter}T00:00:00.000Z`), 
        lte: new Date(`${dateFilter}T23:59:59.999Z`), 
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return parcels;
};

export default searchParcelByCodeAndDate;
