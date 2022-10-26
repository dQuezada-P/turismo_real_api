import Transport from "../models/transport.model.js";

export const getTransports = async (req, res) => {
    const transportModel = new Transport()
    const transportList = await transportModel.getTransports();

    res.json(transportList)
}

export const addTransport = async (req, res) => {
    const {id_terminal, id_conductor, fecha, horario, precio } = req.body;
    console.log(req.body)  
    const transportModel = new Transport(
        null,
        id_conductor,
        id_terminal,
        fecha, 
        horario,
        precio,
        null
    );
    console.log(req.body)    
    console.log(transportModel)

    const resultado = await transportModel.addTransport();
    res.json(resultado);
}

export const getTransport = async (req, res) => {
    try {
        const {id} = req.query;
        const transport = await new Transport().getTransport(id)
        if (transport == null)
            res.json({msg: "Transporte no se encuentra registrado"});
        res.json(transport);
    } catch (error) {
        console.error(error);
    }
}

export const editTransport = async (req, res) =>{
    const {id, id_conductor, id_terminal, fecha, horario, precio, estado } = req.body;
    const newTransport = new Transport(
        id,
        id_conductor,
        id_terminal,
        fecha,
        horario,
        precio,
        estado,
    );
    console.log(newTransport);

    const response = await newTransport.editTransport();
    res.json(response);
}