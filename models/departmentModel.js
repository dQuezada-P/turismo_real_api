class Department {
  constructor(
    NOMBRE,
    NUMERO_BANNO,
    NUMERO_HABITACION,
    ESTADO,
    DIRECCION,
    VALOR_ARRIENDO,
    ID_LOCALIDAD,
    DESCRIPCION,
    URLS_IAMGEN
  ) {
    (this._nombre = NOMBRE),
      (this._numero_banno = NUMERO_BANNO),
      (this._numero_habitacion = NUMERO_HABITACION),
      (this._estado = ESTADO),
      (this._direccion = DIRECCION),
      (this._valor_arriendo = VALOR_ARRIENDO),
      (this._id_localidad = ID_LOCALIDAD),
      (this._descripcion = DESCRIPCION),
      (this._urls_imagen = URLS_IAMGEN);
    this.add_date = ADD_DATE;
  }

  get NOMBRE() {
    return _nombre;
  }

  set NOMBRE(newValue) {
    _nombre = newValue;
  }

  get NUMERO_BANNO() {
    return _numero_banno;
  }

  set NUMERO_BANNO(newValue) {
    _numero_banno = newValue;
  }

  get NUMERO_HABITACION() {
    return _numero_habitacion;
  }

  set NUMERO_HABITACION(newValue) {
    _numero_habitacion = newValue;
  }

  get ESTADO() {
    return _estado;
  }

  set ESTADO(newValue) {
    _estado = newValue;
  }

  get DIRECCION() {
    return _direccion;
  }

  set DIRECCION(newValue) {
    _direccion = newValue;
  }

  get VALOR_ARRIENDO() {
    return _valor_arriendo;
  }

  set VALOR_ARRIENDO(newValue) {
    _valor_arriendo = newValue;
  }

  get ID_LOCALIDAD() {
    return _id_localidad;
  }
  set ID_LOCALIDAD(newValue) {
    _id_localidad = newValue;
  }

  get DESCRIPCION() {
    return _descripcion;
  }
  set DESCRIPCION(newValue) {
    _descripcion = newValue;
  }

  get URLS_IAMGEN() {
    return _urls_imagen;
  }
  set URLS_IAMGEN(newValue) {
    _urls_imagen = newValue;
  }
}
export default Department;
