//? Variables
import {Router} from 'express'
import oracledb from 'oracledb'
import { conectBD } from '../config/config.js'
import { getTransports, addTransport } from '../controllers/transport.controller.js';
const router = Router();

//*GET
router.get("/all",getTransports);

//*POST
router.post("/", addTransport);

//*PUT
router.put("/", async (req, res) => {
  const { id, ciudad, vehiculo, horario, conductor, precio } = req.body;
  binds = {
    id: id,
    ciudad: ciudad,
    vehiculo: vehiculo,
    horario: horario,
    conductor: conductor,
    precio: precio,
    resultado: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
  };
  sql = `BEGIN ACCIONES_TRANSPORTE.MODIFICAR_TRANSPORTE(:id,
                                                    :ciudad,
                                                    :vehiculo,
                                                    :horario,
                                                    :conductor,
                                                    :precio,
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
  sql = `BEGIN ACCIONES_TRANSPORTE.ELIMINAR_TRANSPORTE(:id,:resultado);END;`;
  const callback = (result) => {
    res.json(result);
  };
  await conectBD(sql, binds, { isAutoCommit: true }, callback);
});


export default router
