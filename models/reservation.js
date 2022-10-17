import * as reservationDao from "../dao/reservationDao.js";

class Reservation{
  constructor(
    ID,
    FECHA_INICIO,
    DIAS,
    CANTIDAD_PERSONA,
    CLIENTE,
    DEPARTAMENTO,
    CHECKIN,
    CHECKOUT,
    ABONO,
  )
  {
    this.id = ID,
    this.fecha_inicio = FECHA_INICIO,
    this.dias = DIAS,
    this.cantidad_persona = CANTIDAD_PERSONA,
    this.cliente = CLIENTE,
    this.departamento = DEPARTAMENTO,
    this.checkin = CHECKIN,
    this.checkout = CHECKOUT,
    this.abono = ABONO
  }

  async createReservation(){
    return reservationDao.createReservationBD(this)
  }

  get ID() {
    return this.id;
  }

  set ID(newValue) {
    this.id = newValue;
  }
  get FECHA_INICIO() {
    return this.fecha_inicio;
  }

  set FECHA_INICIO(newValue) {
    this.fecha_inicio = newValue;
  }
  get DIAS() {
    return this.dias;
  }

  set DIAS(newValue) {
    this.dias = newValue;
  }
  get CANTIDAD_PERSONA() {
    return this.cantidad_persona;
  }

  set CANTIDAD_PERSONA(newValue) {
    this.cantidad_persona = newValue;
  }
  get CLIENTE() {
    return this.cliente;
  }

  set CLIENTE(newValue) {
    this.cliente = newValue;
  }
  get DEPARTAMENTO() {
    return this.departamento;
  }

  set DEPARTAMENTO(newValue) {
    this.departamento = newValue;
  }
  get CHECKIN() {
    return this.checkin;
  }

  set CHECKIN(newValue) {
    this.checkin = newValue;
  }
  get CHECKOUT() {
    return this.checkout;
  }

  set CHECKOUT(newValue) {
    this.checkout = newValue;
  }
  get ABONO() {
    return this.abono;
  }

  set ABONO(newValue) {
    this.abono = newValue;
  }
}

export default Reservation
