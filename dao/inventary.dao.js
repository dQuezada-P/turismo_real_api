import { connectdb } from "../config/config.js";
import oracledb from "oracledb";

export const getInventary = async (id_departamento) => {
  try {
    const sql = `BEGIN ACCIONES_INVENTARIO.GET_INVENTARIO(:id_departamento,:cursor);END;`;

    const binds = {
			id_departamento,
      cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
    };

    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    };
    
    const { cursor } = await connectdb(sql, binds, options);
    
    return await cursor.getRows();
  } catch (error) {
    console.log(error);
  }
};

export const addInventary = async (inventary) => {
  try {
    const sql = `BEGIN ACCIONES_INVENTARIO.CREAR_INVENTARIO(
      :id_departamento,
      :cantidad,
      :nombre,
      :precio,
      :resultado,
      :msg);
      END;`;
    
      const binds = {
        id_departamento: inventary.id_departamento,
        cantidad: inventary.cantidad,
        nombre: inventary.nombre,
        precio: inventary.precio,      
        resultado: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
        msg: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
      }
      const options = {
        isAutoCommit: true
      };

      const {resultado, msg} = await connectdb(sql, binds, options);
      console.log(binds)
      return resultado
    
  } catch (error) {
    console.log(error);
  }
  
};

export const editInventary = async (inventary) => {
  try {
    const sql = `BEGIN ACCIONES_INVENTARIO.MODIFICAR_INVENTARIO(
      :id,
      :cantidad,
      :estado,
      :descripcion,
      :costo_reparacion,
      :resultado);
      END;`;
    
      const binds = {
        id: inventary.id,
        cantidad: inventary.cantidad,
        estado: inventary.estado,
        descripcion: inventary.descripcion,
        costo_reparacion: inventary.costo_reparacion,
        resultado: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
      }
      const options = {
        isAutoCommit: true
      };

      const {resultado} = await connectdb(sql, binds, options);
      return resultado
    
  } catch (error) {
    console.log(error);
  }
  
};

export const checkoutInventary = async (inventary) => {
  try {
    const sql = `BEGIN ACCIONES_INVENTARIO.CHECKOUT_INVENTARIO(
      :id,
      :estado,
      :descripcion,
      :costo_reparacion,
      :resultado);
      END;`;
    
      const binds = {
        id: inventary.id,
        estado: inventary.estado,
        descripcion: inventary.descripcion,
        costo_reparacion: inventary.costo_reparacion,
        resultado: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
      }

      console.log(binds)
      const options = {
        isAutoCommit: true
      };

      const {resultado} = await connectdb(sql, binds, options);
      return resultado
    
  } catch (error) {
    console.log(error);
  }
  
}

export const deleteInventaryItem = async (id) => {
  try {
    const sql = `BEGIN ACCIONES_INVENTARIO.ELIMINAR_INVENTARIO(:id,:resultado); END;`;
    
    const binds = {
      id: id,
      resultado: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },             
    };    

    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
      isAutoCommit: true,
    };
    console.log(binds);

    return await connectdb(sql, binds, options);    
    
    
  } catch (error) {
    console.error(error);
  }
}


