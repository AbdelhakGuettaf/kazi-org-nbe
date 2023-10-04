import { NextFunction, Request, Response, Router } from 'express';
import getZones from '../services/zone.service';

const router = Router();

router.get('/zone', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getZones();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
