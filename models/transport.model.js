import * as transportDao from '../dao/transport.dao.js'

class Transport {
    constructor (id, id_conductor, id_terminal, fecha, horario, precio, estado){
        this._id = id
        this._id_conductor = id_conductor
        this._id_terminal = id_terminal
        this._fecha = fecha
        this._horario = horario
        this._precio = precio
        this._estado = estado
    }

    async getTransports(){
        return await transportDao.getTransports();
    }
    async addTransport() {
        return await transportDao.addTransport(this);
    }
    async getTransport(id){
        return await transportDao.getTransport(id);
    }
    async editTransport(){
        return await transportDao.editTransport(this);
    }

    async deleteTranspsort(id){
        return await transportDao.deleteTranspsort(id);
    }

    get id() {
        return this._id;
    }  
    set id(newvalue) {
        this._id = newvalue;
    }

    get id_conductor() {
        return this._id_conductor;
    }  
    set id_conductor(newvalue) {
        this._id_conductor = newvalue;
    }

    get id_terminal() {
        return this._id_terminal;
    }  
    set id_terminal(newvalue) {
        this._id_terminal = newvalue;
    }

    get fecha() {
        return this._fecha;
    }  
    set fecha(newvalue) {
        this._fecha = newvalue;
    }

    get horario() {
        return this._horario;
    }  
    set horario(newvalue) {
        this._horario = newvalue;
    }

    get precio() {
        return this._precio;
    }  
    set precio(newvalue) {
        this._precio = newvalue;
    }

    get estado() {
        return this._estado;
    }  
    set estado(newvalue) {
        this._estado = newvalue;
    }
}

export default Transport;