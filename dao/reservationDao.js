import oracledb from "oracledb";
import { connectdb } from "../config/config.js";

export const createReservationBD = async (reservation) => {
  let binds = {
    fecha_inicio: reservation.FECHA_INICIO,
    dias: reservation.DIAS,
    cantidad_persona: reservation.CANTIDAD_PERSONA,
    id_cliente: reservation.CLIENTE,
    id_departamento: reservation.DEPARTAMENTO,
    abono : reservation.ABONO,
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
