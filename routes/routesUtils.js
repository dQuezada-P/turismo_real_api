import {Router} from 'express'
import oracledb from 'oracledb'
import db from '../config/config.js'

const router = Router();

//!ARREGLARRRRRRRRRRRRRRRRRRRRRRR!

router.get("/locations", async (req, res) => {
    const sql = `BEGIN UTILS.VER_LOCALIDADES(:cursor); END;`;
  
    const binds = {
      cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
    };

    options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      isAutoCommit: false
    }
  
    const callback = async (result) => {
      const resultSet = result.outBinds.cursor;
      rows = await resultSet.getRows();
      await resultSet.close();
      res.json(rows);
    };
  
    await db.Open(sql, binds, options , callback);
  });

export default router