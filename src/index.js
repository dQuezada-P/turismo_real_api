import express from "express";
import morgan from "morgan";
import cors from "cors";
import routerUser from "../routes/user.routes.js";
import routerAuth from "../routes/auth.routes.js";
import routerDepartment from "../routes/department.routes.js";
import routerUtil from "../routes/utils.routes.js";
import routerInventary from "../routes/inventary.routes.js";
import routerTransport from "../routes/transport.routes.js";
import routerTour from "../routes/tour.routes.js";
import fileUpload from "express-fileupload";
import { UploadImagen, GetImage } from "../controllers/files.controller.js";
import routerEstadistic from "../routes/statistic.routes.js";
import routerReservation from "../routes/reservation.routes.js";
import routerMercadoPago from "../routes/mercadoPago.routes.js";
import { verifyToken } from "../middlewares/auth.middleware.js";



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
app.use("/api/departamento", routerDepartment);
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
