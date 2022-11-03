import {Router} from 'express'
import * as utilsController from '../controllers/utils.controller.js';

const router = Router();

router.get('/locations', utilsController.getLocations);
router.get('/drivers', utilsController.getDrivers);
router.get('/terminals', utilsController.getTerminals);
router.get('/roles', utilsController.getRoles);

export default router