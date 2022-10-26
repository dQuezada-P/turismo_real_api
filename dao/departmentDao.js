import { connectdb } from "../config/config.js";
import oracledb from "oracledb";
import { UploadImagen,DeleteFile } from "../controllers/files.js";
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
      :estado,
      :id_localidad,
      :descripcion,
      :estado_disponible,
      :estado_reserva,
      :r,
      :msg);
      END;`;

  let binds = {
    nombre: department.NOMBRE,
    numero_banno: department.NUMERO_BANNO,
    numero_habitacion: department.NUMERO_HABITACION,
    direccion: department.DIRECCION,
    valor_arriendo: department.VALOR_ARRIENDO,
    estado: department.DESTADO,
    id_localidad: department.ID_LOCALIDAD,
    descripcion: department.DESCRIPCION,
    estado_disponible: department.estado_disponible,
    estado_reserva: department.estado_reserva,
    r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
    msg: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
  };

  const options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
    isAutoCommit: true,
  };

  const callBack = async (res) => {3
    const department_id = res.r;
    const images = await UploadImagen(department.IMAGENES, department_id.toString());

    if (images) {
      binds = {
        id: department_id,
        imagenes: images.toString(),
        r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
      };

      sql = `BEGIN ACCIONES_DEPARTAMENTO.ACTUALIZAR_IMAGENES(
              :id,
              :imagenes,
              :r);
              END;`;

      const { r } = await connectdb(sql, binds, { isAutoCommit: true });
      responseAction(r);
     
    }
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

  let result;
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
    id : department.ID,
    nombre: department.NOMBRE,
    numero_banno: department.NUMERO_BANNO,
    numero_habitacion: department.NUMERO_HABITACION,
    direccion: department.DIRECCION,
    valor_arriendo: department.VALOR_ARRIENDO,
    estado: department.ESTADO,
    id_localidad: department.ID_LOCALIDAD,
    descripcion: department.DESCRIPCION,
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
    await connectdb(sql, binds, options).then((resultSet) => {
      result = resultSet;
    });
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