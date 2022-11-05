import Estadistica from "../models/estadistica.Model.js";


export const countDepartments = async (req, res) => {
    try {        
        const cant_departments = await getCantDepartments();
        res.json(cant_departments);
    } catch (error) {
      console.error(error);
    }
  };

export const filtroDepartamento = async (req, res ) => {
  try {  
    const {  id_departamento, fecha1, fecha2 } = req.query;  
    const newEstadistic = new Estadistica( id_departamento, null, fecha1, fecha2);
    
    const response = await newEstadistic.filtroDepartamento();
    res.json(response);
  } catch (error) {
    console.error(error);   
  }
}

export const filtroLocalidad = async (req, res ) => {
  try {  
    const {  id_localidad, fecha1, fecha2 } = req.query;  
    const newEstadistic = new Estadistica( null, id_localidad, fecha1, fecha2);
    
    const response = await newEstadistic.filtroLocalidad();
    res.json(response);
  } catch (error) {
    console.error(error);   
  }
}