//Importamos Modelo
import Tour from "../models/tour.model.js";

export const getTours = async (req, res) => {
  const tourModel = new Tour();
  const tourList = await tourModel.getTours();
  res.json(tourList);
};

export const addTour = async (req, res) => {
  const { cupo, precio, fecha, hora_inicio, duracion, descripcion, id_localidad } = req.body;
  const tourModel = new Tour(null, cupo, precio,fecha, hora_inicio, duracion, descripcion, id_localidad);

  console.log(tourModel);

  const resultado = await tourModel.addTour();
  res.json(resultado);
};
