import { Request, Response, NextFunction } from 'express';
import searchParcelByCodeAndDate from '../service/ParcelService';

// eslint-disable-next-line consistent-return
const searchParcelController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { code } = req.params;
    const dateFilter = (req.query.dateFilter as string) || new Date().toISOString().split('T')[0].split('T')[0]; // Assurez-vous que dateFilter est au format YYYY-MM-DD

    const parcels = await searchParcelByCodeAndDate(code, dateFilter);

    if (parcels.length === 0) {
      return res.status(404).json({ message: 'Aucune parcelle trouvée pour ce code et cette date' });
    }

    return res.status(200).json(parcels);
  } catch (error) {
    next(error);
  }
};

export default searchParcelController;
