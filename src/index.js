import express from "express";
import morgan from "morgan";
import cors from "cors";
import routerUser from "../routes/routesUser.js";
import routerAuth from "../routes/routesAuth.js";
import routerDepartment from "../routes/routesDepartment.js";
import routerUtil from "../routes/routesUtils.js";
import routerInventary from "../routes/routesInventary.js";
import routerTransport from "../routes/routesTransportService.js";
import routerTour from "../routes/routesTourService.js";
import fileUpload from "express-fileupload";
import { UploadImagen, GetImage } from "../controllers/files.js";
import routerEstadistic from "../routes/routesEstadist.js";
import routerReservation from "../routes/routesReservation.js";
import routerMercadoPago from "../routes/routesMercadoPago.js";



const app = express();

//* setting
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2);

//* middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({
  origin: '*'
}));
app.use(express.urlencoded({ extended: false }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "../images",
  })
);

//* routes
app.use("/api/usuario", routerUser);
app.use("/api/auth", routerAuth);
app.use("/api/departamento/", routerDepartment);
app.use("/api/utils", routerUtil);
app.use("/api/inventario", routerInventary);
app.use("/api/servicio-transporte", routerTransport);
app.use("/api/servicio-tour", routerTour);
app.use("/api/files", UploadImagen, GetImage);
app.use("/api/estadistica", routerEstadistic);
app.use("/api/reserva",routerReservation)
app.use("/api/mercadopago",routerMercadoPago)


//* server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
