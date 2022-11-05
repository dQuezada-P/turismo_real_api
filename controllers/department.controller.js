import Department from "../models/department.model.js";

export const getDepartments = async (req, res) => {
  try {
    const departmentList = await new Department().getDepartments();
    const departmentsList = departmentList.map((dept) => {
      if (dept.IMAGENES != null)
        dept.IMAGENES = dept.IMAGENES.split(",").map((img) => {
          const destructured = img.split("/");
          const imgName = destructured[destructured.length - 1];
          return {
            name: imgName,
            url: img,
          };
        });
      return dept;
    });
    res.json(departmentsList);
  } catch (error) {
    console.error(error);
  }
};

export const getDepartment = async (req, res) => {
  function formatDate(date) {
    try {
      let [newDate] = JSON.stringify(date).split("T");
      newDate = newDate.split("-");
      newDate = newDate[2] + "/" + newDate[1] + "/" + newDate[0].slice(1);
      return newDate;
    } catch (error) {
      return date;
    }
    
  }
  try {
    const [department] = await new Department().getDepartment(req.query.id);
    if (department == null)
      {res.json({ msg: "Departamento no se encuentra registrado" });return;}
    else {
      if (department.IMAGENES != null)
        department.IMAGENES = department.IMAGENES.split(",").map((img) => {
          const destructured = img.split("/");
          const imgName = destructured[destructured.length - 1];
          return {
            name: imgName,
            url: img,
          };
        });

      department.ADDED_DATE = formatDate(department.ADDED_DATE);
      department.MODIFIED_DATE = formatDate(department.MODIFIED_DATE);

      res.json(department);
    }
  } catch (error) {
    console.error(error);
  }
};

export const addDepartment = async (req, res) => {
  const responseAction = (r) => res.json(r);
  const {
    nombre,
    numero_banno,
    numero_habitacion,
    direccion,
    estado,
    valor_arriendo,
    localidad,
    descripcion,
    estado_disponible,
    estado_reserva,
  } = JSON.parse(req.body.content);
  const department = new Department(
    null,
    nombre,
    parseInt(numero_banno, 10),
    parseInt(numero_habitacion, 10),
    direccion,
    parseInt(valor_arriendo.replace("$", "").replace(".", ""), 10),
    estado,
    localidad,
    null,
    descripcion,
    estado_disponible,
    estado_reserva,
    req.files
  );
  await department.addDepartment(responseAction);
};
export const editDepartment = async (req, res) => {
  const {
    id,
    nombre,
    numero_banno,
    numero_habitacion,
    direccion,
    valor_arriendo,
    estado,
    localidad,
    descripcion,
    // estado_disponible,
    // estado_reserva,
    files,
  } = req.body;

  const newDepartment = new Department(
    id,
    nombre,
    numero_banno,
    numero_habitacion,
    direccion,
    valor_arriendo.replace("$", "").replace(".", ""),
    estado,
    localidad,
    null,
    descripcion,
    "y",
    "y",
    // estado_disponible,
    // estado_reserva,
    files
  );
  const response = await newDepartment.editDepartment();
  res.json(response);
};
export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await new Department().deleteDepartment(id);
    console.log(department);

    if (department == 0) res.json({ msg: "Tour no existe" });
    res.json(department);
  } catch (error) {
    console.error(error);
  }
};
