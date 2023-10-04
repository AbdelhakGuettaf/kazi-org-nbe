import { NextFunction, Request, Response, Router } from 'express';
import prisma from '../../prisma/prisma-client';
import getTrackingByAgency from '../services/tracking.service';

const router = Router();
// tracking by agency plus tard on ajoute le filtrage
router.get('/tracking', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const agencyId = 'tlm';
    const result = await getTrackingByAgency(agencyId);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/tracking/add', async (req: Request, res: Response) => {
  // await prisma.parcel.deleteMany();
  try {
    const data = req.body;

    if (!data.zone_name || !data.trackingData || !Array.isArray(data.trackingData)) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    const idZone = await prisma.zone.findFirstOrThrow({
      where: {
        zoneName: data.zone_name,
      },
    });

    const trackingList = data.trackingData;

    const insertData: { tracking: string; code: string; zoneName: string }[] = [];

    const errorMessages = [];

    trackingList.array.forEach((trackingCode: string) => {
      const trackingParts = trackingCode.split('-');

      if (trackingParts.length === 4) {
        const trackingCodeValue = trackingParts[2];

        insertData.push({
          tracking: trackingCode,
          code: trackingCodeValue,
          zoneName: idZone.id,
        });
      } else {
        errorMessages.push('Incorrect tracking format');
      }
    });

    if (errorMessages.length > 0) {
      return res.status(400).json({ messages: 'Incorrect tracking format' });
    }
    await prisma.parcel.createMany({
      data: insertData,
    });

    const message = 'List of tracking data added successfully to the agence.';
    return res.status(200).json({ message });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
