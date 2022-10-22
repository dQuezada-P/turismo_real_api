import Reservation from "../models/reservation.js";

export const createReservation = async (req, res) => {
  console.log(req.body)
  const { fecha_inicio, dias, cantidad_persona, cliente, departamento, bono } =
    req.body;
  const reservation = new Reservation(
    null,
    fecha_inicio,
    dias,
    cantidad_persona,
    cliente,
    departamento,
    null,
    null,
    bono
  );

  try {
    const result = await reservation.createReservation();
    if (result) {
      return res.json("reserva agregada");
    }
    return res.json("reserva no agregada");
  } catch (error) {
    console.error(error);
  }
};
