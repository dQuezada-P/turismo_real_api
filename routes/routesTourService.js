//? Variables
import {Router} from 'express'
import oracledb from 'oracledb'
import {conectBD, connectdb} from '../config/config.js'
import { getTours, getTour, addTour, editTour } from '../controllers/tour.controller.js';


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
router.delete("/", async (req, res) => {
  const { id } = req.body;
  binds = {
    id: id,
    resultado: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
  };
  sql = `BEGIN ACCIONES_TOUR.ELIMINAR_TOUR(:id,:resultado);END;`;
  const callback = (result) => {
    res.json(result);
  };
  await conectBD(sql, binds, { isAutoCommit: true }, callback);
});



export default router
