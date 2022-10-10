import Reservation from "../models/reservation.js";

export const createReservation = async(req, res) => {
  const {
    fecha_inicio,
    fecha_salida,
    cantidad_persona,
    cliente,
    departamento,
  } = req.body;
  const reservation = new Reservation(null, fecha_inicio,fecha_salida,cantidad_persona,cliente,departamento)
  try {
    const result = await reservation.createReservation();
    if(result){
      res.json("reserva agregada")
    }
    res.json("reserva no agregada")
  } catch (error) {
    console.error(error)
  }

};
