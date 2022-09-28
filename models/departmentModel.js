import {  } from "oracledb";

class Department {
  constructor(
    ID,
    NOMBRE,
    NUMERO_BANNO,
    NUMERO_HABITACION,
    FECHA_INS,
    DIRECCION,
    VALOR_ARRIENDO,
    ID_LOCALIDAD,
    DESCRIPCION,
    ESTADO_DISPONIBLE,
    ESTADO_RESERVA,
    IMAGENES
  ) {
    (this._id = ID),
      (this._nombre  = NOMBRE),
      (this._numero_banno = NUMERO_BANNO),
      (this._numero_habitacion = NUMERO_HABITACION),
      (this._fecha_ins = FECHA_INS),
      (this._direccion = DIRECCION),
      (this._valor_arriendo = VALOR_ARRIENDO),
      (this._id_localidad = ID_LOCALIDAD),
      (this._descripcion = DESCRIPCION),
      (this._estado_disponible = ESTADO_DISPONIBLE),
      (this.estado_reserva = ESTADO_RESERVA),
      (this.imagen = IMAGENES);
  }

  get ID() {
    return this._id;
  }

  set ID(newValue) {
    this._id = newValue;
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

  get FECHA_INS() {
    return _fecha_ins;
  }

  set FECHA_INS(newValue) {
    _fecha_ins = newValue;
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

  get URLS_IMAGEN() {
    return _urls_imagen;
  }
  set URLS_IMAGEN(newValue) {
    _urls_imagen = newValue;
  }

  get ESTADO_DISPONIBLE() {
    return _estado_disponible;
  }
  set ESTADO_DISPONIBLE(newValue) {
    _estado_disponible = newValue;
  }
  get ESTADO_RESERVA() {
    return estado_reserva;
  }
  set ESTADO_RESERVA(newValue) {
    estado_reserva = newValue;
  }
}
export default Department;
