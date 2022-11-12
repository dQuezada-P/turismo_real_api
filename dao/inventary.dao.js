import { connectdb } from "../config/config.js";
import oracledb from "oracledb";

export const getInventary = async (id_departamento) => {
  try {
    const sql = `BEGIN ACCIONES_INVENTARIO.GET_INVENTARIO(:id_departamento,:cursor);END;`;

    const binds = {
			id_departamento,
      cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
    };

    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    };

    const { cursor } = await connectdb(sql, binds, options);
    return await cursor.getRows();
  } catch (error) {
    console.log(error);
  }
};
