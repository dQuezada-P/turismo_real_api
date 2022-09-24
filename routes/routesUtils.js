const { Router } = require("express");
const oracledb = require("oracledb");
const router = Router();
const db = require("../config/config.js");


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

  module.exports = router;