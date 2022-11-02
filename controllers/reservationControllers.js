import Reservation from "../models/reservation.js";

export const createReservation = async (req, res) => {
  const { fecha, dias, cantP, rut, id, abono } = req.body.payment;
  
  // const formatDate = fecha.splice('T',',');
  let [newfecha] = fecha.split('T')
  newfecha = newfecha.split('-')
  newfecha = newfecha[2]+'/'+newfecha[1]+'/'+newfecha[0]

  const reservation = new Reservation(
    null,
    newfecha,
    dias,
    cantP,
    rut,
    id,
    null,
    null,
    abono
  );
  console.log(reservation)
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
