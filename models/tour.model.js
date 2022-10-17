//Importamos Dao
import * as tourDao from '../dao/tour.dao.js'

class Tour {
    constructor(id, ciudad, cupo, precio, horario, descripcion){
        this.id = id
        this.ciudad = ciudad
        this.cupo = cupo
        this.precio = precio
        this.horario = horario
        this.descripcion = descripcion
    }

    async getTours() {
        return await tourDao.getTours();
    }

    async addTour() {
        return await tourDao.addTour(this);
    }
}

export default Tour;