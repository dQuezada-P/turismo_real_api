import { connectdb } from "../config/config.js";
import oracledb from "oracledb";

export const getTours = async () => {
    try {
        const sql = `BEGIN ACCIONES_TOUR.VER_TOUR(:cursor);END;`;
    
        const binds = {
            cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
        };
    
        const options = {
            outFormat: oracledb.OUT_FORMAT_OBJECT,
        }
    
        const { cursor } = await connectdb(sql, binds, options);
    
        return await cursor.getRows();
    } catch ( error ){

    }
}
