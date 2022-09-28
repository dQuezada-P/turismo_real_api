import Department from "./departmentModel.js";
import { connectdb } from "../config/config.js";
import oracledb from "oracledb";
import { UploadImagen } from "../controllers/files.js";

export class DepartmentDao extends Department {
  constructor(
    ID,
    NOMBRE,
    NUMERO_BANNO,
    NUMERO_HABITACION,
    FECHA_INS,
    DIRECCION,
    VALOR_ARRIENDO,
    ID_LOCALIDAD,
    DESCRIPCION,
    ESTADO_DISPONIBLE,
    ESTADO_RESERVA,
    IMAGENES
  ) {
    super(
      ID,
      NOMBRE,
      NUMERO_BANNO,
      NUMERO_HABITACION,
      FECHA_INS,
      DIRECCION,
      VALOR_ARRIENDO,
      ID_LOCALIDAD,
      DESCRIPCION,
      ESTADO_DISPONIBLE,
      ESTADO_RESERVA,
      IMAGENES
    );
  }

  async getDepartmentsBD() {
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
    const listDepartments = rows.map((department) => {
      return new Department(
        department.ID,
        department.NOMBRE,
        department.NUMERO_BANNO,
        department.NUMERO_HABITACION,
        department.FECHA_INS,
        department.DIRECCION,
        department.VALOR_ARRIENDO,
        department.UBICACION,
        department.DESCRIPCION,
        department.ESTADO_DISPONIBLE,
        department.ESTADO_RESERVA,
        department.IMAGENES
      );
    });
    return listDepartments;
  }

  async getDepartmentBD(id) {
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
        console.log(resultSet.cursor);
      });
      rows = await result.getRows();
      console.log(rows);
      result.close();
    } catch (error) {
      console.error(error);
    }
    const listDepartments = rows.map((department) => {
      return new Department(
        department.ID,
        department.NOMBRE,
        department.NUMERO_BANNO,
        department.NUMERO_HABITACION,
        department.FECHA_INS,
        department.DIRECCION,
        department.VALOR_ARRIENDO,
        department.UBICACION,
        department.DESCRIPCION,
        department.ESTADO_DISPONIBLE,
        department.ESTADO_RESERVA,
        department.IMAGENES
      );
    });
    return listDepartments;
  }

  async addDepartmetBD(formFiles) {
    const dateNow = new Date();
    const _fecha = `${dateNow.getDate()}-${dateNow.getMonth()}-${dateNow.getFullYear()}`;

    let result;
    let sql = `BEGIN ACCIONES_DEPARTAMENTO.CREAR_DEPARTAMENTO(:nombre,
                                                                :numero_banno,
                                                                :numero_habitacion,
                                                                :fecha,
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
      nombre: this._nombre,
      numero_banno: this._numero_banno,
      numero_habitacion: this._numero_habitacion,
      fecha: _fecha,
      direccion: this._direccion,
      valor_arriendo: this._valor_arriendo,
      id_localidad: this._id_localidad,
      descripcion: this._descripcion,
      estado_disponible: this._estado_disponible,
      estado_reserva: this.estado_reserva,
      r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
      msg: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
    };

    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      isAutoCommit: true,
    };

    const callBack = async (res) => {
      const images = await UploadImagen(formFiles);
      console.log(images);

      if (images) {
        binds = {
          id: res.r,
          imagenes: images.toString(),
          r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        };
        console.log(binds);

        sql = `BEGIN ACCIONES_DEPARTAMENTO.ACTUALIZAR_IMAGENES(
              :id,
              :imagenes,
              :r);
              END;`;

        const { r } = await connectdb(sql, binds, { isAutoCommit: true });
      }
    };
    try {
      await connectdb(sql, binds, options).then((resultSet) => {
        callBack(resultSet);
      });
    } catch (error) {
      console.error(error);
    }
  }

  async editDepartmentBD() {
    const dateNow = new Date();
    const _fecha = `${dateNow.getDate()}-${dateNow.getMonth()}-${dateNow.getFullYear()}`;
    let result;
    const sql = `BEGIN ACCIONES_DEPARTAMENTO.MODIFICAR_DEPARTAMENTO(
                                                                :id,
                                                                :nombre,
                                                                :numero_banno,
                                                                :numero_habitacion,
                                                                :fecha,
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
      id: this._id,
      nombre: this._nombre,
      numero_banno: this._numero_banno,
      numero_habitacion: this._numero_habitacion,
      fecha: _fecha,
      direccion: this._direccion,
      valor_arriendo: this._valor_arriendo,
      id_localidad: this._id_localidad,
      descripcion: this._descripcion,
      estado_disponible: this._estado_disponible,
      estado_reserva: this.estado_reserva,
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
  }

  async deleteDepartmentBD(id) {
    let result;
    const sql = `BEGIN ACCIONES_DEPARTAMENTO.ELIMINAR_DEPARTAMENTO(:id,:r,:msg); END;`;
    const binds = {
      id: id,
      r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
      msg: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
    };
    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      isAutoCommit: true,
    };
    try {
      await connectdb(sql, binds, options).then((resultSet) => {
        result = resultSet;
      });
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
