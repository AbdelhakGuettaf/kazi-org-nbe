import { NextFunction, Request, Response, Router } from 'express';
import getAllZones from '../service/ZoneService';



const router = Router();

router.get('/zones', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getAllZones();
    res.json(result);
  } catch (error) {
    next(error);
  }
});


export default router;