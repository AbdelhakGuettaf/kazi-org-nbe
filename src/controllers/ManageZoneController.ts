// controllers/ManageZoneController.ts

import { Request, Response, NextFunction } from 'express';
import { Zone } from '@prisma/client';
import addZones from '../service/ZoneManage'; 

// eslint-disable-next-line consistent-return
const addZonesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const zones = req.body as Zone[];

    const createdZone = await addZones(zones);

    res.status(201).json({ createdZone });
  } catch (error) {
    next(error);
  }
};

export default addZonesController;
