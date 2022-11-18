import * as reservationDao from "../dao/reservation.dao.js";

class Reservation{
  constructor(
    id,
    fecha_inicio,
    dias,
    cantidad_persona,
    cliente,
    departamento,
    checkin,
    checkout,
    abono,
    transporte,
    tour,
  )
  {
    this._id = id,
    this._fecha_inicio = fecha_inicio,
    this._dias = dias,
    this._cantidad_persona = cantidad_persona,
    this._cliente = cliente,
    this._departamento = departamento,
    this._checkin = checkin,
    this._checkout = checkout,
    this._abono = abono,
    this._transporte = transporte,
    this._tour = tour
  }


  async getReservations(){
    return await reservationDao.getReservations();
  }

  async getUserReservations(id_user){
    return await reservationDao.getUserReservations(id_user);
  }

  async getReservation(id){
    return await reservationDao.getReservation(id);
  }

  async addReservation(){
    return await reservationDao.addReservation(this);
  }

  async checkInReservation(id, cancelado){
    return await reservationDao.checkInReservation(id, cancelado);
  }

  async checkOutReservation(id, cancelado){
    return await reservationDao.checkOutReservation(id, cancelado);
  }

  async getServicesByReservation (id){
    return await reservationDao.getServicesByReservation(id);
  }

  get id() {
    return this._id;
  }

  set id(newvalue) {
    this._id = newvalue;
  }
  get fecha_inicio() {
    return this._fecha_inicio;
  }

  set fecha_inicio(newvalue) {
    this._fecha_inicio = newvalue;
  }
  get dias() {
    return this._dias;
  }

  set dias(newvalue) {
    this._dias = newvalue;
  }
  get cantidad_persona() {
    return this._cantidad_persona;
  }

  set cantidad_persona(newvalue) {
    this._cantidad_persona = newvalue;
  }
  get cliente() {
    return this._cliente;
  }

  set cliente(newvalue) {
    this._cliente = newvalue;
  }
  get departamento() {
    return this._departamento;
  }

  set departamento(newvalue) {
    this._departamento = newvalue;
  }
  get checkin() {
    return this._checkin;
  }

  set checkin(newvalue) {
    this._checkin = newvalue;
  }
  get checkout() {
    return this._checkout;
  }

  set checkout(newvalue) {
    this._checkout = newvalue;
  }
  get abono() {
    return this._abono;
  }

  set abono(newvalue) {
    this._abono = newvalue;
  }
  get transporte() {
    return this._transporte;
  }

  set transporte(newvalue) {
    this._transporte = newvalue;
  }
  get tour() {
    return this._tour;
  }

  set tour(newvalue) {
    this._tour = newvalue;
  }
}

export default Reservation
