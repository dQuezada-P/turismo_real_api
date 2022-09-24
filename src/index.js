const express = require("express");
const morgan = require("morgan");
const cors = require('cors')
const app = express();

//* setting
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2);

//* middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

//* routes
app.use("/api/usuario", require("../routes/routesUser.js"));
app.use("/api/departamento/", require("../routes/routesDepartment.js"));
app.use("/api/utils", require("../routes/routesUtils.js"));
app.use("/api/inventario", require("../routes/routesInventary.js"));
app.use("/api/servicioTransporte", require("../routes/routesTransportService"));
app.use("/api/servicioTour", require("../routes/routesTourService"));


//* server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
