import oracledb from "oracledb";
import internal from "stream";
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

export const getUsers = async (id_rol) => {
  try {
	  let sql = `BEGIN ACCIONES_USUARIO.GET_USUARIOS(:id_rol, :cursor); END;`;
    let binds = {
      id_rol: parseInt(id_rol),
      cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
    };
    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      isAutoCommit: false,
    };

    const { cursor } = await connectdb(sql, binds, options);
    const users = await cursor.getRows();

    if (id_rol != 4) return users;

    const drivers = await getDrivers();
    return { users, drivers }

  } catch (error) {
    console.error(error);
  }
};

const getDrivers = async () => {
  try {
    const sql = `BEGIN ACCIONES_USUARIO.GET_CONDUCTORES(:cursor); END;`;
    const binds = {
      cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
    };  
    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      isAutoCommit: false,
    };

    const { cursor } = await connectdb(sql, binds, options);
    return await cursor.getRows();
  } catch (error) {
    
  }
}

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
      estado: user.estado,     
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
      :estado,
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
      estado: user.estado,
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

export const deleteUser = async (rut) => {
  try {
    const sql = `BEGIN ACCIONES_USUARIO.ELIMINAR_USUARIO(:rut,:r);END;`;

    const binds = {
      rut: rut,      
      r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT},
    };
   

    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      isAutoCommit: true,
    };

    const r = await connectdb(sql, binds, options);    
    return r;
  } catch (error) {
    console.error(error);
  }
}


