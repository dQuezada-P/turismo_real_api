import oracledb from "oracledb";
import { connectdb } from "../config/config.js";

export const createReservationBD = async (reservation) => {
  let id
  let binds = {
    fecha_inicio: reservation.FECHA_INICIO,
    fecha_salida: reservation.FECHA_SALIDA,
    cantidad_persona: reservation.CANTIDAD_PERSONA,
    id_cliente: reservation.CLIENTE,
    id_departamento: reservation.DEPARTAMENTO,
    monto: reservation.MONTO,
    id_reserva: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
    msg: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
  };
  let sql = `BEGIN ACCIONES_RESERVA.CREAR_RESERVA(:fecha_inicio,
                                            :fecha_salida,
                                            :cantidad_persona,
                                            :id_cliente,
                                            :id_departamento,
                                            :monto,
                                            :id_reserva,
                                            :msg) ;END;`;

  try {
    const { id_reserva } = await connectdb(sql, binds, { isAutoCommit: true });
    id = id_reserva
  } catch (error) {
    console.error(error);
  }

  if (id) {
    binds = {
      id: id,
      r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
      msg: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
    };
    sql = `BEGIN ACCIONES_RESERVA.ACTUALIZAR_CHECKS(:id,:r,:msg); END;`;
    try {
      return await connectdb(sql, binds, { isAutoCommit: true });
    } catch (error) {
      console.error(error);
      return null
    }
  }
};

export const modifyReservationBD = () => {};
