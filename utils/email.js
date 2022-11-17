import nodemailer from "nodemailer";

export const emailReservation = (data) => {
  const { rut, nombre, valor, total, id_dep, correo, fecha , tour , transporte } = data.reservation;
  let [newfecha] = fecha.split("T");
    newfecha = newfecha.split("-");
    newfecha = newfecha[2] + "-" + newfecha[1] + "-" + newfecha[0];
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const msg = {
    from: "turismoreal2022@gmail.com",
    to: `${correo}`,
    subject: `Reservación Departamento ${nombre}`,
    html: `<p>Gracias por tu Reservación, los datos son los siguientes: </p>
    <p>Rut de la persona registrada: ${rut}</p>
    <p>Nombre del departamento: ${nombre}, ID departamento: ${id_dep}</p>
    <p>Fecha inicio de la reservación: ${newfecha}</p>
    <p>Valor del arriendo total: ${valor}</p>
    <p>Abono reservación: ${total}</p>
    `,
  };

  transporter.sendMail(msg, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: ");
    }
  });
};
