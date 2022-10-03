import oracledb from "oracledb";
import { connectdb } from "../config/config.js";

export const getCantDepartments = async () => {
    const sql = `BEGIN ESTADISTICA.CANT_DEPTOS(:cant_deptos); END;`;
    const binds = {      
      cant_deptos: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
    };
    const options = {
      isAutoCommit: false,
    };

    try {
        const { cant_deptos } = await connectdb(sql, binds, options);
        return cant_deptos;

    } 
    catch (error) {
      console.error(error);
      return false;
    }

  };