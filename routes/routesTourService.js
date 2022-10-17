//? Variables
import {Router} from 'express'
import oracledb from 'oracledb'
import {conectBD, connectdb} from '../config/config.js'
import { getTours, addTour } from '../controllers/tour.controller.js';
const router = Router();

//!ARREGLARRRRRRRRRRRRRRRRRRRRRRR!

//? Verbos HTTP

//*GET

router.get("/all", getTours);

router.post("/", addTour);

//*PUT
router.put("/", async (req, res) => {
  const { id, ciudad, cupo, precio, descripcion, horario } = req.body;
  binds = {
    id: id,
    ciudad: ciudad,
    cupo: cupo,
    precio: precio,
    descripcion: descripcion,
    horario: horario,
    resultado: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
  };
  sql = `BEGIN ACCIONES_TOUR.MODIFICAR_TOUR(:id,
                                        :ciudad,
                                        :cupo,
                                        :precio,
                                        :descripcion,
                                        :horario,
                                        :resultado);
                                        END;`;
  const callback = (result) => {
    res.json(result);
  };
  await conectBD(sql, binds, { isAutoCommit: true }, callback);
});

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
