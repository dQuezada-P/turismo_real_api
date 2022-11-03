import * as  EsDao from "../dao/estadistica.Dao.js";

class Estadistica {
    constructor ( fecha1, fecha2){
        
        this.fecha1 = fecha1   
        this.fecha2 = fecha2
    }
    
    async filtroAnno(){
        return await EsDao.filtroAnno(this);
    }
   

    get fecha1() {
        return this._fecha1;
    }  
    set fecha1(newvalue) {
        this._fecha1= newvalue;
    }

    get fecha2() {
        return this._fecha2;
    }  
    set fecha2(newvalue) {
        this._fecha2= newvalue;
    }
  
}

export default Estadistica;