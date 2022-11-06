import bcrypt from "bcrypt";

import * as userDao from "../dao/user.dao.js"

class User {
    constructor(rut,nombre,apellido,imagen,correo,estado,direccion,telefono,pass,id_rol) {
      (this._rut = rut),
      (this._nombre  = nombre),
      (this._apellido = apellido),
      (this._imagen = imagen),
      (this._correo = correo),
      (this._estado = estado),
      (this._direccion = direccion),
      (this._telefono = telefono),
      (this._pass = pass),
      (this._id_rol = id_rol)
    }

    async getUser(rut, correo = null){
        return await userDao.getUser(rut, correo)
    }

    async getUserById(id) {
        return await userDao.getUserById(id)
    }

    async getUsers(){
        return await userDao.getUsers()
    }

    async getClients(){
        return await userDao.getClients();
    }

    async getEmployees(){
        return await userDao.getEmployees();
    }

    // async getDrivers(id_rol){
    //     return await userDao.getUsers(id_rol)
    // }

    async addUser(){
        return await userDao.addUser(this)
    }

    async editUser(){
        return await userDao.editUser(this)
    }

    async deleteUser(rut){
        return await userDao.deleteUser(rut)
    }

    async findUser(username){
        return await userDao.findUser(username)
    }

    async comparePassword (password, hashedPassword)  {
        return await bcrypt.compare(password, hashedPassword)
    }

    async encryptPassword (password) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    };
  
    get rut() {
        return this._rut;
    }
  
    set rut(newvalue) {
        this._rut = newvalue;
    }
    get nombre() {
        return this._nombre;
    }
  
    set nombre(newvalue) {
        this._nombre = newvalue;
    }
  
    get apellido() {
        return this._apellido;
    }
  
    set apellido(newvalue) {
        this._apellido = newvalue;
    }
  
    get imagen() {
        return this._imagen;
    }
  
    set imagen(newvalue) {
        this._imagen = newvalue;
    }
  
    get correo() {
        return this._correo;
    }
  
    set correo(newvalue) {
        this._correo = newvalue;
    }
  
    get estado() {
        return this._estado;
    }
  
    set estado(newvalue) {
        this._estado = newvalue;
    }
  
    get direccion() {
        return this._direccion;
    }
  
    set direccion(newvalue) {
        this._direccion = newvalue;
    }
  
    get telefono() {
        return this._telefono;
    }
    set telefono(newvalue) {
        this._telefono = newvalue;
    }
  
    get pass() {
        return this._pass;
    }
    set pass(newvalue) {
        this._pass = newvalue;
    }
  
    get id_rol() {
        return this._id_rol;
    }
    set id_rol(newvalue) {
        this._id_rol = newvalue;
    }
  
}
export default User;
  