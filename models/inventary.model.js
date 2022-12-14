import * as InventaryDao from '../dao/inventary.dao.js';

class Inventary {
  constructor(args){
    this._id = args.id;
    this._id_departamento = args.id_departamento;
    this._id_producto = args.id_producto;    
    this._cantidad = args.cantidad;    
    this._estado = args.estado;
    this._descripcion = args.descripcion;    
    this._costo_reparacion = args.costo_reparacion;
    this._nombre = args.nombre;
    this._precio = args.precio;
  }

  async getInventary(id_departamento) {
    return await InventaryDao.getInventary(id_departamento);
  }

  async addInventary () {
    return await InventaryDao.addInventary(this);   
  }

  async editInventary() {
    return await InventaryDao.editInventary(this);
  }

  async checkoutInventary() {
    return await InventaryDao.checkoutInventary(this);
  }

  async deleteInventaryItem(id) {
    return await InventaryDao.deleteInventaryItem(id);
  }

  get id(){
    return this._id;
  }

  set id(newvalue){
    this._id = newvalue;
  }

  get id_producto(){
    return this._id_producto;
  }

  set id_producto(newvalue){
    this._id_producto = newvalue;
  }

  get nombre(){
    return this._nombre;
  }

  set nombre(newvalue){
    this._nombre = newvalue;
  }

  get id_departamento(){
    return this._id_departamento;
  }

  set id_departamento(newvalue){
    this._id_departamento = newvalue;
  }

  get cantidad(){
    return this._cantidad;
  }

  set cantidad(newvalue){
    this._cantidad = newvalue;
  }

  get precio(){
    return this._precio;
  }

  set precio(newvalue){
    this._precio = newvalue;
  }

  get estado(){
    return this._estado;
  }

  set estado(newvalue){
    this._estado = newvalue;
  }

  get descripcion(){
    return this._descripcion;
  }

  set descripcion(newvalue){
    this._descripcion = newvalue;
  }

  get costo_reparacion(){
    return this._costo_reparacion;
  }

  set costo_reparacion(newvalue){
    this._costo_reparacion = newvalue;
  }
}

export default Inventary;