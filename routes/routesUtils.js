import {Router} from 'express'
import { getLocations } from '../controllers/locationsControllers.js';


const router = Router();


router.get('/locations',getLocations)

// router.get("/locations", async (req, res) => {
  //   const sql = `BEGIN UTILS.VER_LOCALIDADES(:cursor); END;`;
  
  //   const binds = {
  //     cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
  //   };

  //   const options = {
  //     outFormat: oracledb.OUT_FORMAT_OBJECT,
  //     isAutoCommit: false
  //   }
  
  //   const locations = await conectBD(sql, binds, options);
  //   res.json(locations);
  // });

export default router