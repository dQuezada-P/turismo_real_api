import Estadistica from "../models/stadistic.model.js";
import * as EsDao from "../dao/stadistic.dao.js";

export const getCantDepartmentsDisp = async (req, res) => {
    try {        
        const cant_departments_disp = await EsDao.getCantDepartmentsDisp();
        res.json(cant_departments_disp);
    } catch (error) {
      console.error(error);
    }
  };

  export const getCantDepartmentsRes = async (req, res) => {
    try {        
        const cant_departments_res = await EsDao.getCantDepartmentsRes();
        res.json(cant_departments_res);
    } catch (error) {
      console.error(error);
    }
  };

  export const getCantTour = async (req, res) => {
    try {        
        const cant_tour = await EsDao.getCantTour();
        res.json(cant_tour);
    } catch (error) {
      console.error(error);
    }
  };

  export const getCantTransport = async (req, res) => {
    try {        
        const cant_transport = await EsDao.getCantTransport();
        res.json(cant_transport);
    } catch (error) {
      console.error(error);
    }
  };

  export const getGananciaTotal = async (req, res) => {
    try {        
        const ganancia_total = await EsDao.getGananciaTotal();
        res.json(ganancia_total);
    } catch (error) {
      console.error(error);
    }
  };

export const filtroDepartamento = async (req, res ) => {
  try {  
    const {  id_departamento, fecha1, fecha2 } = req.query;  
    console.log(req.query);
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
    console.log(req.query);
    const response = await newEstadistic.filtroLocalidad();
    res.json(response);
  } catch (error) {
    console.error(error);   
  }
}