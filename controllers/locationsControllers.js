import { getLocationsBD } from "../dao/utilsDao.js";

export const getLocations = async (req, res) => {
  const states = await getLocationsBD()
  states.length === 0 ? res.json({msg : 'No hay localidades'}) : res.json(states)
  
};

