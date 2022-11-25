import oracledb from "oracledb";
import internal from "stream";
import { connectdb } from "../config/config.js";
import { UploadImagen,DeleteFile } from "../controllers/files.controller.js";
import { AWS_FILE_ROUTE } from "../utils/credentials.js";

const ORACLE_ERRORS = {
  cons_correo: {
    code: 'C0016961',
    msg: 'El correo ya se encuentra registrado con otra cuenta'
  },
  cons_rut: {
    code: 'C0016960',
    msg: 'El rut ya se encuentra registrado con otra cuenta'
  }
}

export const getUser = async (rut, correo) => {
  try {
    const sql = `BEGIN ACCIONES_USUARIO.GET_USUARIO(:rut,:cursor); END;`;

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
      console.log(user)
      return user;
    }
    return false;
  } catch (error) {
    console.error(error);
  }
};

export const getUserById = async (id) => {
  try {
    const sql = `BEGIN ACCIONES_USUARIO.GET_USUARIO_BY_ID(:id,:cursor); END;`;

    const binds = {
      id: id,
      cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
    };

    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      isAutoCommit: true,
    };

    const { cursor } = await connectdb(sql, binds, options);
    if ( cursor !== undefined ){
      const [user] = await cursor.getRows();
      console.log(user)
      return user;
    }
    return false;
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async () => {
  try {
	  let sql = `BEGIN ACCIONES_USUARIO.GET_USUARIOS(:cursor); END;`;
    let binds = {
      cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
    };
    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      isAutoCommit: false,
    };

    const { cursor } = await connectdb(sql, binds, options);
    const users = await cursor.getRows();
    return users;

  } catch (error) {
    console.error(error);
  }
};


export const getClients = async () => {
  try {
	  let sql = `BEGIN ACCIONES_USUARIO.GET_CLIENTES(:cursor); END;`;
    let binds = {
      cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
    };
    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      isAutoCommit: false,
    };

    const { cursor } = await connectdb(sql, binds, options);
    const clients = await cursor.getRows();
    return clients;

  } catch (error) {
    console.error(error);
  }
};

export const getEmployees = async () => {
  try {
	  let sql = `BEGIN ACCIONES_USUARIO.GET_EMPLEADOS(:cursor); END;`;
    let binds = {
      cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
    };
    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      isAutoCommit: false,
    };

    const { cursor } = await connectdb(sql, binds, options);
    const employees = await cursor.getRows();
    const drivers = await getDrivers();

    employees.forEach(employee => {
      drivers.map(driver => {
        if ( employee.ID == driver.ID_USUARIO){
          employee.CONDUCTOR = driver;
        }
      });
    });

    return employees;

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
      direccion: user.direccion,
      telefono: user.telefono,
      password: user.pass,
      rol: user.id_rol,
      r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
      msg: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
    };
    console.log(binds)

    const options = {
      isAutoCommit: true,
    };

    const response = await connectdb(sql, binds, options);
    const user_id = response.r;
    const msg = response.msg;
    if (user_id == 0) {
      console.log(response)

      if (msg.includes(ORACLE_ERRORS.cons_correo.code)) {
        response.msg = ORACLE_ERRORS.cons_correo.msg;
      } else if (msg.includes(ORACLE_ERRORS.cons_rut.code)){
        response.msg = ORACLE_ERRORS.cons_rut.msg;
      }

      return response;
    }

    if (user.imagen){
      const image = await UploadImagen(user.imagen, user_id.toString(), AWS_FILE_ROUTE.U);

      const binds = {
        id: user_id,
        imagen: image.toString(),
        r: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
      };

      const sql = `BEGIN ACCIONES_USUARIO.ACTUALIZAR_IMAGENES(
        :id,
        :imagen,
        :r);
        END;`;

      return {
        r: await connectdb(sql, binds, { isAutoCommit: true }),
        msg: null
      }
    }

    
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


