import { Router } from 'express';
import zoneController from '../controllers/zone.controller';
import trackingController from '../controllers/tracking.controller';

const api = Router().use(zoneController).use(trackingController);
export default Router().use('/api', api);
