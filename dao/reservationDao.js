import oracledb from "oracledb";
import { connectdb } from "../config/config.js";

export const createReservationBD = async (reservation) => {
  
  const binds = {
    fecha_inicio: reservation.FECHA_INICIO,
    fecha_salida: reservation.FECHA_SALIDA,
    cantidad_persona: reservation.CANTIDAD_PERSONA,
    id_cliente: reservation.CLIENTE,
    id_departamento: reservation.DEPARTAMENTO,
    id_reserva: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
    msg: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
  };
  console.log(binds)
  const sql = `BEGIN ACCIONES_RESERVA.CREAR_RESERVA(:fecha_inicio,
                                            :fecha_salida,
                                            :cantidad_persona,
                                            :id_cliente,
                                            :id_departamento,
                                            :id_reserva,
                                            :msg) ;END;`;

  try {
    const {id_reserva} = await connectdb(sql,binds,{isAutoCommit: true})
    return id_reserva
  } catch (error) {
    console.error(error)
    return 0
  }
};

export const modifyReservationBD = () => {};
