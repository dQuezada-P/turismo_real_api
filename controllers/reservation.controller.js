import Reservation from "../models/reservation.model.js";

export const getReservation = async (req, res) => {
  const reservationModel = new Reservation()
  const reservationList = await reservationModel.getReservations();

  res.json(reservationList);
}

export const addReservation = async (req, res) => {
  const { fecha, dias, cantP, rut, id, abono } = req.body.payment;
  
  // const formatDate = fecha.splice('T',',');
  let [newfecha] = fecha.split('T')
  newfecha = newfecha.split('-')
  newfecha = newfecha[2]+'/'+newfecha[1]+'/'+newfecha[0]

  const reservationModel = new Reservation(
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
  console.log(reservationModel)
  try {
    const result = await reservationModel.addReservation();
    if (result) {
      return res.json("reserva agregada");
    }
    return res.json("reserva no agregada");
  } catch (error) {
    console.error(error);
  }
};
