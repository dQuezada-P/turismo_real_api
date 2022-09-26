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
  
    const callback = async (result) => {
      const resultSet = result.outBinds.cursor;
      const rows = await resultSet.getRows();
      console.log(rows)
      await resultSet.close();
      res.json(rows);
    };
  
    await conectBD(sql, binds, options , callback);
  });

export default router