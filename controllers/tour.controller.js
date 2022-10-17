//Importamos Modelo
import Tour from "../models/tour.model.js"

export const getTours = async (req, res) => {
    const tourModel = new Tour()
    const tourList = await tourModel.getTours();

    res.json(tourList)
}


async (req, res) => {


    const sql = `BEGIN ACCIONES_TOUR.VER_TOUR(:cursor);END;`;
    
    const binds = {
      cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT },
    };
  
    const options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    }
  
    const { cursor } = await connectdb(sql, binds, options);
  
    const tours = await cursor.getRows();
    console.log(tours)
  
    res.json(tours)
  }