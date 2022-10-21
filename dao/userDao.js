import oracledb from "oracledb";
import { connectdb } from "../config/config.js";

export const getUser = async (rut, correo) => {
  try {
    const sql = `BEGIN ACCIONES_USUARIO.VER_USUARIO_CLIENTE(:rut,:cursor); END;`;

    const binds = {
      rut: rut,
      cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
    };

    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      isAutoCommit: true,
    };

    const { cursor } = await connectdb(sql, binds, options);

    if ( cursor !== undefined ){
      const [user] = await cursor.getRows();
      return user;
    }
    return false;
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async () => {
  try {
	  const sql = `BEGIN ACCIONES_USUARIO.VER_USUARIOS_CLIENTE(:cursor); END;`;
    const binds = {
      cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
    };
    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      isAutoCommit: false,
    };

    const { cursor } = await connectdb(sql, binds, options);
    const users = await cursor.getRows();
    console.log(users);
    return users;
  } catch (error) {
    console.error(error);
  }
};

export const addUser = async (user) => {
  try {
    const sql = `BEGIN ACCIONES_USUARIO.CREAR_USUARIO(  
      :rut,
      :nombre,
      :apellido,
      :correo,
      :estado,
      :direccion,
      :telefono,
      :password,
      :rol,
      :r,
      :msg );
      END;`;

    const binds = {
      rut: user.rut,
      nombre: user.nombre,
      apellido: user.apellido,
      correo: user.correo,
      estado: "A",
      direccion: user.direccion,
      telefono: user.telefono,
      password: user.pass,
      rol: 3,
      r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
      msg: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
    };
    console.log(binds)

    const options = {
      isAutoCommit: true,
    };

    const response = await connectdb(sql, binds, options);
    console.log(response)
    return response;
  } catch (error){
    console.log(error);
    return error;
  }
};

export const editUser = async (user) => {
  try {
     
    const sql = `BEGIN ACCIONES_USUARIO.MODIFICAR_USUARIO(  
      :rut,
      :nombre,
      :apellido,
      :correo,
      :direccion,
      :telefono,
      :r,
      :msg );
      END;`;

    const binds = {
      rut: user.rut,
      nombre: user.nombre,
      apellido: user.apellido,
      correo: user.correo,
      direccion: user.direccion,
      telefono: user.telefono,
      r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
      msg: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
    };
    console.log(binds)

    const options = {
      isAutoCommit: true,
    };
  
    const response = await connectdb(sql, binds, options);
    console.log(response)
    return response;
    
  } catch (error) {
    console.log(error);
    return error;
  }
};

