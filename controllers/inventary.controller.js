import Inventary from "../models/inventary.model.js";

export const getInventary = async (req, res) => {
  try {
    const { id_departamento } = req.query;
    console.log(req.query)
    const inventaryList = await new Inventary().getInventary(id_departamento);
    const keys = Object.keys(inventaryList[0]);
    console.log(keys);
    inventaryList.forEach(inventary => {
      const producto = {}
      keys.forEach(key => {
        const name = key.split('__');
        if (name[0] == 'PRODUCTO'){
          producto[name[1]] = inventary[key];
          delete inventary[key];
        }
      });
      inventary.PRODUCTO = producto;
    });
    
    res.json(inventaryList);
  } catch (error) {
    
  }
}