import prisma from '../../prisma/prisma-client';

const getTrackingByAgency = async (agencyId: string) => {
  const zones = await prisma.zone.findMany({
    where: {
      agencyId,
    },
    select: {
      id: true,
    },
  });

  const trackings = zones.map(async zone => {
    const track = await prisma.parcel.findMany({
      where: {
        zone,
      },
      select: {
        tracking: true,
      },
    });

    return {
      zoneId: zone.id,
      tracking: track,
    };
  });

  const trackingData = await Promise.all(trackings);

  return trackingData;
};

export default getTrackingByAgency;
