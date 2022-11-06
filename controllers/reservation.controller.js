import Reservation from "../models/reservation.model.js";
import User from "../models/user.model.js";
import Departamento from "../models/department.model.js";

export const getReservations = async (req, res) => {
  const reservationModel = new Reservation()
  const reservationList = await reservationModel.getReservations();
  const userModel = new User();
  const departmentModel = new Departamento();

  for (const reservation of reservationList) {
    reservation.CLIENTE = await userModel.getUserById(reservation.ID_CLIENTE);
    const [departamento] = await departmentModel.getDepartment(reservation.ID_DEPARTAMENTO);
    delete departamento.IMAGENES;
    reservation.DEPARTAMENTO = departamento;
  }

  res.json(reservationList);
}

export const getReservations2 = async (req, res) => {
  const reservationList = await new Reservation().getReservations2();
  const keys = Object.keys(reservationList[0]);

  reservationList.forEach(reservation => {
    const departamento = {}
    const cliente = {}
    keys.forEach(key => {
      const name = key.split('__');
      if (name[0] == 'DEPARTAMENTO'){
        departamento[name[1]] = reservation[key];
        delete reservation[key];
      }
      else if (name[0] == 'CLIENTE'){
        cliente[name[1]] = reservation[key];
        delete reservation[key];
      }
    });
    reservation.DEPARTAMENTO = departamento;
    reservation.CLIENTE = cliente;
  });

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


export const checkInReservation = async (req, res) => {
  console.log(req.body)
  const { id_reserva, cancelado } = req.body;
  
  const response = await new Reservation().checkInReservation(id_reserva, cancelado);

  res.json(response);
};
