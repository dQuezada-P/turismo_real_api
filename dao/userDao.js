import oracledb from "oracledb";
import { connectdb } from "../config/config.js";



export const getUsers = async (req, res) => {
  try {
    const sql = `BEGIN ACCIONES_USUARIO.VER_USUARIOS_CLIENTE(:cursor); END;`;
    const binds = {
      cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
    };
    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      isAutoCommit: false,
    };

    const { cursor } = await connectdb(sql, binds, options);
    const users = await cursor.getRows();
    console.log(users)
    return users;
  } catch (error) {
    console.error(error);
  }
};
  