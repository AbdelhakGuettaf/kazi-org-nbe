import { NextFunction, Request, Response, Router } from 'express';
import { getZones } from '../services/zone.service';

const router = Router();

router.get('/zones', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getZones(req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
