import { connectdb } from "../config/config.js";
import oracledb from "oracledb";
import { UploadImagen,DeleteFile } from "../controllers/files.controller.js";
oracledb.fetchAsString = [ oracledb.CLOB ];

//VER DEPARTAMENTO
export const getDepartmentsBD = async () => {
  const sql = `BEGIN ACCIONES_DEPARTAMENTO.VER_DEPARTAMENTOS(:cursor); END;`;

  const binds = {
    cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
  };
  const options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
    isAutoCommit: false,
  };
  let result;
  let rows;
  try {
    await connectdb(sql, binds, options).then((resultSet) => {
      result = resultSet.cursor;
    });
    rows = await result.getRows();
    result.close();
  } catch (error) {
    console.error(error);
  }
  return rows;
};
// VER DEPARTAMENTO
export const getDepartmentBD = async (id) => {
  const sql = `BEGIN ACCIONES_DEPARTAMENTO.VER_DEPARTAMENTO(:id,:cursor); END;`;
  const binds = {
    id: id,
    cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
  };
  const options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
    isAutoCommit: false,
  };
  let result;
  let rows;
  try {
    await connectdb(sql, binds, options).then((resultSet) => {
      result = resultSet.cursor;
    });
    rows = await result.getRows();
    result.close();
  } catch (error) {
    console.error(error);
  }
  return rows;
};
//AGREGAR DEPARTAMENTO
export const addDepartmetBD = async (department,responseAction) => {

  let sql = `BEGIN ACCIONES_DEPARTAMENTO.CREAR_DEPARTAMENTO(
      :nombre,
      :numero_banno,
      :numero_habitacion,
      :direccion,
      :valor_arriendo,
      :id_localidad,
      :descripcion,
      :estado_disponible,
      :estado_reserva,
      :r,
      :msg);
      END;`;

  let binds = {
    nombre: department.nombre,
    numero_banno: department.numero_banno,
    numero_habitacion: department.numero_habitacion,
    direccion: department.direccion,
    valor_arriendo: department.valor_arriendo,
    id_localidad: department.id_localidad,
    descripcion: department.descripcion,
    estado_disponible: department.estado_disponible,
    estado_reserva: department.estado_reserva,
    r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
    msg: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
  };

  const options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
    isAutoCommit: true,
  };

  const callBack = async (res) => {
    const department_id = res.r;

    if (department.imagenes) {
      const images = await UploadImagen(department.imagenes, department_id.toString());

      const binds = {
        id: department_id,
        deleted: '',
        imagenes: images.toString(),
        r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
      };

      const sql = `BEGIN ACCIONES_DEPARTAMENTO.ACTUALIZAR_IMAGENES(
              :id,
              :deleted,
              :imagenes,
              :r);
              END;`;

      const { r } = await connectdb(sql, binds, { isAutoCommit: true });
      responseAction(r);
      return;
    }
    responseAction(res);
  };

  try {
    await connectdb(sql, binds, options).then((resultSet) => {
      callBack(resultSet);
    });
  } catch (error) {
    console.error(error);
  }
};

//EDITAR DEPARTAMENTO
export const editDepartmentBD = async (department) => {
  const sql = `BEGIN ACCIONES_DEPARTAMENTO.MODIFICAR_DEPARTAMENTO(
    :id,
    :nombre,
    :numero_banno,
    :numero_habitacion,
    :direccion,
    :valor_arriendo,
    :estado,
    :id_localidad,
    :descripcion,
    :estado_disponible,
    :estado_reserva,
    :r,
    :msg);
    END;`;
  let binds = {
    id : department.id,
    nombre: department.nombre,
    numero_banno: department.numero_banno,
    numero_habitacion: department.numero_habitacion,
    direccion: department.direccion,
    valor_arriendo: department.valor_arriendo,
    estado: department.estado,
    id_localidad: department.id_localidad,
    descripcion: department.descripcion,
    estado_disponible: department.estado_disponible,
    estado_reserva: department.estado_reserva,
    r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
    msg: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
  };
  const options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
    isAutoCommit: true,
  };

  console.log(binds);

  try {
    const result = await connectdb(sql, binds, options);
    console.log(result)
    if (result.r == 1){
      let prevImages = '';
      let largo = department.prev_file_list_updated.length;
      for (let i=0;i<largo;i++){
        prevImages +=  department.prev_file_list_updated[i].url;
        if (i<largo-1){
          prevImages += ',';
        }
      }
      console.log('nuevo '+ prevImages);

      let images = null;
      if (department.imagenes) {
        images = await UploadImagen(department.imagenes, department.id.toString(), department.last_files_count);
      }  

      const binds = {
        id: department.id,
        imagenes: prevImages != '' ? images != null ? prevImages + ','+ images.toString() : prevImages : images != null ? images.toString() : '',
        r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
      };

      const sql = `BEGIN ACCIONES_DEPARTAMENTO.ACTUALIZAR_IMAGENES(
              :id,
              :imagenes,
              :r);
              END;`;

      const { r } = await connectdb(sql, binds, { isAutoCommit: true });
      
      return r;
      
    }

    return result;
  } catch (error) {
    console.error(error);
  }
};

//ELIMINAR TOUR
export const deleteDepartmentBD = async (id) => {
  try {
    const sql = `BEGIN ACCIONES_DEPARTAMENTO.ELIMINAR_DEPARTAMENTO(:id,:resultado); END;`;
    
    const binds = {
      id: id,
      resultado: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },             
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