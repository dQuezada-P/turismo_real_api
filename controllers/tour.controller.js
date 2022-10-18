//Importamos Modelo
import Tour from "../models/tour.model.js";

export const getTours = async (req, res) => {
  const tourModel = new Tour();
  const tourList = await tourModel.getTours();
  res.json(tourList);
};

export const addTour = async (req, res) => {
  const { ciudad, cupo, precio, descripcion, horario } = req.body;
  const tourModel = new Tour(null, ciudad, cupo, precio, horario, descripcion);

  console.log(tourModel);

  const resultado = await tourModel.addTour();
  res.json(resultado);
};
