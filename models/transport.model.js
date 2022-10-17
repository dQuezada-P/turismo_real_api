import * as transportDao from '../dao/transport.dao.js'

class Transport {
    constructor (id, ciudad, vehiculo, horario, conductor, precio, patente){
        this.id = id
        this.ciudad = ciudad
        this.vehiculo = vehiculo
        this.horario = horario
        this.conductor = conductor
        this.precio = precio
        this.patente = patente
    }

    async getTransports(){
        return await transportDao.getTransports();
    }
    async addTransport() {
        return await transportDao.addTransport(this);
    }
}

export default Transport;