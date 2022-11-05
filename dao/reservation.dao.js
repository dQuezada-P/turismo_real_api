import oracledb from "oracledb";
import { connectdb } from "../config/config.js";

export const getReservations = async () => {
  try {
      const sql = `BEGIN ACCIONES_RESERVA.GET_RESERVAS(:cursor);END;`;

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

export const addReservation = async (reservation) => {
  let binds = {
    fecha_inicio: reservation.fecha_inicio,
    dias: reservation.dias,
    cantidad_persona: reservation.cantidad_persona,
    id_cliente: reservation.cliente,
    id_departamento: reservation.departamento,
    abono : reservation.abono,
    id_reserva: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
    msg: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
  };
  let sql = `BEGIN ACCIONES_RESERVA.CREAR_RESERVA(:fecha_inicio,
                                            :dias,
                                            :cantidad_persona,
                                            :id_cliente,
                                            :id_departamento,
                                            :abono,
                                            :id_reserva,
                                            :msg) ;END;`;
  try {
    const { id_reserva } = await connectdb(sql, binds, { isAutoCommit: true });
    if (id_reserva) {
      return id_reserva
    }
    return null
  } catch (error) {
    console.error(error);
  }
};

export const modifyReservationBD = () => {};
