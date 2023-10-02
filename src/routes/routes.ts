import { Router } from 'express';
import zoneController from '../controllers/zone.controller';

const api = Router().use(zoneController);
export default Router().use('/api', api);
