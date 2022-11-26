import oracledb from "oracledb";
import { connectdb } from "../config/config.js";

export const getReservations = async () => {
  try {
    const sql = `BEGIN ACCIONES_RESERVA.GET_RESERVAS2(:cursor);END;`;

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

export const getUserReservations = async (id_user) => {
  try {
    const sql = `BEGIN ACCIONES_RESERVA.GET_RESERVAS_BY_USER(:id_user,:cursor);END;`;

    const binds = {
      id_user,
      cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
    };

    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    };

    const { cursor } = await connectdb(sql, binds, options);
    return await cursor.getRows();
  } catch (error) {}
};

export const getReservation = async (id) => {
  try {
    const sql = `BEGIN ACCIONES_RESERVA.GET_RESERVA(:id, :cursor);END;`;

    const binds = {
      id,
      cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
    };

    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    };

    const { cursor } = await connectdb(sql, binds, options);
    const [reservation] = await cursor.getRows();
    return reservation;
  } catch (error) {}
};

export const addReservation = async (reservation) => {
  let binds = {
    fecha_inicio: reservation.fecha_inicio,
    dias: reservation.dias,
    cantidad_persona: reservation.cantidad_persona,
    id_cliente: reservation.cliente,
    id_departamento: reservation.departamento,
    abono: reservation.abono,
    total_reserva: reservation.total_reserva,
    id_reserva: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
    msg: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
  };
  let sql = `BEGIN ACCIONES_RESERVA.CREAR_RESERVA(:fecha_inicio,
                                            :dias,
                                            :cantidad_persona,
                                            :id_cliente,
                                            :id_departamento,
                                            :abono,
                                            :total_reserva,
                                            :id_reserva,
                                            :msg) ;END;`;
  try {
    const { id_reserva } = await connectdb(sql, binds, { isAutoCommit: true });
    if (id_reserva) {
      return id_reserva;
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};

export const addReservationTransports = async(reservation,id)=>{
  let binds = {
    transporte : reservation.transporte,
    id: id,
    fecha: reservation.fecha_inicio,
    result: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
    msg: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
  };
  let sql = `BEGIN ACCIONES_RESERVA.UPDATE_SERVICIOS_TRANSPORTE(:transporte,
                                            :id,
                                            :fecha,
                                            :result,
                                            :msg) ;END;`;
  try {
    const result = await connectdb(sql, binds, { isAutoCommit: true });
    if (result) {
      return result;
    }
    return null;
  } catch (error) {
    console.error(error);
  }

}

export const addReservationTours = async(reservation,id)=>{
  
  let binds = {
    tour : reservation.tour,
    cupo : reservation.cantidad_persona + 1,
    id: id,
    fecha: reservation.fecha_inicio,
    result: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
    msg: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
  };
  console.log(binds)
  let sql = `BEGIN ACCIONES_RESERVA.UPDATE_SERVICIOS_TOUR(:tour,
                                            :cupo,
                                            :id,
                                            :fecha,
                                            :result,
                                            :msg) ;END;`;
  console.log(binds);
  try {
    const result = await connectdb(sql, binds, { isAutoCommit: true });
    if (result) {
      return result;
    }
    return null;
  } catch (error) {
    console.error(error);
  }
}


export const modifyReservationBD = () => {};

export const checkInReservation = async (id, cancelado) => {
  try {
    const sql = `BEGIN ACCIONES_RESERVA.CHECKIN_RESERVA(  
      :id,
      :cancelado,
      :r,
      :msg );
      END;`;

    const binds = {
      id,
      cancelado,
      r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
      msg: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
    };
    console.log(binds);

    const options = {
      isAutoCommit: true,
    };

    const response = await connectdb(sql, binds, options);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const checkOutReservation = async (id, cancelado) => {
  try {
    const sql = `BEGIN ACCIONES_RESERVA.CHECKOUT_RESERVA(  
      :id,
      :cancelado,
      :r,
      :msg );
      END;`;

    const binds = {
      id,
      cancelado,
      r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
      msg: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
    };
    console.log(binds);

    const options = {
      isAutoCommit: true,
    };

    const response = await connectdb(sql, binds, options);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getServicesByReservation = async (id) => {
  try {
    const sql = `BEGIN ACCIONES_RESERVA.GET_SERVICES_BY_RESERVA(:id, :cursor);END;`;

    const binds = {
      id,
      cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
    };

    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    };

    const { cursor } = await connectdb(sql, binds, options);
    return await cursor.getRows();
  } catch (error) {}
};

export const cancelReservation = async (id) => {
  try {
    const sql = `BEGIN ACCIONES_RESERVA.CANCELAR_RESERVA(
      :id,
      :r,
      :msg
    );END;`;

    const binds = {
      id,
      r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
      msg: { type: oracledb.STRING, dir: oracledb.BIND_OUT }
    };

    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    };

    return await connectdb(sql, binds, options);
  } catch (error) {

  }
};
