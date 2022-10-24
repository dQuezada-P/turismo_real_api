//? Variables
import {Router} from 'express'
import oracledb from 'oracledb'
import { conectBD } from '../config/config.js'
import { editDepartment } from '../controllers/departmentControllers.js';
import { getTransports, addTransport, getTransport } from '../controllers/transport.controller.js';
const router = Router();

//*GET
router.get("/all",getTransports);
router.get("/", getTransport);
//*POST
router.post("/", addTransport);

//*PUT
router.put("/", editDepartment);

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
