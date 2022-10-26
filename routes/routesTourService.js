//? Variables
import {Router} from 'express'
import oracledb from 'oracledb'
import {conectBD, connectdb} from '../config/config.js'
import { getTours, getTour, addTour, editTour, deleteTour } from '../controllers/tour.controller.js';


const router = Router();

//!ARREGLARRRRRRRRRRRRRRRRRRRRRRR!

//? Verbos HTTP

//*GET
router.get("/all", getTours);
router.get("/", getTour);
//POST
router.post("/", addTour);

//*PUT
router.put("/", editTour);

//*DELETE
router.delete("/:id", deleteTour);



export default router
