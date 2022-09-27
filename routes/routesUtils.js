import {Router} from 'express'
import oracledb from 'oracledb'
import {conectBD} from '../config/config.js'

const router = Router();

//!ARREGLARRRRRRRRRRRRRRRRRRRRRRR!

router.get("/locations", async (req, res) => {
    const sql = `BEGIN UTILS.VER_LOCALIDADES(:cursor); END;`;
  
    const binds = {
      cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
    };

    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      isAutoCommit: false
    }
  
    const locations = await conectBD(sql, binds, options);
    res.json(locations);
  });

export default router