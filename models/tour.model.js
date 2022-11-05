//Importamos Dao
import * as tourDao from '../dao/tour.dao.js'

class Tour {
    constructor(id, cupo, precio, fecha, hora_inicio, duracion, descripcion, estado, id_localidad){
        this._id = id
        this._cupo = cupo
        this._precio = precio
        this._fecha = fecha
        this._hora_inicio = hora_inicio
        this._duracion = duracion
        this._descripcion = descripcion
        this._estado = estado
        this._id_localidad = id_localidad
    }

    async getTours() {
        return await tourDao.getTours();
    }

    async addTour() {
        return await tourDao.addTour(this);
    }

    async getTour(id){
        return await tourDao.getTour(id);
    }

    async editTour(){
        return await tourDao.editTour(this);
    }

    async deleteTour(id){
        return await tourDao.deleteTour(id);        
    }


    get id() {
        return this._id;
    }  
    set id(newvalue) {
        this._id = newvalue;
    }

    get cupo() {
        return this._cupo;
    }  
    set cupo(newvalue) {
        this._cupo = newvalue;
    }

    get precio() {
        return this._precio;
    }  
    set precio(newvalue) {
        this._precio = newvalue;
    }

    get fecha() {
        return this._fecha;
    }  
    set fecha(newvalue) {
        this._fecha = newvalue;
    }

    get hora_inicio() {
        return this._hora_inicio;
    }  
    set hora_inicio(newvalue) {
        this._hora_inicio = newvalue;
    }

    get duracion() {
        return this._duracion;
    }  
    set duracion(newvalue) {
        this._duracion = newvalue;
    }

    get descripcion() {
        return this._descripcion;
    }  
    set descripcion(newvalue) {
        this._descripcion = newvalue;
    }  

    get descripcion() {
        return this._descripcion;
    }  
    set descripcion(newvalue) {
        this._descripcion = newvalue;
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
}

export default Tour;