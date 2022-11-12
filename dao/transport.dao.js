import { connectdb } from "../config/config.js";
import oracledb from "oracledb";

//VER TRANSPORTES
export const getTransports = async () => {
    try {
        const sql = `BEGIN ACCIONES_TRANSPORTE.VER_TRANSPORTES(:cursor);END;`;
  
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

//VER TRANSPORTE
export const getTransport = async (id) => {
  try {
    const sql = `BEGIN ACCIONES_TRANSPORTE.VER_TRANSPORTE(:id, :cursor);END;`;

    const binds = {
      id: id,
      cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT},
    };

    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      isAutoCommit: true,
    };
    
    const { cursor } = await connectdb(sql, binds, options);

    if (cursor != undefined){
      const [transport] = await cursor.getRows();
      return transport;
    }
  } catch (error) {
    console.error(error);
  }

}
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
//EDITAR TRANSPORTE
export const editTransport = async (transport) => {
  try {
    const sql = `BEGIN ACCIONES_TRANSPORTE.MODIFICAR_TRANSPORTE(:id,
      :id_conductor,
      :id_terminal,
      :fecha,
      :horario,
      :precio,
      :estado,
      :resultado);
      END;`;
    
      const binds = {
        id: transport.id,
        id_conductor: transport.id_conductor,
        id_terminal: transport.id_terminal,
        fecha: transport.fecha,
        horario: transport.horario,
        precio: transport.precio,
        estado: transport.estado,
        resultado: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
      }
      const options = {
        isAutoCommit: true
      };

      const {resultado} = await connectdb(sql, binds, options);
      return resultado
    
  } catch (error) {
    console.log(error);
  }
  
};

//ELIMINIAR TRANSPORTE
export const deleteTranspsort =async (id) => {
  try {
    const sql = `BEGIN ACCIONES_TRANSPORTE.ELIMINAR_TRANSPORTE(:id,:resultado);END;`;

    const binds = {
      id: id,
      resultado: {type: connectdb.NUMBER, dir: oracledb.BIND_OUT}
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
}