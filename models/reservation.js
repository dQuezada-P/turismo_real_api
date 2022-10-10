import * as reservationDao from "../dao/reservationDao.js";

class Reservation{
  constructor(
    ID,
    FECHA_INICIO,
    FECHA_SALIDA,
    CANTIDAD_PERSONA,
    CLIENTE,
    DEPARTAMENTO,
    SERVICIO,
    CHECKIN,
    CHECKOUT
  )
  {
    this.id = ID,
    this.fecha_inicio = FECHA_INICIO,
    this.fecha_salida = FECHA_SALIDA,
    this.cantidad_persona = CANTIDAD_PERSONA,
    this.cliente = CLIENTE,
    this.departamento = DEPARTAMENTO,
    this.servicio = SERVICIO,
    this.checkin = CHECKIN,
    this.checkout = CHECKOUT
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
  get FECHA_SALIDA() {
    return this.fecha_salida;
  }

  set FECHA_SALIDA(newValue) {
    this.fecha_salida = newValue;
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
  get SERVICIO() {
    return this.servicio;
  }

  set SERVICIO(newValue) {
    this.servicio = newValue;
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
}

export default Reservation
