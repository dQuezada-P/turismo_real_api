import mercadopago from "mercadopago";
import { config } from "dotenv";
import axios from "axios";
import { parse, stringify, toJSON, fromJSON } from "flatted";
config();

export const payMercadoPago = async (req, res) => {
  console.log(req.body);
  const { cliente, arriendo } = req.body;

  // console.log(
  //   typeof parseInt(
  //     arriendo.abono.substr(1, arriendo.abono.lenght).replace(".", "")
  //   )
  // );
  mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN,
  });
  let preference = {
    items: [
      {
        id: arriendo.id,
        title: arriendo.nombre,
        unit_price: parseInt(
          arriendo.abono.substr(1, arriendo.abono.lenght).replace(".", "")
        ),
        quantity: 1,
        picture_url: arriendo.img,
      },
    ],
    payer: {
      name: cliente.nombre,
      email: cliente.correo,
    },
    metadata: {
      cliente: cliente,
      arriendo: arriendo,
    },
    back_urls: {
      success: "http://localhost:5173/notificacion",
      failure: "http://localhost:5173/notificacion",
    },
    auto_return: "approved",
    notification_url: "",
  };
  try {
    const { response } = await mercadopago.preferences.create(preference);
    res.json(response.id);
  } catch (error) {
    res.json({ msg: "Error al intentar pagar" });
    console.error(error);
  }
};

export const webHook = async (req, res) => {
  try {
    const result = await axios(
      `https://api.mercadopago.com/v1/payments/${req.body.id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );
    res.json({
      status : result.data.status,
      abono : result.data.transaction_amount,
      id : result.data.metadata.arriendo.id,
      rut : result.data.metadata.cliente.rut,
      fecha : result.data.metadata.arriendo.fecha,
      dias : result.data.metadata.arriendo.dias,
      cantP : result.data.metadata.arriendo.cant_personas
    });
  } catch (error) {
    console.log(error);
  }
};
