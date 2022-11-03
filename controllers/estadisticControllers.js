import Estadistica from "../models/estadistica.Model.js";


// export const countDepartments = async (req, res) => {
//     try {
//         const cant_departments = await EsDao.getCantDepartments();
//         res.json(cant_departments);
//     } catch (error) {
//       console.error(error);
//     }
//   };

export const filtroAnno = async (req, res ) => {
  try {  
    const {  fecha1, fecha2 } = req.query;  
    const newEstadistic = new Estadistica( fecha1, fecha2);
    
    const response = await newEstadistic.filtroAnno();
    res.json(response);
  } catch (error) {
    console.error(error);   
  }
}