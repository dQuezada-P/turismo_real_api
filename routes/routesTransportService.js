//? Variables
import {Router} from 'express'
import oracledb from 'oracledb'
import { conectBD } from '../config/config.js'
import { getTransports, addTransport, getTransport, editTransport, deleteTranspsort } from '../controllers/transport.controller.js';
const router = Router();

//*GET
router.get("/all",getTransports);
router.get("/", getTransport);
//*POST
router.post("/", addTransport);
//*PUT
router.put("/", editTransport);

//*DELETE
router.delete("/:id", deleteTranspsort);


export default router
