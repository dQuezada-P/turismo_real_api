import { connectdb } from "../config/config.js";
import oracledb from "oracledb";
import Tour from "../models/tour.model.js";

//VER TOURS
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
//AGREGAR TOURNo Environment
export const addTour = async (tour) => {
  const sql = `BEGIN ACCIONES_TOUR.CREAR_TOUR(        
        :cupo,
        :precio,
        :fecha,
        :hora_inicio,
        :duracion,
        :descripcion,
        :id_localidad,
        :resultado);
        END;`;

  const binds = {    
    cupo: tour.cupo,
    precio: tour.precio,
    fecha: tour.fecha,
    hora_inicio: tour.hora_inicio,
    duracion: tour.duracion,
    descripcion: tour.descripcion,
    id_localidad: tour.id_localidad,
    resultado: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
  };
  //console.log(binds)

  const options = {
    isAutoCommit: true
  }

  const { resultado } = await connectdb(sql, binds, options);
  return resultado
};
