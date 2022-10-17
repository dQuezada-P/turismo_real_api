import { connectdb } from "../config/config.js";
import oracledb from "oracledb";

export const getTours = async () => {
  try {
    const sql = `BEGIN ACCIONES_TOUR.VER_TOUR(:cursor);END;`;

    const binds = {
      cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
    };

    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    };

    const { cursor } = await connectdb(sql, binds, options);
    return await cursor.getRows();
  } catch (error) {}
};

export const addTour = async (tour) => {
  const sql = `BEGIN ACCIONES_TOUR.CREAR_TOUR(
        :ciudad,
        :cupo,
        :precio,
        :horario,
        :descripcion,
        :resultado);
        END;`;

  const binds = {
    ciudad: tour.ciudad,
    cupo: tour.cupo,
    precio: tour.precio,
    descripcion: tour.descripcion,
    horario: tour.horario,
    resultado: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
  };

  const options = {
    isAutoCommit: true
  }

  const { resultado } = await connectdb(sql, binds, options);
  return resultado
};
