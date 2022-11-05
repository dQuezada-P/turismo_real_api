
import * as departmentDao from '../dao/department.dao.js';

class Department {
  constructor(
    id,
    nombre,
    numero_banno,
    numero_habitacion,
    direccion,
    valor_arriendo,
    estado,
    id_localidad,
    ubicacion,
    descripcion,
    estado_disponible,
    estado_reserva,
    imagenes,
    add_date,
    modified_date
  ) {
    (this._id = id),
    (this._nombre  = nombre),
    (this._numero_banno = numero_banno),
    (this._numero_habitacion = numero_habitacion),
    (this._direccion = direccion),
    (this._valor_arriendo = valor_arriendo),
    (this._estado = estado),
    (this._id_localidad = id_localidad),
    (this._ubicacion = ubicacion),
    (this._descripcion = descripcion),
    (this._estado_disponible = estado_disponible),
    (this._estado_reserva = estado_reserva),
    (this._imagenes = imagenes);
    (this._add_date = add_date);
    (this._modified_date = modified_date);
  }

  async getDepartments(){
    return await departmentDao.getDepartmentsBD()
  }

  async getDepartment(id){
    return await departmentDao.getDepartmentBD(id)
  }

  async addDepartment(responseAction){
    return await departmentDao.addDepartmetBD(this,responseAction)
  }

  async editDepartment(){
    return await departmentDao.editDepartmentBD(this)
  }

  async deleteDepartment(id){
   return departmentDao.deleteDepartmentBD(id)
  }

  get id() {
    return this._id;
  }

  set id(newvalue) {
    this._id = newvalue;
  }
  get nombre() {
    return this._nombre;
  }

  set nombre(newvalue) {
    this._nombre = newvalue;
  }

  get numero_banno() {
    return this._numero_banno;
  }

  set numero_banno(newvalue) {
    this._numero_banno = newvalue;
  }

  get numero_habitacion() {
    return this._numero_habitacion;
  }

  set numero_habitacion(newvalue) {
    this._numero_habitacion = newvalue;
  }

  get fecha_ins() {
    return this._fecha_ins;
  }

  set fecha_ins(newvalue) {
    this._fecha_ins = newvalue;
  }

  get direccion() {
    return this._direccion;
  }

  set direccion(newvalue) {
    this._direccion = newvalue;
  }

  get valor_arriendo() {
    return this._valor_arriendo;
  }

  set valor_arriendo(newvalue) {
    this._valor_arriendo = newvalue;
  }

  get estado() {
    return this._estado;
  }

  set estado(newvalue) {
    this._estado = newvalue;
  }

  get id_localidad() {
    return this._id_localidad;
  }
  set id_localidad(newvalue) {
    this._id_localidad = newvalue;
  }

  get ubicacion() {
    return this._ubicacion;
  }
  set ubicacion(newvalue) {
    this._ubicacion = newvalue;
  }

  get descripcion() {
    return this._descripcion;
  }
  set descripcion(newvalue) {
    this._descripcion = newvalue;
  }

  get imagenes() {
    return this._imagenes;
  }
  set imagenes(newvalue) {
    this._imagenes = newvalue;
  }

  get estado_disponible() {
    return this._estado_disponible;
  }
  set estado_disponible(newvalue) {
    this._estado_disponible = newvalue;
  }
  get estado_reserva() {
    return this._estado_reserva;
  }
  set estado_reserva(newvalue) {
    this._estado_reserva = newvalue;
  }

  get add_date() {
    return this._add_date;
  }
  set add_date(newvalue) {
    this._add_date = newvalue;
  }

  get modified_date() {
    return this._modified_date;
  }
  set modified_date(newvalue) {
    this._modified_date = newvalue;
  }
}
export default Department;