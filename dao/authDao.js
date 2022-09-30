import oracledb from "oracledb";

import { connectdb } from "../config/config.js";

export const authUser = async (username) => {
    try {
        const binds = {
            username: username,
            cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
            msg: { type: oracledb.STRING, dir: oracledb.BIND_OUT }
        };
      
        const sql = `BEGIN ACCIONES_USUARIO.AUTH_USUARIO(  
                        :username,
                        :cursor,
                        :msg); 
                        END;`;

        const options = { 
            isAutoCommit: true, 
            outFormat: oracledb.OUT_FORMAT_OBJECT 
        }
  
        const { cursor, msg } = await connectdb(sql, binds, options);

        const resp = {
            userRes: cursor,
            msg
        } 
        console.log(cursor)

        if ( cursor !== undefined ){
            const [user] = await cursor.getRows();
            console.log( user )  
            resp.userRes = user
        }
                                   
        return resp
    } catch (error) {
        console.log(error)
        return error
    }
      
  }