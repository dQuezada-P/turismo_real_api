//Importamos Dao
import * as tourDao from '../dao/tour.dao.js'

class Tour {
    constructor(id, cupo, precio, fecha, hora_inicio, duracion, descripcion, id_localidad){
        this.id = id
        this.cupo = cupo
        this.precio = precio
        this.fecha = fecha
        this.hora_inicio = hora_inicio
        this.duracion = duracion
        this.descripcion = descripcion
        this.id_localidad = id_localidad
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
    set rut(newvalue) {
        this._rut = newvalue;
    }
}

export default Tour;