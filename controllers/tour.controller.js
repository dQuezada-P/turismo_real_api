//Importamos Modelo
import Tour from "../models/tour.model.js";

export const getTours = async (req, res) => {
  const tourModel = new Tour();  
  const tourList = await tourModel.getTours();  
  res.json(tourList);
  
};

export const addTour = async (req, res) => {
  const { cupo, precio, fecha, hora_inicio, duracion, descripcion, id_localidad } = req.body;
  const tourModel = new Tour(null, cupo, precio,fecha, hora_inicio, duracion, descripcion, null, id_localidad);

  console.log(tourModel);

  const resultado = await tourModel.addTour();
  res.json(resultado);
};

export const getTour = async (req, res) => {
try {
  const { id } = req.query;
  const tour = await new Tour().getTour(id)
  if (tour == null)
    res.json({ msg: "Tour no se encuentra registrado" });
  res.json(tour);
  } catch (error) {
    console.error(error);
  }
}

export const editTour = async (req, res) => {
  const { id, cupo, precio, fecha, hora_inicio, duracion, descripcion, estado, id_localidad } = req.body;
  
  const newTour = new Tour(id, cupo, precio,fecha, hora_inicio, duracion, descripcion, estado, id_localidad);
  console.log(newTour);
  const response = await newTour.editTour();
  
  res.json(response);
}

export const deleteTour = async (req, res) => {
  try {
    const {id} = req.params;    
    const tour = await new Tour().deleteTour(id)
    console.log(tour);
    
    if (tour == 0)
      res.json({msg: "Tour no existe"});
    res.json(tour);    
  } catch (error) {
    console.error(error);
  }
}