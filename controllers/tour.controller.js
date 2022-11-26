//Importamos Modelo
import Tour from "../models/tour.model.js";

export const getTours = async (req, res) => {
  const tourModel = new Tour({});  
  let tourList = await tourModel.getTours();
  tourList = tourList.map((tour) => {
    if (tour.IMAGENES != null)
      tour.IMAGENES = tour.IMAGENES.split(",").map((img) => {
        const destructured = img.split("/");
        const imgName = destructured[destructured.length - 1];
        return {
          name: imgName,
          url: img,
        };
      });
      else delete tour.IMAGENES;
    return tour;
  });  
  res.json(tourList);
  
};

export const addTour = async (req, res) => {
  const { cupo, precio, fecha, hora_inicio, duracion, descripcion, id_localidad } = JSON.parse(req.body.content);
  
  const tourModel = new Tour({id:null, cupo, precio,fecha, hora_inicio, duracion, descripcion, estado:null, id_localidad, imagenes:req.files});

  console.log(tourModel);

  const resultado = await tourModel.addTour();
  res.json(resultado);
};

export const getTour = async (req, res) => {
try {
  const { id } = req.query;
  const tour = await new Tour({}).getTour(id);
  if (tour == null){
    res.json({ msg: "Tour no se encuentra registrado" });
    return;
  }
  if (tour.IMAGENES != null)
    tour.IMAGENES = tour.IMAGENES.split(",").map((img) => {
      const destructured = img.split("/");
      const imgName = destructured[destructured.length - 1];
      return {
        name: imgName,
        url: img,
      };
    });
  res.json(tour);
  } catch (error) {
    console.error(error);
  }
}

export const editTour = async (req, res) => {
  const { id, cupo, precio, fecha, hora_inicio, duracion, descripcion, estado, id_localidad,deleted_files, prev_file_list_updated, last_files_count } = JSON.parse(req.body.content);
  
  const newTour = new Tour({id, cupo, precio,fecha, hora_inicio, duracion, descripcion, estado, id_localidad, imagenes:req.files, deleted_files, prev_file_list_updated, last_files_count});
  console.log(newTour);
  const response = await newTour.editTour();
  
  res.json(response);
}

export const deleteTour = async (req, res) => {
  try {
    const {id} = req.params;    
    const tour = await new Tour({}).deleteTour(id);
    console.log(tour);
    
    if (tour == 0)
      res.json({msg: "Tour no existe"});
    res.json(tour);    
  } catch (error) {
    console.error(error);
  }
}