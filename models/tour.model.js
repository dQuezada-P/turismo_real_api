//Importamos Dao
import * as tourDao from '../dao/tour.dao.js'

class Tour {
    constructor(params){
        this._id = params.id;
        this._cupo = params.cupo;
        this._precio = params.precio;
        this._fecha = params.fecha;
        this._hora_inicio = params.hora_inicio;
        this._duracion = params.duracion;
        this._descripcion = params.descripcion;
        this._estado = params.estado;
        this._id_localidad = params.id_localidad;
        this._imagenes = params.imagenes;
        this._deleted_files = params.deleted_files;
        this._prev_file_list_updated = params.prev_file_list_updated;
        this._last_files_count = params.last_files_count;
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

    get imagenes() {
        return this._imagenes;
    }
    set imagenes(newvalue) {
        this._imagenes = newvalue;
    }

    get deleted_files() {
        return this._deleted_files;
    }
    set deleted_files(newvalue) {
        this._deleted_files = newvalue;
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

export default Tour;