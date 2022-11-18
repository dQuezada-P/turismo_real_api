import Reservation from "../models/reservation.model.js";
import { emailReservation } from "../utils/email.js";
export const getReservations = async (req, res) => {
  const reservationList = await new Reservation().getReservations();
  const keys = Object.keys(reservationList[0]);

  reservationList.forEach((reservation) => {
    const departamento = {};
    const cliente = {};
    keys.forEach((key) => {
      const name = key.split("__");
      if (name[0] == "DEPARTAMENTO") {
        departamento[name[1]] = reservation[key];
        delete reservation[key];
      } else if (name[0] == "CLIENTE") {
        cliente[name[1]] = reservation[key];
        delete reservation[key];
      }
    });
    reservation.DEPARTAMENTO = departamento;
    reservation.CLIENTE = cliente;
  });

  res.json(reservationList);
};

export const getUserReservations = async (req, res) => {
  const { id_user } = req.query;
  const reservationList = await new Reservation().getUserReservations(id_user);
  const keys = Object.keys(reservationList[0]);

  reservationList.forEach((reservation) => {
    const departamento = {};
    const cliente = {};
    keys.forEach((key) => {
      const name = key.split("__");
      if (name[0] == "DEPARTAMENTO") {
        departamento[name[1]] = reservation[key];
        delete reservation[key];
      } else if (name[0] == "CLIENTE") {
        cliente[name[1]] = reservation[key];
        delete reservation[key];
      }
    });
    reservation.DEPARTAMENTO = departamento;
    reservation.CLIENTE = cliente;
  });
  console.log(reservationList)
  res.json(reservationList);
};

export const getReservation = async (req, res) => {
  const reservation = await new Reservation().getReservation(req.query.id);
  const keys = Object.keys(reservation);
  const departamento = {};
  const cliente = {};
  const pago = {};
  keys.forEach((key) => {
    const name = key.split("__");
    if (name[0] == "DEPARTAMENTO") {
      departamento[name[1]] = reservation[key];
      delete reservation[key];
    } else if (name[0] == "CLIENTE") {
      cliente[name[1]] = reservation[key];
      delete reservation[key];
    } else if (name[0] == "PAGO") {
      pago[name[1]] = reservation[key];
      delete reservation[key];
    }
  });
  reservation.DEPARTAMENTO = departamento;
  reservation.CLIENTE = cliente;
  reservation.PAGO = pago;
  console.log(reservation);
  res.json(reservation);
};

export const addReservation = async (req, res) => {
  try {
    const { id_dep, total, fecha, cant_personas, dias, id_user , transporte , tour } =
      req.body.reservation.reservation;
    let [newfecha] = fecha.split("T");
    newfecha = newfecha.split("-");
    newfecha = newfecha[2] + "-" + newfecha[1] + "-" + newfecha[0];

    console.log(req.body)
    const reservationModel = new Reservation(
      null,
      newfecha,
      parseInt(dias, 10),
      parseInt(cant_personas, 10),
      id_user,
      id_dep,
      null,
      null,
      total,
      String(transporte),
      String(tour),
    );
    const result = await reservationModel.addReservation();
    if (result) {
      emailReservation(req.body.reservation)
      return res.json("reserva agregada");
    }
    return res.json("reserva no agregada");
  } catch (error) {}

  // console.log(reservationModel)
  // try {
  //   const result = await reservationModel.addReservation();
  //   if (result) {
  //     return res.json("reserva agregada");
  //   }
  //   return res.json("reserva no agregada");
  // } catch (error) {
  //   console.error(error);
  // }
};

export const checkInReservation = async (req, res) => {
  console.log(req.body);
  const { id_reserva, cancelado } = req.body;

  const response = await new Reservation().checkInReservation(
    id_reserva,
    cancelado
  );

  res.json(response);
};

export const checkOutReservation = async (req, res) => {
  console.log(req.body)
  const { id_reserva, cancelado } = req.body;
  
  const response = await new Reservation().checkOutReservation(id_reserva, cancelado);

  res.json(response);
};

export const getServicesByReservation = async (req, res) => {
  const services = await new Reservation().getServicesByReservation(req.query.id);
  console.log(services);
  res.json(services);
}