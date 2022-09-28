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
    UBICACION,
    DESCRIPCION,
    ESTADO_DISPONIBLE,
    ESTADO_RESERVA,
    IMAGENES
  ) {
    (this.id = ID),
    (this.nombre  = NOMBRE),
    (this.numero_banno = NUMERO_BANNO),
    (this.numero_habitacion = NUMERO_HABITACION),
    (this.fecha_ins = FECHA_INS),
    (this.direccion = DIRECCION),
    (this.valor_arriendo = VALOR_ARRIENDO),
    (this.id_localidad = ID_LOCALIDAD),
    (this.ubicacion = UBICACION),
    (this.descripcion = DESCRIPCION),
    (this.estado_disponible = ESTADO_DISPONIBLE),
    (this.estado_reserva = ESTADO_RESERVA),
    (this.imagenes = IMAGENES);
  }

  get ID() {
    return this.id;
  }

  set ID(newValue) {
    this.id = newValue;
  }
  get NOMBRE() {
    return this.nombre;
  }

  set NOMBRE(newValue) {
    this.nombre = newValue;
  }

  get NUMERO_BANNO() {
    return this.numero_banno;
  }

  set NUMERO_BANNO(newValue) {
    this.numero_banno = newValue;
  }

  get NUMERO_HABITACION() {
    return this.numero_habitacion;
  }

  set NUMERO_HABITACION(newValue) {
    this.numero_habitacion = newValue;
  }

  get FECHA_INS() {
    return this.fecha_ins;
  }

  set FECHA_INS(newValue) {
    this.fecha_ins = newValue;
  }

  get DIRECCION() {
    return this.direccion;
  }

  set DIRECCION(newValue) {
    this.direccion = newValue;
  }

  get VALOR_ARRIENDO() {
    return this.valor_arriendo;
  }

  set VALOR_ARRIENDO(newValue) {
    this.valor_arriendo = newValue;
  }

  get ID_LOCALIDAD() {
    return this.id_localidad;
  }
  set ID_LOCALIDAD(newValue) {
    this.id_localidad = newValue;
  }

  get UBICACION() {
    return this.ubicacion;
  }
  set UBICACION(newValue) {
    this.ubicacion = newValue;
  }

  get DESCRIPCION() {
    return this.descripcion;
  }
  set DESCRIPCION(newValue) {
    this.descripcion = newValue;
  }

  get IMAGENES() {
    return this.imagenes;
  }
  set IMAGENES(newValue) {
    this.imagenes = newValue;
  }

  get ESTADO_DISPONIBLE() {
    return this.estado_disponible;
  }
  set ESTADO_DISPONIBLE(newValue) {
    this.estado_disponible = newValue;
  }
  get ESTADO_RESERVA() {
    return this.estado_reserva;
  }
  set ESTADO_RESERVA(newValue) {
    this.estado_reserva = newValue;
  }
}
export default Department;
