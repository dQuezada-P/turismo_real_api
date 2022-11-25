//? Variables
import { Router } from 'express'
import * as InventaryController from '../controllers/inventary.controller.js'

const router = Router();

router.get("/", InventaryController.getInventary);
router.put("/checkout", InventaryController.checkoutInventary);
router.put("/", InventaryController.editInventary);
router.delete("/", InventaryController.deleteInventary);

export default router;
