import oracledb from "oracledb";
import { connectdb } from "../config/config.js";

export const getLocationsBD = async () => {
  const sql = `BEGIN UTILS.VER_LOCALIDADES(:cursor); END;`;

  const binds = {
    cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
  };

  const options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
    isAutoCommit: false,
  };
  try {
    const { cursor } = await connectdb(sql, binds, options);
    const locations = await cursor.getRows()
    // if (cursor !== undefined) {
    //   const [locations] = await cursor.getRows();
    return locations
    // }
    return false;
  } catch (error) {
    console.error(error);
  }
};
