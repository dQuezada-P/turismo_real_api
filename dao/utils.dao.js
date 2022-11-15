import oracledb from "oracledb";
import internal from "stream";
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
    return locations
  } catch (error) {
    console.error(error);
  }
};

export const getDepartmentsBD = async () => {
  const sql = `BEGIN UTILS.VER_DEPARTAMENTOS(:cursor); END;`;

  const binds = {
    cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
  };

  const options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
    isAutoCommit: false,
  };
  try {
    const { cursor } = await connectdb(sql, binds, options);
    const departments = await cursor.getRows();
    return departments
  } catch (error) {
    console.error(error);
  }
};

export const getDrivers = async (id_localidad) => {
  try {
    const sql = `BEGIN UTILS.GET_CONDUCTORES(:id_localidad, :cursor); END;`;

    const binds = {
      id_localidad: parseInt(id_localidad),
      cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
    };

    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      isAutoCommit: false,
    };

    const { cursor } = await connectdb(sql, binds, options);
    const drivers = await cursor.getRows()
    return drivers
  } catch (error) {
    console.error(error);
  }
};

export const getTerminals = async (id_localidad) => {
  try {
    const sql = `BEGIN UTILS.GET_TERMINALES(:id_localidad,:cursor); END;`;

    const binds = {
      id_localidad: parseInt(id_localidad),
      cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
    };

    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      isAutoCommit: false,
    };

    const { cursor } = await connectdb(sql, binds, options);
    const terminals = await cursor.getRows()
    return terminals
  } catch (error) {
    console.error(error);
  }
};

export const getRoles = async () => {
  const sql = `BEGIN UTILS.GET_ROLES(:cursor); END;`;

  const binds = {
    cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
  };

  const options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
    isAutoCommit: false,
  };
  try {
    const { cursor } = await connectdb(sql, binds, options);
    const roles = await cursor.getRows()
    roles.forEach(rol => {
      rol.NOMBRE = rol.CARGO
    });
    return roles
  } catch (error) {
    console.error(error);
  }
};
