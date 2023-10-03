import { Router } from 'express';
import zonesController from '../controllers/ZoneController';
import addZonesController from '../controllers/ManageZoneController';
import searchParcelController from '../controllers/ParcelController';

const api = Router()
  .use(zonesController)
  

// Ajoutez une nouvelle route POST pour gérer l'ajout de zones
api.post('/addZones', addZonesController);

// Route pour la recherche de parcelles par code
api.get('/parcels/search/:code', searchParcelController);

export default Router().use('/api', api);
