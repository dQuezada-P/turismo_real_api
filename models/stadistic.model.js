import * as  EsDao from "../dao/stadistic.dao.js";

class Estadistica {
    constructor (id_departamento, id_localidad, fecha1, fecha2){
        this._id_departamento = id_departamento
        this._id_localidad = id_localidad
        this._fecha1 = fecha1   
        this._fecha2 = fecha2
    }
    
    async getCantDepartments(){
        return await EsDao.getCantDepartments();
    }

    async filtroDepartamento(){
        return await EsDao.filtroDepartamento(this);
    }

    async filtroLocalidad(){
        return await EsDao.filtroLocalidad(this);
    }
   
    get id_departamento(){
        return this._id_departamento;
    }
    set id_departamento(newvalue){
        this._id_departamento=newvalue;
    }

    get id_localidad(){
        return this._id_localidad;
    }
    set id_localidad(newvalue){
        this._id_localidad=newvalue;
    }

    get fecha1() {
        return this._fecha1;
    }
    set fecha1(newvalue) {
        this._fecha1=newvalue;
    }

    get fecha2() {
        return this._fecha2;
    }  
    set fecha2(newvalue) {
        this._fecha2=newvalue;
    }
}

export default Estadistica;

