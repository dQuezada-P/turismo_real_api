import mercadopago from "mercadopago";
import { config } from "dotenv";
import axios from "axios";
import {parse, stringify, toJSON, fromJSON} from 'flatted';
config();

export const payMercadoPago = async (req, res) => {
  console.log(req.body)
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
        title: arriendo.nombre,
        unit_price: parseInt(
          arriendo.abono.substr(1, arriendo.abono.lenght).replace(".", "")
        ),
        quantity: 1,
      },
    ],
    back_urls: {
      success: "http://localhost:5173/notificacion",
      failure: "http://localhost:5173/notificacion",
    },
    auto_return: "approved",
    notification_url: "",
  };
  try {
    const { response } = await mercadopago.preferences.create(preference);
    console.log(response)
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

    // console.log(result)
    res.json({
      status : toJSON(result)[61],
      order : toJSON(result)[96],
      payMethod : toJSON(result)[56],
      mount : toJSON(result)[5].transaction_amount,
    });
  } catch (error) {
    console.log(error);
  }
};
