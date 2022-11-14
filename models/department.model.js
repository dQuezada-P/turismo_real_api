
import * as departmentDao from '../dao/department.dao.js';

class Department {
  constructor(params) {
    this._id = params.id;
    this._nombre  = params.nombre;
    this._numero_banno = params.numero_banno;
    this._numero_habitacion = params.numero_habitacion;
    this._direccion = params.direccion;
    this._valor_arriendo = params.valor_arriendo;
    this._estado = params.estado;
    this._id_localidad = params.id_localidad;
    this._ubicacion = params.ubicacion;
    this._descripcion = params.descripcion;
    this._estado_disponible = params.estado_disponible;
    this._estado_reserva = params.estado_reserva;
    this._imagenes = params.imagenes;
    this._prev_file_list_updated = params.prev_file_list_updated;
    this._last_files_count = params.last_files_count;
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

  get prev_file_list_updated() {
    return this._prev_file_list_updated;
  }
  set prev_file_list_updated(newvalue) {
    this._prev_file_list_updated = newvalue;
  }

  get last_files_count() {
    return this._last_files_count;
  }
  set last_files_count(newvalue) {
    this._last_files_count = newvalue;
  }
}
export default Department;