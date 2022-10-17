import Transport from "../models/transport.model.js";

export const getTransports = async (req, res) => {
    const transportModel = new Transport()
    const transportList = await transportModel.getTransports();

    res.json(transportList)
}