import oracledb from "oracledb";
import { connectdb } from "../config/config.js";
import Estadistica from "../models/stadistic.model.js";

export const getCantDepartmentsDisp = async () => {
    const sql = `BEGIN ESTADISTICA.CANT_DEPTOS_DISP(:cant_deptos_disp); END;`;
    const binds = {      
      cant_deptos_disp: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
    };
    const options = {
      isAutoCommit: false,
    };

    try {
        const { cant_deptos_disp } = await connectdb(sql, binds, options);
        return cant_deptos_disp;

    } 
    catch (error) {
      console.error(error);
      return false;
    }
  };

  export const getCantDepartmentsRes = async () => {
    const sql = `BEGIN ESTADISTICA.CANT_DEPTOS_RES(:cant_deptos_res); END;`;
    const binds = {      
      cant_deptos_res: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
    };
    const options = {
      isAutoCommit: false,
    };

    try {
        const { cant_deptos_res } = await connectdb(sql, binds, options);
        return cant_deptos_res;

    } 
    catch (error) {
      console.error(error);
      return false;
    }

  };

  export const getCantTour = async () => {
    const sql = `BEGIN ESTADISTICA.TOTAL_TOUR(:cant_tour); END;`;
    const binds = {      
      cant_tour: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
    };
    const options = {
      isAutoCommit: false,
    };

    try {
        const { cant_tour } = await connectdb(sql, binds, options);
        return cant_tour;

    } 
    catch (error) {
      console.error(error);
      return false;
    }

  };

  export const getCantTransport = async () => {
    const sql = `BEGIN ESTADISTICA.TOTAL_TRANSPORTE(:cant_transport); END;`;
    const binds = {      
      cant_transport: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
    };
    const options = {
      isAutoCommit: false,
    };

    try {
        const { cant_transport } = await connectdb(sql, binds, options);
        return cant_transport;

    } 
    catch (error) {
      console.error(error);
      return false;
    }

  };

  export const getGananciaTotal = async () => {
    const sql = `BEGIN ESTADISTICA.TOTAL_GANANCIA(:ganancia); END;`;
    const binds = {      
      ganancia: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
    };
    const options = {
      isAutoCommit: false,
    };

    try {
        const { ganancia } = await connectdb(sql, binds, options);
        return ganancia;

    } 
    catch (error) {
      console.error(error);
      return false;
    }

  };

export const filtroDepartamento = async (fechas) => {
  const sql = `BEGIN ESTADISTICA.REPORTE_DEPARTAMENTO(
    :id_departamento,    
    :fecha1,
    :fecha2,
    :cursor); END;`;
  const binds = {
    id_departamento: fechas.id_departamento,
    fecha1: fechas.fecha1,
    fecha2: fechas.fecha2,
    cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
  };
  const options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
    isAutoCommit: true,
  };

  try {
      const { cursor } = await connectdb(sql, binds, options);
      if ( cursor !== undefined ){
        const date = await cursor.getRows();
        console.log(date)
        return date;
      }

  } 
  catch (error) {
    console.error(error);
    return false;
  }

};

export const filtroLocalidad = async (fechas) => {
  console.log(fechas.id_localidad);
  const sql = `BEGIN ESTADISTICA.REPORTE_LOCALIDAD(
    :id_localidad,    
    :fecha1,
    :fecha2,
    :cursor); END;`;
  const binds = {
    id_localidad: fechas.id_localidad,
    fecha1: fechas.fecha1,
    fecha2: fechas.fecha2,
    cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
  };
  const options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
    isAutoCommit: true,
  };

  try {
      const { cursor } = await connectdb(sql, binds, options);
      if ( cursor !== undefined ){
        const date = await cursor.getRows();
        console.log(date)
        return date;
      }

  } 
  catch (error) {
    console.error(error);
    return false;
  }

};

// export const anno = async (estadistica) => {
//   const sql = `BEGIN ESTADISTICA.ANNO(
//     :fecha,
//     :cursor); END;`;

//     const binds ={
//       fecha: estadistica.fecha,

//     }
// }