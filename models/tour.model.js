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
}

export default Tour;