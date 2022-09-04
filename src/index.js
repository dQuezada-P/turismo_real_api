const express = require("express");
const morgan = require("morgan");
//const cors = require('cors')
const app = express();

//* setting
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2);

//* middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//* routes
app.use("/api/usuario", require("../routes/routesUser.js"));
app.use("/api/depto", require("../routes/routesDepartment.js"));

//* server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
