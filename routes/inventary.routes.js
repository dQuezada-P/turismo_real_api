//? Variables
import { Router } from 'express'
import * as InventaryController from '../controllers/inventary.controller.js'

const router = Router();

router.get("/", InventaryController.getInventary);

export default router;
