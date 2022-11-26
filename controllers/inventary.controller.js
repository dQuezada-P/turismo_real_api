import Inventary from "../models/inventary.model.js";

export const getInventary = async (req, res) => {
  try {
    const { id_departamento } = req.query;
    console.log(req.query);
    const inventaryList = await new Inventary({}).getInventary(id_departamento);
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

export const addInventary = async (req, res) => {
  const {id_departamento, cantidad, nombre, precio} =  req.body;
  console.log(req.body)
  const inventaryModel = new Inventary(
   { id_departamento, cantidad, nombre, precio}
  );
  console.log(inventaryModel)
  const resultado = await inventaryModel.addInventary();
    res.json(resultado);
};

export const editInventary = async (req, res) =>{
  const {id, cantidad, estado, descripcion, costo_reparacion } = req.body;
  const newInventary = new Inventary(
      {id, cantidad, estado, descripcion, costo_reparacion}
  );
  console.log(newInventary);

  const response = await newInventary.editInventary();
  res.json(response);
}

export const checkoutInventary = async (req, res) =>{
  const {id, estado, descripcion, costo_reparacion } = req.body;
  const newInventary = new Inventary(
      {id, estado, descripcion, costo_reparacion}
  );
  console.log(newInventary);

  const response = await newInventary.checkoutInventary();
  res.json(response);
}

export const deleteInventary = async (req, res) => {
  try {
    const { id } = req.params;
    
    const response = await new Inventary({}).deleteInventaryItem(id);
    console.log(id)
    if (response == 0) {
      res.json({ msg: "Item no existe" });
      return;
    }
    res.json(response);
  } catch (error) {
    console.error(error);
  }
}