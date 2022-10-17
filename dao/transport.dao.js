import { connectdb } from "../config/config.js";
import oracledb from "oracledb";
import Transport from "../models/transport.model.js";

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

export const addTransport = async (transport) => {
  const sql = `BEGIN ACCIONES_TRANSPORTE.CREAR_TRANSPORTE(
    :ciudad,
    :vehiculo,
    :horario,
    :conductor,
    :precio,
    :patente,
    :resultado);
    END;`;

    const binds = {
      ciudad: transport.ciudad,
      vehiculo: transport.vehiculo,
      horario: transport.horario,
      conductor: transport.conductor,
      precio: transport.precio,
      patente: transport.patente,
      resultado: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
    }

    const options = {
      isAutoCommit: true
    }

    const {resultado} = await connectdb (sql, binds, options);
    return resultado
};