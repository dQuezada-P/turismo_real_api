import mercadopago from "mercadopago";
import { config } from "dotenv";
import axios from "axios";
config();

export const payMercadoPago = async (req, res) => {
  const { id, nombre, total, img, correo } = req.body;

  mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN,
  });
  let preference = {
    items: [
      {
        id: id,
        title: nombre,
        quantity: 1,
        unit_price: total,
        picture_url: img,
      },
    ],
    payer: { email: correo },
    back_urls: {
      success: "http://localhost:5173/notificacion",
      failure: "http://localhost:5173/notificacion",
    },
    auto_return: "approved",
    metadata: { reservation: req.body },
    //     id: arriendo.id,
    //     title: arriendo.nombre,
    //     quantity parseInt(
    //       arriendo.abono.substr(1, arriendo.abono.lenght).replace(".", "")
    //     ),
    //     quantity: 1,
    //     picture_url: arriendo.img,
    //   },
    // ],
    // payer: {
    //   name: cliente.nombre,
    //   email: cliente.correo,
    // },
    // metadata: {
    //   cliente: cliente,
    //   arriendo: arriendo,
    // },
    // back_urls: {
    //   success: "http://localhost:5173/notificacion",
    //   failure: "http://localhost:5173/notificacion",
    // },
    // auto_return: "approved",
    // notification_url: "",
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
      status: result.data.status,
      reservation: result.data.metadata,
    });
  } catch (error) {
    console.log(error);
  }
};
