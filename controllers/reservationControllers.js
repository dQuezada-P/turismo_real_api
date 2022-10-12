import Reservation from "../models/reservation.js";

export const createReservation = async(req, res) => {
  const {
    fecha_inicio,
    fecha_salida,
    cantidad_persona,
    cliente,
    departamento,
    monto
  } = req.body;
  const reservation = new Reservation(null, fecha_inicio,fecha_salida,cantidad_persona,cliente,departamento,null,null,null,monto)
  try {
    const result = await reservation.createReservation();
    if(result){
      return res.json("reserva agregada")
    }
    return res.json("reserva no agregada")
  } catch (error) {
    console.error(error)
  }

};
