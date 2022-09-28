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
      "",
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
        department.ID_LOCALIDAD,
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
    console.log(id)
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
    let  departmentObj = null;
    rows.map((department) => {
      departmentObj = new Department(
        department.ID,
        department.NOMBRE,
        department.NUMERO_BANNO,
        department.NUMERO_HABITACION,
        department.FECHA_INS,
        department.DIRECCION,
        department.VALOR_ARRIENDO,
        department.ID_LOCALIDAD,
        department.UBICACION,
        department.DESCRIPCION,
        department.ESTADO_DISPONIBLE,
        department.ESTADO_RESERVA,
        department.IMAGENES
      );
    });
    return departmentObj;
  }

  async addDepartmetBD(responseAction) {
    const dateNow = new Date();
    const _fecha = `${dateNow.getDate()}-${dateNow.getMonth()}-${dateNow.getFullYear()}`;

    let sql = `BEGIN ACCIONES_DEPARTAMENTO.CREAR_DEPARTAMENTO(
      :nombre,
      :numero_banno,
      :numero_habitacion,
      :fecha,
      :direccion,
      :valor_arriendo,
      :id_localidad,
      :descripcion,
      :r,
      :msg);
      END;`;
      // :estado_disponible,
      // :estado_reserva,
    let binds = {
      nombre: this.NOMBRE,
      numero_banno: this.NUMERO_BANNO,
      numero_habitacion: this.NUMERO_HABITACION,
      fecha: _fecha,
      direccion: this.DIRECCION,
      valor_arriendo: this.VALOR_ARRIENDO,
      id_localidad: this.ID_LOCALIDAD,
      descripcion: this.DESCRIPCION,
      // estado_disponible: this.estado_disponible,
      // estado_reserva: this.estado_reserva,
      r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
      msg: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
    };

    console.log('binds')
    console.log(binds)

    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      isAutoCommit: true,
    };

    const callBack = async (res) => {
      const images = await UploadImagen(this.IMAGENES);

      if (images) {
        binds = {
          id: res.r,
          imagenes: images.toString(),
          r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        };

        sql = `BEGIN ACCIONES_DEPARTAMENTO.ACTUALIZAR_IMAGENES(
              :id,
              :imagenes,
              :r);
              END;`;

        const {r} = await connectdb(sql, binds, { isAutoCommit: true });
        console.log(r);
        responseAction(r)
      }
    };

    try {
      await connectdb(sql, binds, options).then((resultSet) => {
        console.log("resultSet")
        console.log(resultSet)
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
      id: this.id,
      nombre: this.nombre,
      numero_banno: this.numero_banno,
      numero_habitacion: this.numero_habitacion,
      fecha: _fecha,
      direccion: this.direccion,
      valor_arriendo: this.valor_arriendo,
      id_localidad: this.id_localidad,
      descripcion: this.descripcion,
      estado_disponible: this.estado_disponible,
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
