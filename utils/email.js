import nodemailer from "nodemailer";

export const emailReservation = (data) => {
  console.log(data.reservation);
  const {
    rut,
    nombre,
    valor,
    abono,
    id_dep,
    correo,
    fecha,
    tours,
    transports,
    cant_personas,
    dias,
    img,
  } = data.reservation;
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

  const emailTransport =
    Object.entries(transports).length === 0
      ? ""
      : `<h3>Transporte:</h3>
      <ul>
      <li>
      <h3><em>C&oacute;digo: <strong>${transports.id}</strong><br /></em></h3>
      </li>
      <li>
      <h3><em>Fecha: ${transports.fecha}<br /></em></h3>
      </li>
      <li>
      <h3><em>Horario: ${transports.horario}<br /></em></h3>
      </li>
      <li>
      <h3><em>Valor: ${Intl.NumberFormat("es-CL", {
        currency: "CLP",
        style: "currency",
      }).format(transports.precio)}<br /></em></h3>
      </li>
      <li>
      <h3><em>Terminal: ${transports.terminal}<br /></em></h3>
      </li>
      </ul>`;

  const length = tours.length >= 1 ? true : false;

  const services =
    tours.length >= 1 || Object.entries(transports).length !== 0 ? true : false;

  const msg = {
    from: "turismoreal2022@gmail.com",
    to: `${correo}`,
    subject: `Reservación Departamento ${nombre}`,
    html: `<table style="height: 15px; width: 70.1894%; border-collapse: collapse; margin-left: auto; margin-right: auto;" height="142" border="2">
    <tbody>
    <tr style="height: 15px;">
    <td style="width: 100%; height: 15px;">
    <h1 style="text-align: center;"><span style="text-decoration: underline;">Felicidades!</span></h1>
    <h3><span style="text-decoration: underline;"><img src=${img} alt="" style="display: block; margin-left: auto; margin-right: auto;" width="300" height="300" /></span></h3>
    <h2 style="text-align: center;">Datos Reservación</h2>
    <table style="width: 67.5999%; border-collapse: collapse; border-style: groove; margin-left: auto; margin-right: auto;" border="2">
    <tbody>
    <tr>
    <td style="width: 100%;">
    <ul>
    <li>
    <h3><em>Nombre Departamento:</em><strong> ${nombre} , </strong>ID: <strong>${id_dep}</strong></h3>
    </li>
    <li>
    <h3><em>RUT Cliente: <strong>${rut}</strong></em></h3>
    </li>
    <li>
    <h3><em>Fecha de Inicio: <strong>${newfecha}</strong></em></h3>
    </li>
    <li>
    <h3><em>Dias de estadio: <strong>${dias}</strong></em></h3>
    </li>
    <li>
    <h3><em>Acompa&ntilde;antes: <strong>${cant_personas}</strong></em></h3>
    </li>
    <li>
    <h3><em>Abono: <strong>${Intl.NumberFormat("es-CL", {
      currency: "CLP",
      style: "currency",
    }).format(abono)}</strong></em></h3>
    </li>
    <li>
    <h3><em>Valor : <strong>${Intl.NumberFormat("es-CL", {
      currency: "CLP",
      style: "currency",
    }).format(valor)}</strong></em></h3>
    </li>
    </ul>
    </td>
    </tr>
    </tbody>
    </table>
    ${
      services
        ? `<h2 style="text-align: center;">Datos Servicios Adicionales</h2>
    <table style="width: 67.5999%; border-collapse: collapse; border-style: groove; margin-left: auto; margin-right: auto;" border="2">
    <tbody>
    <tr style="height: 498px;">
    <td style="width: 100%; height: 498px;">
    ${emailTransport}
    ${
      length
        ? tours.map((tr) => {
            return `<h3>Tour:</h3>
      <ul>
      <li>
      <h3>C&oacute;digo: <em>${tr.id}</em></h3>
      </li>
      <li>
      <h3>Fecha Inicio: <em>${tr.fecha}</em></h3>
      </li>
      <li>
      <h3>Horario: <em>${tr.hora_inicio}</em></h3>
      </li>
      <li>
      <h3>Duración: <em>${tr.duracion}</em></h3>
      </li>
      <li>
      <h3>Valor: <em>${Intl.NumberFormat("es-CL", {
        currency: "CLP",
        style: "currency",
      }).format(tr.precio)}</em></h3>
      </li>
      </ul>`;
          })
        : " "
    }
    <p></p>`
        : ""
    }
    
    </td>
    </tr>
    </tbody>
    </table>
    </td>
    </tr>
    </tbody>
    </table>`,
    // html: `<br/>
    //       <p>Gracias por tu Reservación, los datos son los siguientes: </p>
    //         <img src=${img} width="200 height="300" alter='img'/>
    //       <p>Rut de la persona registrada: ${rut}</p>
    //       <p>Nombre del departamento: ${nombre}, ID departamento: ${id_dep}</p>
    //       <p style="color:black" >Fecha inicio de la reservación: ${newfecha}</p>
    //       <p>Días: ${dias}</p>
    //       <p>Acompañantes: ${cant_personas}</p>
    //       <p style="color:black" >Valor del arriendo total: ${Intl.NumberFormat("es-CL", {
    //         currency: "CLP",
    //         style: "currency",
    //       }).format(valor)}</p>
    //       <p style="color:black" >Abono reservación: ${Intl.NumberFormat("es-CL", {
    //         currency: "CLP",
    //         style: "currency",
    //       }).format(abono)}</p>

    // `,
  };

  transporter.sendMail(msg, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: ");
    }
  });
};
