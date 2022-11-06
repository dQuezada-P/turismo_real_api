import Reservation from "../models/reservation.model.js";
import User from "../models/user.model.js";
import Departamento from "../models/department.model.js";

export const getReservations = async (req, res) => {
  const reservationModel = new Reservation()
  const reservationList = await reservationModel.getReservations();

  res.json(reservationList);
}

export const getReservation = async (req, res) => {
  const reservation = await new Reservation().getReservation(req.query.id);
  reservation.CLIENTE = await new User().getUserById(reservation.ID_CLIENTE);
  const [departamento] = await new Departamento().getDepartment(reservation.ID_DEPARTAMENTO);
  delete departamento.IMAGENES;
  reservation.DEPARTAMENTO = departamento;
  console.log(reservation);
  res.json(reservation);
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
