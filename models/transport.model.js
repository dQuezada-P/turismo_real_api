import * as transportDao from '../dao/transport.dao.js'

class Transport {
    constructor (id, id_conductor, id_terminal, fecha, horario, precio){
        this.id = id
        this.id_conductor = id_conductor
        this.id_terminal = id_terminal
        this.fecha = fecha
        this.horario = horario
        this.precio = precio
    }

    async getTransports(){
        return await transportDao.getTransports();
    }
    async addTransport() {
        return await transportDao.addTransport(this);
    }
}

export default Transport;