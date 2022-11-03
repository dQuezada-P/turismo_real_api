import * as utilsDao from "../dao/utilsDao.js";

export const getLocations = async (req, res) => {
  const locations = await utilsDao.getLocationsBD()
  locations?.length === 0 ? res.json({msg : 'No hay localidades'}) : res.json(locations)
  
};

export const getDrivers = async (req, res) => {
  const { id_localidad } = req.query;
  const drivers = await utilsDao.getDrivers(id_localidad)
  drivers?.length === 0 ? res.json({msg : 'No hay conductores'}) : res.json(drivers);
  
};

export const getTerminals = async (req, res) => {
  const { id_localidad } = req.query;
  const terminals = await utilsDao.getTerminals(id_localidad)
  terminals?.length === 0 ? res.json({msg : 'No hay terminales'}) : res.json(terminals);
  
};

export const getRoles = async (req, res) => {
  const roles = await utilsDao.getRoles()
  roles?.length === 0 ? res.json({msg : 'No hay roles'}) : res.json(roles)
  
};

