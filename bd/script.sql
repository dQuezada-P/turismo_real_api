----**** DROPS TABLES ****---
DROP TABLE SERVICIO;

DROP TABLE RESERVA;

DROP TABLE PAGO;

DROP TABLE CHECKOUT;

DROP TABLE CHECKIN;

DROP TABLE TRANSPORTE;

DROP TABLE TOUR;

DROP TABLE INVENTARIO;

DROP TABLE DEPARTAMENTO;

DROP TABLE CONDUCTOR;

DROP TABLE USUARIO;

DROP TABLE ROL;

DROP TABLE PRODUCTO;

DROP TABLE TERMINAL;

DROP TABLE LOCALIDAD;

----**** DROPS SEQUENCES ***------

DROP SEQUENCE ROL_AUTO;

DROP SEQUENCE PRODUCTO_AUTO;

DROP SEQUENCE LOCALIDAD_AUTO;

DROP SEQUENCE TERMINAL_AUTO;

DROP SEQUENCE TRANSPORTE_AUTO;

DROP SEQUENCE TOUR_AUTO;

DROP SEQUENCE SERVICIO_AUTO;

DROP SEQUENCE INVENTARIO_AUTO;

DROP SEQUENCE RESERVA_AUTO;

DROP SEQUENCE DEPARTAMENTO_AUTO;

DROP SEQUENCE CHECKIN_AUTO;

DROP SEQUENCE CHECKOUT_AUTO;

DROP SEQUENCE PAGO_AUTO;

DROP SEQUENCE CONDUCTOR_AUTO;

DROP SEQUENCE USUARIO_AUTO;
---**** PRODUCT ****----
CREATE SEQUENCE PRODUCTO_AUTO START WITH 1 INCREMENT BY 1;

CREATE TABLE PRODUCTO(
    ID NUMBER NOT NULL PRIMARY KEY,
    NOMBRE VARCHAR2(60) NOT NULL,
    PRECIO NUMBER NOT NULL,
    CANTIDAD_INICIAL NUMBER NOT NULL
);

--**** TABLE ROL ****---
CREATE SEQUENCE ROL_AUTO START WITH 1 INCREMENT BY 1;

CREATE TABLE ROL(
    ID NUMBER NOT NULL PRIMARY KEY,
    CARGO VARCHAR2(60) NOT NULL
);

--**** TABLE LOCATION ****-----

CREATE SEQUENCE LOCALIDAD_AUTO START WITH 1 INCREMENT BY 1;

CREATE TABLE LOCALIDAD(
    ID NUMBER PRIMARY KEY NOT NULL,
    NOMBRE VARCHAR2(60)
);

--**** TABLE USER ****---
CREATE SEQUENCE USUARIO_AUTO START WITH 1 INCREMENT BY 1;

CREATE TABLE USUARIO(
    ID NUMBER PRIMARY KEY,
    RUT VARCHAR2(10) NOT NULL UNIQUE,
    NOMBRE VARCHAR2(60) NOT NULL,
    APELLIDO VARCHAR2(60) NOT NULL,
    IMAGEN CLOB,
    CORREO VARCHAR2(60) UNIQUE NOT NULL,
    ESTADO NUMBER DEFAULT 1,
    DIRECCION VARCHAR2(60) NOT NULL,
    TELEFONO VARCHAR2(60) NOT NULL,
    PASS VARCHAR2(60)NOT NULL,
    ID_ROL NUMBER NOT NULL,
    
    CONSTRAINT FK_ROL_ID FOREIGN KEY(ID_ROL) REFERENCES ROL (ID)
);

--**** TABLE DRIVER ****---
CREATE SEQUENCE CONDUCTOR_AUTO START WITH 1 INCREMENT BY 1;

CREATE TABLE CONDUCTOR (
    ID NUMBER PRIMARY KEY NOT NULL,
    ID_USUARIO NUMBER NOT NULL,
    VEHICULO VARCHAR2(60) NOT NULL,
    PATENTE VARCHAR(8) NOT NULL,
    ID_LOCALIDAD NUMBER NOT NULL,
    CONSTRAINT FK_ID_USUARIO_CONDUCTOR FOREIGN KEY(ID_USUARIO) REFERENCES USUARIO (ID),
    CONSTRAINT FK_ID_LOCALIDAD_CONDUCTOR FOREIGN KEY(ID_LOCALIDAD) REFERENCES LOCALIDAD (ID)
    
);


--**** TABLE DEPARTAMENT ****--

CREATE SEQUENCE DEPARTAMENTO_AUTO START WITH 1 INCREMENT BY 1;

CREATE TABLE DEPARTAMENTO(
    ID NUMBER NOT NULL PRIMARY KEY,
    NOMBRE VARCHAR2(60) NOT NULL,
    NUMERO_BANNO NUMBER NOT NULL,
    NUMERO_HABITACION NUMBER NOT NULL,
    DIRECCION VARCHAR2(60) NOT NULL,
    VALOR_ARRIENDO NUMBER NOT NULL,
    ESTADO NUMBER DEFAULT 1,
    ID_LOCALIDAD NUMBER NOT NULL,
    DESCRIPCION VARCHAR2(60),
    ESTADO_DISPONIBLE CHAR NOT NULL,
    ESTADO_RESERVA CHAR NOT NULL,
    IMAGENES CLOB,    
    ADDED_DATE DATE DEFAULT SYSDATE,
    MODIFIED_DATE DATE DEFAULT SYSDATE,    
    CONSTRAINT FK_ID_LOCALIDAD FOREIGN KEY(ID_LOCALIDAD) REFERENCES LOCALIDAD (ID)
);

CREATE OR REPLACE
TRIGGER DEPARTAMENTO_UPDATE 
BEFORE UPDATE ON DEPARTAMENTO FOR EACH row 
BEGIN 
    :new.MODIFIED_DATE := SYSDATE;
END;
/
---**** TABLE INVENTARY ****---
CREATE SEQUENCE INVENTARIO_AUTO START WITH 1 INCREMENT BY 1;

CREATE TABLE INVENTARIO(
    ID NUMBER NOT NULL PRIMARY KEY,
    ID_DEPARTAMENTO NUMBER NOT NULL,
    ID_PRODUCTO NUMBER NOT NULL,
    CANTIDAD NUMBER NOT NULL,
    ESTADO NUMBER DEFAULT 0,
    DESCRIPCION VARCHAR2(200) DEFAULT 'Nuevo',
    ADDED_DATE TIMESTAMP DEFAULT SYSDATE,
    MODIFIED_DATE TIMESTAMP DEFAULT SYSDATE,
    CONSTRAINT FK_ID_PRODUCTO FOREIGN KEY(ID_PRODUCTO) REFERENCES PRODUCTO (ID),
    CONSTRAINT FK_ID_DEPARTAMENTO FOREIGN KEY(ID_DEPARTAMENTO) REFERENCES DEPARTAMENTO (ID)
);
CREATE OR REPLACE
TRIGGER INVENTARIO_UPDATE 
BEFORE UPDATE ON INVENTARIO FOR EACH row 
BEGIN 
    :new.MODIFIED_DATE := SYSDATE;
END;
/

--**** TABLE TERMINALES ****--

CREATE SEQUENCE TERMINAL_AUTO START WITH 1 INCREMENT BY 1;

CREATE TABLE TERMINAL(
    ID NUMBER PRIMARY KEY,
    ID_LOCALIDAD NUMBER NOT NULL,
    NOMBRE VARCHAR2(100) NOT NULL,
    CONSTRAINT FK_ID_LOCALIDAD_TERMINAL FOREIGN KEY (ID_LOCALIDAD) REFERENCES LOCALIDAD (ID)
);

--**** TABLE TRANSPORT ****--

CREATE SEQUENCE TRANSPORTE_AUTO START WITH 1 INCREMENT BY 1;

CREATE TABLE TRANSPORTE(
    ID VARCHAR2(5) NOT NULL PRIMARY KEY,
    ID_CONDUCTOR NUMBER NOT NULL,
    ID_TERMINAL NUMBER NOT NULL,
    FECHA VARCHAR2(10) NOT NULL,
    HORARIO VARCHAR2(12) NOT NULL,
    PRECIO NUMBER NOT NULL,
    ESTADO NUMBER DEFAULT 1,
    CONSTRAINT FK_ID_CONDUCTOR FOREIGN KEY(ID_CONDUCTOR) REFERENCES CONDUCTOR (ID),
    CONSTRAINT FK_ID_TERMINAL FOREIGN KEY (ID_TERMINAL) REFERENCES TERMINAL (ID)
    
);

--**** TABLE TOUR ****--
CREATE SEQUENCE TOUR_AUTO START WITH 1 INCREMENT BY 1;

CREATE TABLE TOUR(
    ID VARCHAR2(5) NOT NULL PRIMARY KEY,
    CUPO NUMBER NOT NULL,
    PRECIO NUMBER NOT NULL,
    FECHA VARCHAR2 (60) NOT NULL,
    HORA_INICIO VARCHAR2 (60) NOT NULL,
    DURACION VARCHAR2 (60) NOT NULL,    
    DESCRIPCION VARCHAR2(60),
    ESTADO NUMBER DEFAULT 1,
    ID_LOCALIDAD NUMBER NOT NULL,
    CONSTRAINT FK_ID_LOCALIDAD_TOUR FOREIGN KEY(ID_LOCALIDAD) REFERENCES LOCALIDAD(ID)
);

--**** TABLE CKECKIN ****--
CREATE SEQUENCE CHECKIN_AUTO START WITH 1 INCREMENT BY 1;

CREATE TABLE CHECKIN(
    ID NUMBER NOT NULL PRIMARY KEY,
    DESCRIPCION VARCHAR2(60),
    PAGO_COMPLETADO NUMBER DEFAULT 0,    
    ADDED_DATE TIMESTAMP DEFAULT SYSDATE,
    MODIFIED_DATE TIMESTAMP DEFAULT SYSDATE
);

CREATE OR REPLACE
TRIGGER CHECKIN_UPDATE 
BEFORE UPDATE ON DEPARTAMENTO FOR EACH row 
BEGIN 
    :new.MODIFIED_DATE := SYSDATE;
END;
/
--**** TABLE CHECKOUT ****--
CREATE SEQUENCE CHECKOUT_AUTO START WITH 1 INCREMENT BY 1;

CREATE TABLE CHECKOUT(
    ID NUMBER NOT NULL PRIMARY KEY,
    DESCRIPCION VARCHAR2(60),
    INCONVENIENTES NUMBER,
    ESTADO NUMBER,
    ADDED_DATE TIMESTAMP DEFAULT SYSDATE,
    MODIFIED_DATE  TIMESTAMP DEFAULT SYSDATE
);

CREATE OR REPLACE
TRIGGER CHECKOUT_UPDATE
BEFORE UPDATE ON DEPARTAMENTO FOR EACH row 
BEGIN 
    :new.MODIFIED_DATE := SYSDATE;
END;
/
--**** TABLE PAY ****--
CREATE SEQUENCE PAGO_AUTO START WITH 1 INCREMENT BY 1;

CREATE TABLE PAGO(
    ID NUMBER NOT NULL PRIMARY KEY,
    ABONO NUMBER,
    PAGO_TOTAL NUMBER,
    PAGO_INCONVENIENTE NUMBER,
    ADDED_DATE TIMESTAMP DEFAULT SYSDATE,
    MODIFIED_DATE TIMESTAMP DEFAULT SYSDATE
);

CREATE OR REPLACE
TRIGGER PAGO_UPDATE 
BEFORE UPDATE ON DEPARTAMENTO FOR EACH row 
BEGIN 
    :new.MODIFIED_DATE := SYSDATE;
END;
/
----**** TABLE CHECKOUT ****--
CREATE SEQUENCE RESERVA_AUTO START WITH 1 INCREMENT BY 1;

CREATE TABLE RESERVA(
    ID NUMBER NOT NULL PRIMARY KEY,
    FECHA_INICIO VARCHAR2(10) NOT NULL,
    DIAS NUMBER NOT NULL,
    CANTIDAD_PERSONA NUMBER,
    ID_CLIENTE NUMBER NOT NULL,
    ID_DEPARTAMENTO NUMBER NOT NULL,
    ID_CHECKIN NUMBER,
    ID_CHECKOUT NUMBER,
    ID_PAGO NUMBER,
    ESTADO NUMBER,
    ADDED_DATE TIMESTAMP DEFAULT SYSDATE,
    MODIFIED_DATE TIMESTAMP DEFAULT SYSDATE,
    CONSTRAINT FK_ID_CLIENTE FOREIGN KEY(ID_CLIENTE) REFERENCES USUARIO(ID),
    CONSTRAINT FK_ID_DEPARTAMENTO_RESERVA FOREIGN KEY(ID_DEPARTAMENTO) REFERENCES DEPARTAMENTO(ID),
    CONSTRAINT FK_ID_CHECKIN_RESERVA FOREIGN KEY(ID_CHECKIN) REFERENCES CHECKIN(ID),
    CONSTRAINT FK_ID_CHECKOUT_RESERVA FOREIGN KEY(ID_CHECKOUT) REFERENCES CHECKOUT(ID),
    CONSTRAINT FK_ID_ID_PAGO FOREIGN KEY(ID_PAGO) REFERENCES PAGO(ID)
);
CREATE OR REPLACE
TRIGGER RESERVA_UPDATE 
BEFORE UPDATE ON RESERVA FOR EACH row 
BEGIN 
    :new.MODIFIED_DATE := SYSDATE;
END;
/

--**** TABLE SERVICE ****--
CREATE SEQUENCE SERVICIO_AUTO START WITH 1 INCREMENT BY 1;

CREATE TABLE SERVICIO(
    ID NUMBER NOT NULL PRIMARY KEY,
    FECHA_CONTRATO DATE NOT NULL,
    DESCRIPCION VARCHAR2(60),
    ID_RESERVA NUMBER NOT NULL,
    ID_TRANSPORTE VARCHAR2(5) NULL,
    ID_TOUR VARCHAR2(5) NULL,
    CONSTRAINT FK_ID_RESERVA FOREIGN KEY(ID_RESERVA) REFERENCES RESERVA(ID),
    CONSTRAINT FK_ID_TRANSPORTE_SERVICIO FOREIGN KEY(ID_TRANSPORTE) REFERENCES TRANSPORTE(ID),
    CONSTRAINT FK_ID_TOUR_SERVICIO FOREIGN KEY(ID_TOUR) REFERENCES TOUR(ID)
);

--------------------------------------------------------------------------------------
INSERT INTO ROL VALUES(ROL_AUTO.NEXTVAL,'Administrador');

INSERT INTO ROL VALUES(ROL_AUTO.NEXTVAL,'Funcionario');

INSERT INTO ROL VALUES(ROL_AUTO.NEXTVAL,'Cliente');

INSERT INTO ROL VALUES(ROL_AUTO.NEXTVAL,'Conductor');
--------------------------------------------------------------------------------------
INSERT INTO PRODUCTO VALUES(PRODUCTO_AUTO.NEXTVAL,'Silla','2000',1);

INSERT INTO PRODUCTO VALUES(PRODUCTO_AUTO.NEXTVAL,'Mesa comedor','6000',1);

INSERT INTO PRODUCTO VALUES(PRODUCTO_AUTO.NEXTVAL,'Cama 2 Plazas','10000',2);

INSERT INTO PRODUCTO VALUES(PRODUCTO_AUTO.NEXTVAL,'Lampara','1000',1);

-----------------
INSERT INTO LOCALIDAD VALUES(LOCALIDAD_AUTO.NEXTVAL,'La Serena');

INSERT INTO LOCALIDAD VALUES(LOCALIDAD_AUTO.NEXTVAL,'Puerto Varas');

INSERT INTO LOCALIDAD VALUES(LOCALIDAD_AUTO.NEXTVAL,'Pucón');

INSERT INTO LOCALIDAD VALUES(LOCALIDAD_AUTO.NEXTVAL,'Viña del Mar');

--------------------------------------------------------------------------------------

INSERT INTO USUARIO (ID,RUT, NOMBRE, APELLIDO, IMAGEN, CORREO, DIRECCION, TELEFONO, PASS, ID_ROL) 
VALUES(USUARIO_AUTO.NEXTVAL,'18937755-K','Claudio','Abele','https://pbs.twimg.com/profile_images/825896631132422144/XG4CZU8N_400x400.jpg','admin','TU CASA','9-12345678','$2b$10$1WKLtNaU8/hRbINDgMPBJuiyXp3Nhos1W/lVEl3xkJM9TL3N5aUWq','1');

INSERT INTO USUARIO (ID,RUT, NOMBRE, APELLIDO, IMAGEN, CORREO, DIRECCION, TELEFONO, PASS, ID_ROL)
VALUES(USUARIO_AUTO.NEXTVAL,'20141805-4','Nicolas','Castillo','https://pbs.twimg.com/profile_images/825896631132422144/XG4CZU8N_400x400.jpg','func','LA CASA DEL','9-12345678','$2b$10$1WKLtNaU8/hRbINDgMPBJuiyXp3Nhos1W/lVEl3xkJM9TL3N5aUWq','2');

INSERT INTO USUARIO (ID,RUT, NOMBRE, APELLIDO, IMAGEN, CORREO, DIRECCION, TELEFONO, PASS, ID_ROL)
VALUES(USUARIO_AUTO.NEXTVAL,'21234325-2','Diego','Pavez','https://pbs.twimg.com/profile_images/825896631132422144/XG4CZU8N_400x400.jpg','test@duocuc.cl','LA CASA DEL','9-12345678','$2b$10$1WKLtNaU8/hRbINDgMPBJuiyXp3Nhos1W/lVEl3xkJM9TL3N5aUWq','3');

INSERT INTO USUARIO (ID,RUT, NOMBRE, APELLIDO, IMAGEN, CORREO, DIRECCION, TELEFONO, PASS, ID_ROL)
VALUES(USUARIO_AUTO.NEXTVAL,'1234654-2','Conductor','Test','https://pbs.twimg.com/profile_images/825896631132422144/XG4CZU8N_400x400.jpg','conductor@turismoreal.cl','LA CASA DEL','9-12345678','$2b$10$1WKLtNaU8/hRbINDgMPBJuiyXp3Nhos1W/lVEl3xkJM9TL3N5aUWq','4');
--------------------------------------------------------------------------------------
INSERT INTO DEPARTAMENTO (ID,NOMBRE,NUMERO_BANNO,NUMERO_HABITACION,DIRECCION,VALOR_ARRIENDO,ID_LOCALIDAD,DESCRIPCION,ESTADO_DISPONIBLE,ESTADO_RESERVA,IMAGENES)
VALUES(DEPARTAMENTO_AUTO.NEXTVAL,'Edificio Padre Hurtado',1,1,'AV. Vespucio 305',289990,1,'Departamento Básico','Y','Y','https://turismoreal2.s3.amazonaws.com/8_1.jpg,https://turismoreal2.s3.amazonaws.com/8_2.jpg,https://turismoreal2.s3.amazonaws.com/8_3.jpg');

INSERT INTO DEPARTAMENTO (ID,NOMBRE,NUMERO_BANNO,NUMERO_HABITACION,DIRECCION,VALOR_ARRIENDO,ID_LOCALIDAD,DESCRIPCION,ESTADO_DISPONIBLE,ESTADO_RESERVA,IMAGENES)
VALUES(DEPARTAMENTO_AUTO.NEXTVAL,'Edificio Las Palmas',1,2,'Calle Almagro 8322',259990,2,'Departamento Básico','Y','Y','https://turismoreal2.s3.amazonaws.com/9_1.jpg,https://turismoreal2.s3.amazonaws.com/9_2.jpg,https://turismoreal2.s3.amazonaws.com/9_3.jpg');

INSERT INTO DEPARTAMENTO (ID,NOMBRE,NUMERO_BANNO,NUMERO_HABITACION,DIRECCION,VALOR_ARRIENDO,ID_LOCALIDAD,DESCRIPCION,ESTADO_DISPONIBLE,ESTADO_RESERVA,IMAGENES)
VALUES(DEPARTAMENTO_AUTO.NEXTVAL,'Condomio Paraiso Sur',3,2,'Calle Medalla 3942',439990,4,'Departamento Intermedio','Y','Y','https://turismoreal2.s3.amazonaws.com/10_1.jpg,https://turismoreal2.s3.amazonaws.com/10_2.jpg,https://turismoreal2.s3.amazonaws.com/10_3.jpg');

INSERT INTO DEPARTAMENTO (ID,NOMBRE,NUMERO_BANNO,NUMERO_HABITACION,DIRECCION,VALOR_ARRIENDO,ID_LOCALIDAD,DESCRIPCION,ESTADO_DISPONIBLE,ESTADO_RESERVA,IMAGENES)
VALUES(DEPARTAMENTO_AUTO.NEXTVAL,'Condomio Las Estrellas',3,3,'Nueva Zelanda 342',499990,2,'Departamento Intermedio','Y','Y','https://turismoreal2.s3.amazonaws.com/11_1.jpg,https://turismoreal2.s3.amazonaws.com/11_2.jpg,https://turismoreal2.s3.amazonaws.com/11_3.jpg');

INSERT INTO DEPARTAMENTO (ID,NOMBRE,NUMERO_BANNO,NUMERO_HABITACION,DIRECCION,VALOR_ARRIENDO,ID_LOCALIDAD,DESCRIPCION,ESTADO_DISPONIBLE,ESTADO_RESERVA,IMAGENES)
VALUES(DEPARTAMENTO_AUTO.NEXTVAL,'Recinto El Hospedaje',4,2,'AV. Coronel 232',649990,3,'Departamento Comnpleto','Y','Y','https://turismoreal2.s3.amazonaws.com/13_1.jpg,https://turismoreal2.s3.amazonaws.com/13_2.jpg,https://turismoreal2.s3.amazonaws.com/13_3.jpg');

INSERT INTO DEPARTAMENTO (ID,NOMBRE,NUMERO_BANNO,NUMERO_HABITACION,DIRECCION,VALOR_ARRIENDO,ID_LOCALIDAD,DESCRIPCION,ESTADO_DISPONIBLE,ESTADO_RESERVA,IMAGENES)
VALUES(DEPARTAMENTO_AUTO.NEXTVAL,'Recinto Sur 3',4,4,'Calle Mongoles 3322',759990,4,'Departamento Comnpleto','Y','Y','https://turismoreal2.s3.amazonaws.com/8_1.jpg,https://turismoreal2.s3.amazonaws.com/8_2.jpg,https://turismoreal2.s3.amazonaws.com/8_3.jpg');

--------------------------------------------------------------------------------------

INSERT INTO CONDUCTOR VALUES(CONDUCTOR_AUTO.NEXTVAL,4,'CAMIONETA','DS-SD-E3',1);

--------------------------------------------------------------------------------------
INSERT INTO INVENTARIO (ID,ID_DEPARTAMENTO,ID_PRODUCTO,CANTIDAD) VALUES(INVENTARIO_AUTO.NEXTVAL,1,2,2);
INSERT INTO INVENTARIO (ID,ID_DEPARTAMENTO,ID_PRODUCTO,CANTIDAD) VALUES(INVENTARIO_AUTO.NEXTVAL,1,1,2);
INSERT INTO INVENTARIO (ID,ID_DEPARTAMENTO,ID_PRODUCTO,CANTIDAD) VALUES(INVENTARIO_AUTO.NEXTVAL,2,3,2);

--------------------------------------------------------------------------------------
INSERT INTO TERMINAL VALUES(TERMINAL_AUTO.NEXTVAL,1,'TERMINAL LA SERENA');
--------------------------------------------------------------------------------------
INSERT INTO TRANSPORTE (ID,ID_CONDUCTOR,ID_TERMINAL,FECHA,HORARIO,PRECIO) VALUES('TR_'||TO_CHAR(TRANSPORTE_AUTO.NEXTVAL),1,1,'22-08-2022','14:00:00',10000);
--------------------------------------------------------------------------------------
INSERT INTO TOUR (ID,CUPO,PRECIO,FECHA,HORA_INICIO,DURACION,DESCRIPCION,ID_LOCALIDAD) VALUES('TO_'||TO_CHAR(TOUR_AUTO.NEXTVAL),3,7500,'26/08/2022','14:00','5 HORAS','PLAYA BONITA',1);
--------------------------------------------------------------------------------------
INSERT INTO CHECKIN(ID,DESCRIPCION,PAGO_COMPLETADO) VALUES(CHECKIN_AUTO.NEXTVAL,'',0);
--------------------------------------------------------------------------------------
INSERT INTO CHECKOUT(ID,DESCRIPCION,INCONVENIENTES) VALUES(CHECKOUT_AUTO.NEXTVAL,'',0);
--------------------------------------------------------------------------------------
INSERT INTO PAGO(ID,ABONO,PAGO_TOTAL,PAGO_INCONVENIENTE) VALUES(PAGO_AUTO.NEXTVAL,57998,0,0);
INSERT INTO PAGO(ID,ABONO,PAGO_TOTAL,PAGO_INCONVENIENTE) VALUES(PAGO_AUTO.NEXTVAL,24000,120000,0);
INSERT INTO PAGO(ID,ABONO,PAGO_TOTAL,PAGO_INCONVENIENTE) VALUES(PAGO_AUTO.NEXTVAL,24000,120000,12000);
INSERT INTO PAGO(ID,ABONO,PAGO_TOTAL,PAGO_INCONVENIENTE) VALUES(PAGO_AUTO.NEXTVAL,24000,120000,12000);
INSERT INTO PAGO(ID,ABONO,PAGO_TOTAL,PAGO_INCONVENIENTE) VALUES(PAGO_AUTO.NEXTVAL,24000,120000,12000);
INSERT INTO PAGO(ID,ABONO,PAGO_TOTAL,PAGO_INCONVENIENTE) VALUES(PAGO_AUTO.NEXTVAL,24000,0,0);
INSERT INTO PAGO(ID,ABONO,PAGO_TOTAL,PAGO_INCONVENIENTE) VALUES(PAGO_AUTO.NEXTVAL,24000,120000,12000);
INSERT INTO PAGO(ID,ABONO,PAGO_TOTAL,PAGO_INCONVENIENTE) VALUES(PAGO_AUTO.NEXTVAL,24000,0,0);
INSERT INTO PAGO(ID,ABONO,PAGO_TOTAL,PAGO_INCONVENIENTE) VALUES(PAGO_AUTO.NEXTVAL,24000,120000,12000);
INSERT INTO PAGO(ID,ABONO,PAGO_TOTAL,PAGO_INCONVENIENTE) VALUES(PAGO_AUTO.NEXTVAL,24000,120000,12000);
INSERT INTO PAGO(ID,ABONO,PAGO_TOTAL,PAGO_INCONVENIENTE) VALUES(PAGO_AUTO.NEXTVAL,24000,0,0);
INSERT INTO PAGO(ID,ABONO,PAGO_TOTAL,PAGO_INCONVENIENTE) VALUES(PAGO_AUTO.NEXTVAL,24000,120000,12000);
INSERT INTO PAGO(ID,ABONO,PAGO_TOTAL,PAGO_INCONVENIENTE) VALUES(PAGO_AUTO.NEXTVAL,24000,120000,0);

--------------------------------------------------------------------------------------
INSERT INTO RESERVA(ID,FECHA_INICIO,DIAS,CANTIDAD_PERSONA,ID_CLIENTE,ID_DEPARTAMENTO,ID_CHECKIN,ID_CHECKOUT,ID_PAGO,ESTADO) VALUES(RESERVA_AUTO.NEXTVAL,'22-06-2022',3,2,3,1,1,1,1,1);
INSERT INTO RESERVA(ID,FECHA_INICIO,DIAS,CANTIDAD_PERSONA,ID_CLIENTE,ID_DEPARTAMENTO,ID_CHECKIN,ID_CHECKOUT,ID_PAGO,ESTADO) VALUES(RESERVA_AUTO.NEXTVAL,'22-06-2022',3,2,3,2,1,1,2,1);
INSERT INTO RESERVA(ID,FECHA_INICIO,DIAS,CANTIDAD_PERSONA,ID_CLIENTE,ID_DEPARTAMENTO,ID_CHECKIN,ID_CHECKOUT,ID_PAGO,ESTADO) VALUES(RESERVA_AUTO.NEXTVAL,'22-07-2022',3,2,3,4,1,1,3,1);
INSERT INTO RESERVA(ID,FECHA_INICIO,DIAS,CANTIDAD_PERSONA,ID_CLIENTE,ID_DEPARTAMENTO,ID_CHECKIN,ID_CHECKOUT,ID_PAGO,ESTADO) VALUES(RESERVA_AUTO.NEXTVAL,'22-07-2022',3,2,3,3,1,1,4,0);
INSERT INTO RESERVA(ID,FECHA_INICIO,DIAS,CANTIDAD_PERSONA,ID_CLIENTE,ID_DEPARTAMENTO,ID_CHECKIN,ID_CHECKOUT,ID_PAGO,ESTADO) VALUES(RESERVA_AUTO.NEXTVAL,'22-08-2022',3,2,3,2,1,1,5,1);
INSERT INTO RESERVA(ID,FECHA_INICIO,DIAS,CANTIDAD_PERSONA,ID_CLIENTE,ID_DEPARTAMENTO,ID_CHECKIN,ID_CHECKOUT,ID_PAGO,ESTADO) VALUES(RESERVA_AUTO.NEXTVAL,'22-08-2022',3,2,3,4,1,1,6,0);
INSERT INTO RESERVA(ID,FECHA_INICIO,DIAS,CANTIDAD_PERSONA,ID_CLIENTE,ID_DEPARTAMENTO,ID_CHECKIN,ID_CHECKOUT,ID_PAGO,ESTADO) VALUES(RESERVA_AUTO.NEXTVAL,'27-08-2022',3,2,3,4,1,1,7,0);
INSERT INTO RESERVA(ID,FECHA_INICIO,DIAS,CANTIDAD_PERSONA,ID_CLIENTE,ID_DEPARTAMENTO,ID_CHECKIN,ID_CHECKOUT,ID_PAGO,ESTADO) VALUES(RESERVA_AUTO.NEXTVAL,'29-08-2022',3,2,3,4,1,1,8,1);
INSERT INTO RESERVA(ID,FECHA_INICIO,DIAS,CANTIDAD_PERSONA,ID_CLIENTE,ID_DEPARTAMENTO,ID_CHECKIN,ID_CHECKOUT,ID_PAGO,ESTADO) VALUES(RESERVA_AUTO.NEXTVAL,'22-09-2022',3,2,3,2,1,1,9,1);
INSERT INTO RESERVA(ID,FECHA_INICIO,DIAS,CANTIDAD_PERSONA,ID_CLIENTE,ID_DEPARTAMENTO,ID_CHECKIN,ID_CHECKOUT,ID_PAGO,ESTADO) VALUES(RESERVA_AUTO.NEXTVAL,'22-09-2022',3,2,3,1,1,1,10,1);
INSERT INTO RESERVA(ID,FECHA_INICIO,DIAS,CANTIDAD_PERSONA,ID_CLIENTE,ID_DEPARTAMENTO,ID_CHECKIN,ID_CHECKOUT,ID_PAGO,ESTADO) VALUES(RESERVA_AUTO.NEXTVAL,'22-09-2022',3,2,3,3,1,1,11,1);
INSERT INTO RESERVA(ID,FECHA_INICIO,DIAS,CANTIDAD_PERSONA,ID_CLIENTE,ID_DEPARTAMENTO,ID_CHECKIN,ID_CHECKOUT,ID_PAGO,ESTADO) VALUES(RESERVA_AUTO.NEXTVAL,'22-10-2022',3,2,3,3,1,1,12,0);
INSERT INTO RESERVA(ID,FECHA_INICIO,DIAS,CANTIDAD_PERSONA,ID_CLIENTE,ID_DEPARTAMENTO,ID_CHECKIN,ID_CHECKOUT,ID_PAGO,ESTADO) VALUES(RESERVA_AUTO.NEXTVAL,'22-11-2022',3,2,3,4,1,1,13,0);

--------------------------------------------------------------------------------------
INSERT INTO SERVICIO(ID,FECHA_CONTRATO,DESCRIPCION,ID_RESERVA,ID_TRANSPORTE) VALUES(SERVICIO_AUTO.NEXTVAL,'22-08-2022','DOS SERVICIOS CONTRATADOS',1,'TR_1');
INSERT INTO SERVICIO(ID,FECHA_CONTRATO,DESCRIPCION,ID_RESERVA,ID_TOUR) VALUES(SERVICIO_AUTO.NEXTVAL,'22-08-2022','DOS SERVICIOS CONTRATADOS',1,'TO_1');

COMMIT;