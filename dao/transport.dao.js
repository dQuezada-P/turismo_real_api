import { connectdb } from "../config/config.js";
import oracledb from "oracledb";
import Transport from "../models/transport.model.js";

//VER TRANSPORTES
export const getTransports = async () => {
    try {
        const sql = `BEGIN ACCIONES_TRANSPORTE.VER_TRANSPORTE(:cursor);END;`;
  
        const binds = {
          cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
        };
      
        const options = {
          outFormat: oracledb.OUT_FORMAT_OBJECT,
        }
      
        const { cursor } = await connectdb(sql, binds, options);
      
        return await cursor.getRows();                  
    } catch (error) {
        
    }
};
//AGREGAR TRANSPORTES
export const addTransport = async (transport) => {

  const sql = `BEGIN ACCIONES_TRANSPORTE.CREAR_TRANSPORTE(
    :id_conductor,
    :id_terminal,
    :fecha,
    :horario,
    :precio,
    :resultado);
    END;`;

    const binds = {
      id_conductor: transport.id_conductor,
      id_terminal: transport.id_terminal,
      fecha: transport.fecha,
      horario: transport.horario,
      precio: transport.precio,
      resultado: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
    }

    const options = {
      isAutoCommit: true
    }

    const {resultado} = await connectdb (sql, binds, options);
    return resultado
};