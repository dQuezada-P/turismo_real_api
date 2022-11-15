import { connectdb } from "../config/config.js";
import oracledb from "oracledb";
import { UploadImagen,DeleteFile } from "../controllers/files.controller.js";
import { AWS_FILE_ROUTE } from "../utils/credentials.js";
oracledb.fetchAsString = [ oracledb.CLOB ];

//VER TOURS
export const getTours = async () => {
  try {
    const sql = `BEGIN ACCIONES_TOUR.VER_TOURS(:cursor);END;`;

    const binds = {
      cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
    };

    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    };

    const { cursor } = await connectdb(sql, binds, options);
    return await cursor.getRows();
  } catch (error) {}
};

// VER TOUR
export const getTour = async (id) => {
  try {
    const sql = `BEGIN ACCIONES_TOUR.VER_TOUR(:id, :cursor);END;`;

    const binds = {
      id: id,
      cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT},
    };

    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      isAutoCommit: true,
    };

    const {cursor} = await connectdb(sql, binds, options);

    if (cursor !== undefined){
      const [tour] = await cursor.getRows();
      return tour;
    }
  } catch (error) {
    console.error(error);
  }
}

//AGREGAR TOUR Environment  
export const addTour = async (tour) => {
  const sql = `BEGIN ACCIONES_TOUR.CREAR_TOUR(        
        :cupo,
        :precio,
        :fecha,
        :hora_inicio,
        :duracion,
        :descripcion,
        :id_localidad,
        :resultado,
        :msg);
        END;`;

  const binds = {    
    cupo: tour.cupo,
    precio: tour.precio,
    fecha: tour.fecha,
    hora_inicio: tour.hora_inicio,
    duracion: tour.duracion,
    descripcion: tour.descripcion,
    id_localidad: tour.id_localidad,
    resultado: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
    msg: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
  };
  //console.log(binds)

  const options = {
    isAutoCommit: true
  }

  const { resultado, msg } = await connectdb(sql, binds, options);
  // console.log(msg)
  if (resultado != 0 && tour.imagenes) {
    const id_tour = resultado;
    console.log(tour.imagenes);
    const images = await UploadImagen(tour.imagenes, id_tour.toString(), AWS_FILE_ROUTE.T);
    console.log(images);

    const binds = {
      id: id_tour,
      imagenes: images.toString(),
      r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
    };

    const sql = `BEGIN ACCIONES_TOUR.ACTUALIZAR_IMAGENES(
      :id,
      :imagenes,
      :r);
      END;`;

    const { r } = await connectdb(sql, binds, { isAutoCommit: true });
    return r;
    
  }
  return resultado
};

//EDITAR TOUR
export const editTour = async (tour) => {
  try {    
    const sql = `BEGIN ACCIONES_TOUR.MODIFICAR_TOUR(   
      :id,     
      :cupo,
      :precio,
      :fecha,
      :hora_inicio,
      :duracion,
      :descripcion,
      :estado,
      :id_localidad,
      :resultado);
      END;`;

    const binds = {  
      id: tour.id,  
      cupo: tour.cupo,
      precio: tour.precio,
      fecha: tour.fecha,
      hora_inicio: tour.hora_inicio,
      duracion: tour.duracion,
      descripcion: tour.descripcion,
      estado: tour.estado,
      id_localidad: tour.id_localidad,
      resultado: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
    };
  //console.log(binds)

    const options = {
      isAutoCommit: true
    };

    const { resultado } = await connectdb(sql, binds, options);
    console.log(resultado);
    if (resultado == 1){
      let prevImages = '';
      const largo = tour.prev_file_list_updated.length;
      for (let i=0;i<largo;i++){
        prevImages +=  tour.prev_file_list_updated[i].url;
        if (i<largo-1){
          prevImages += ',';
        }
      }
      console.log('nuevo '+ prevImages);

      if (tour.deleted_files) {
        await DeleteFile(tour.deleted_files.map(file => file.name), AWS_FILE_ROUTE.T);
      }
      
      let images = null;
      if (tour.imagenes) {
        images = await UploadImagen(tour.imagenes, tour.id.toString(), AWS_FILE_ROUTE.T, tour.last_files_count);
      }  

      const binds = {
        id: tour.id,
        imagenes: prevImages != '' ? images != null ? prevImages + ','+ images.toString() : prevImages : images != null ? images.toString() : '' ,
        r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
      };

      const sql = `BEGIN ACCIONES_TOUR.ACTUALIZAR_IMAGENES(
              :id,
              :imagenes,
              :r);
              END;`;

      const { r } = await connectdb(sql, binds, { isAutoCommit: true });
      
      return r;
    }
    return resultado
  
      
  } catch (error) {
    console.log(error);
  }
};

//ELIMINAR TOUR

export const deleteTour = async (id) => {
  try {
    const sql = `BEGIN ACCIONES_TOUR.ELIMINAR_TOUR(:id,:resultado);END;`;

    const binds = {
      id: id,
      resultado: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT},
      };      

    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      isAutoCommit: true,
    };

    const resultado = await connectdb(sql, binds, options);    
    return resultado;
    
  } catch (error) {
    console.error(error);
  }


};