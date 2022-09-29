import * as userDal from "../dao/userDao.js"

class User {
    constructor(RUT,NOMBRE,APELLIDO,IMAGEN,CORREO,ESTADO,DIRECCION,TELEFONO,PASS,ID_ROL) {
      (this._rut = RUT),
      (this._nombre  = NOMBRE),
      (this.apellido = APELLIDO),
      (this.imagen = IMAGEN),
      (this.correo = CORREO),
      (this.estado = ESTADO),
      (this.direccion = DIRECCION),
      (this.telefono = TELEFONO),
      (this.pass = PASS),
      (this.id_rol = ID_ROL)
    }

    getUser(){
        
    }

    async getUsers(){
        return await userDal.getUsers()
    }

    addUser(){

    }
    
  
    get RUT() {
      return this.rut;
    }
  
    set RUT(newValue) {
      this.rut = newValue;
    }
    get NOMBRE() {
      return this.nombre;
    }
  
    set NOMBRE(newValue) {
      this.nombre = newValue;
    }
  
    get APELLIDO() {
      return this.apellido;
    }
  
    set APELLIDO(newValue) {
      this.apellido = newValue;
    }
  
    get IMAGEN() {
      return this.imagen;
    }
  
    set IMAGEN(newValue) {
      this.imagen = newValue;
    }
  
    get CORREO() {
      return this.correo;
    }
  
    set CORREO(newValue) {
      this.correo = newValue;
    }
  
    get ESTADO() {
      return this.estado;
    }
  
    set ESTADO(newValue) {
      this.estado = newValue;
    }
  
    get DIRECCION() {
      return this.direccion;
    }
  
    set DIRECCION(newValue) {
      this.direccion = newValue;
    }
  
    get TELEFONO() {
      return this.telefono;
    }
    set TELEFONO(newValue) {
      this.telefono = newValue;
    }
  
    get PASS() {
      return this.pass;
    }
    set PASS(newValue) {
      this.pass = newValue;
    }
  
    get ID_ROL() {
      return this.id_rol;
    }
    set ID_ROL(newValue) {
      this.id_rol = newValue;
    }
  
}
export default User;
  