import Transport from "../models/transport.model.js";

export const getTransports = async (req, res) => {
    const transportModel = new Transport()
    const transportList = await transportModel.getTransports();

    res.json(transportList)
}

export const addTransport = async (req, res) => {
    const {ciudad, vehiculo, horario, conductor, precio, patente } = req.body;
    console.log(req.body)  
    const transportModel = new Transport(
        null,
        ciudad, 
        vehiculo,
        horario,
        conductor,
        precio,
        patente
    );
    console.log(req.body)    
    console.log(transportModel)

    // const resultado = await transportModel.addTransport();
    // res.json(resultado);
}