import { connectdb } from "../config/config.js";
import oracledb from "oracledb";
import Tour from "../models/tour.model.js";

//VER TOURS
export const getTours = async () => {
  try {
    const sql = `BEGIN ACCIONES_TOUR.VER_TOURS(:cursor);END;`;

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

// VER TOUR
export const getTour = async (id) => {
  try {
    const sql = `BEGIN ACCIONES_TOUR.VER_TOUR(:id, :cursor);END;`;

    const binds = {
      id: id,
      cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT},
    };

    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      isAutoCommit: true,
    };

    const {cursor} = await connectdb(sql, binds, options);

    if (cursor !== undefined){
      const [tour] = await cursor.getRows();
      return tour;
    }
  } catch (error) {
    console.error(error);
  }
}

//AGREGAR TOUR Environment  
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

//EDITAR TOUR
export const editTour = async (tour) => {
  try {    
    const sql = `BEGIN ACCIONES_TOUR.MODIFICAR_TOUR(   
      :id,     
      :cupo,
      :precio,
      :fecha,
      :hora_inicio,
      :duracion,
      :descripcion,
      :estado,
      :id_localidad,
      :resultado);
      END;`;

  const binds = {  
    id: tour.id,  
    cupo: tour.cupo,
    precio: tour.precio,
    fecha: tour.fecha,
    hora_inicio: tour.hora_inicio,
    duracion: tour.duracion,
    descripcion: tour.descripcion,
    estado: tour.estado,
    id_localidad: tour.id_localidad,
    resultado: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
  };
//console.log(binds)

  const options = {
    isAutoCommit: true
  };

  const { resultado } = await connectdb(sql, binds, options);
  console.log(resultado);
  return resultado
  
      
    } catch (error) {
      console.log(error);
    }
};

//ELIMINAR TOUR

export const deleteTour = async (id) => {
  try {
    const sql = `BEGIN ACCIONES_TOUR.ELIMINAR_TOUR(:id,:resultado);END;`;

    const binds = {
      id: id,
      resultado: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT},
      };      

    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      isAutoCommit: true,
    };

    const resultado = await connectdb(sql, binds, options);    
    return resultado;
    
  } catch (error) {
    console.error(error);
  }


};