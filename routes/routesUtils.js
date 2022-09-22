const { Router } = require("express");
const oracledb = require("oracledb");
const router = Router();
const db = require("../config/config.js");

router.get("/locations", async (req, res) => {
    const sql = `BEGIN UTILS.VER_LOCALIDADES(:cursor); END;`;
  
    const binds = {
      cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
    };
  
    const callback = async (result) => {
      const resultSet = result.outBinds.cursor;
      rows = await resultSet.getRows();
      await resultSet.close();
      res.json(jsonListGen(rows));
    };
  
    const jsonListGen = (rows) => {
      const json = [];
      rows.map((row) => {
        json.push({
          id: row[0],
          nombre: row[1]
        });
      });
      console.log(json);
      return json;
    };
  
    await db.Open(sql, binds, { isAutoCommit: false }, callback);
  });

  module.exports = router;