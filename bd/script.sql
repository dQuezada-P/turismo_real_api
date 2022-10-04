----**** DROPS TABLES ****---
DROP TABLE RESERVA;

DROP TABLE CHECKOUT;

DROP TABLE CHECKIN;

DROP TABLE SERVICIO;

DROP TABLE TRANSPORTE;

DROP TABLE TOUR;

DROP TABLE INVENTARIO;

DROP TABLE DEPARTAMENTO;

DROP TABLE USUARIO;

DROP TABLE ROL;

DROP TABLE PRODUCTO;

DROP TABLE CATEGORIA;

DROP TABLE LOCALIDAD;

----**** DROPS SEQUENCES ***------

DROP SEQUENCE ROL_AUTO;

DROP SEQUENCE CATEGORIA_AUTO;

DROP SEQUENCE PRODUCTO_AUTO;

DROP SEQUENCE LOCALIDAD_AUTO;

DROP SEQUENCE TRANSPORTE_AUTO;

DROP SEQUENCE TOUR_AUTO;

DROP SEQUENCE SERVICIO_AUTO;

DROP SEQUENCE INVENTARIO_AUTO;

DROP SEQUENCE RESERVA_AUTO;

DROP SEQUENCE DEPARTAMENTO_AUTO;

DROP SEQUENCE CHECKIN_AUTO;

DROP SEQUENCE CHECKOUT_AUTO;

--**** TURISMO REAL ****-----
CREATE SEQUENCE CATEGORIA_AUTO START WITH 1 INCREMENT BY 1;

CREATE TABLE CATEGORIA(
    ID NUMBER NOT NULL PRIMARY KEY,
    DESCRIPCION VARCHAR2(60) NOT NULL
);
---**** PRODUCT ****----
CREATE SEQUENCE PRODUCTO_AUTO START WITH 1 INCREMENT BY 1;

CREATE TABLE PRODUCTO(
    ID NUMBER NOT NULL PRIMARY KEY,
    NOMBRE VARCHAR2(60) NOT NULL,
    PRECIO NUMBER NOT NULL,
    ID_CATEGORIA NUMBER NOT NULL,
    CONSTRAINT FK_ID_CATEGORIA FOREIGN KEY(ID_CATEGORIA) REFERENCES CATEGORIA (ID)
);

--**** TABLE ROL ****---
CREATE SEQUENCE ROL_AUTO START WITH 1 INCREMENT BY 1;

CREATE TABLE ROL(
    ID NUMBER NOT NULL PRIMARY KEY,
    DESCRIPCION VARCHAR2(60) NOT NULL
);

--**** TABLE USER ****---

CREATE TABLE USUARIO(
    RUT VARCHAR2(10) NOT NULL PRIMARY KEY,
    NOMBRE VARCHAR(60) NOT NULL,
    APELLIDO VARCHAR(60) NOT NULL,
    IMAGEN CLOB,
    CORREO VARCHAR(60) UNIQUE NOT NULL,
    ESTADO CHAR NOT NULL,
    DIRECCION VARCHAR(60) NOT NULL,
    TELEFONO VARCHAR2(60) NOT NULL,
    PASS VARCHAR2(60)NOT NULL,
    ID_ROL NUMBER NOT NULL,
    CONSTRAINT FK_ROL_ID FOREIGN KEY(ID_ROL) REFERENCES ROL (ID)
);

--**** TABLE LOCATION ****-----

CREATE SEQUENCE LOCALIDAD_AUTO START WITH 1 INCREMENT BY 1;

CREATE TABLE LOCALIDAD(
    ID NUMBER PRIMARY KEY NOT NULL,
    NOMBRE VARCHAR2(60)
);

--**** TABLE DEPARTAMENT ****--

CREATE SEQUENCE DEPARTAMENTO_AUTO START WITH 1 INCREMENT BY 1;

CREATE TABLE DEPARTAMENTO(
    ID NUMBER NOT NULL PRIMARY KEY,
    NOMBRE VARCHAR(60) NOT NULL,
    NUMERO_BANNO NUMBER NOT NULL,
    NUMERO_HABITACION NUMBER NOT NULL,
    DIRECCION VARCHAR2(60) NOT NULL,
    VALOR_ARRIENDO NUMBER NOT NULL,
    ID_LOCALIDAD NUMBER NOT NULL,
    DESCRIPCION VARCHAR2(60),
    ESTADO_DISPONIBLE CHAR NOT NULL,
    ESTADO_RESERVA CHAR NOT NULL,
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
    NOMBRE VARCHAR2(60) NOT NULL,
    CANTIDAD NUMBER NOT NULL,
    ESTADO CHAR NOT NULL,
    DESCRIPCION VARCHAR2(60) NOT NULL,
    ID_PRODUCTO NUMBER NOT NULL,
    ID_DEPARTAMENTO NUMBER NOT NULL,
    CONSTRAINT FK_ID_PRODUCTO FOREIGN KEY(ID_PRODUCTO) REFERENCES PRODUCTO (ID),
    CONSTRAINT FK_ID_DEPARTAMENTO FOREIGN KEY(ID_DEPARTAMENTO) REFERENCES DEPARTAMENTO (ID)
);
--**** TABLE TRANSPORT ****--

CREATE SEQUENCE TRANSPORTE_AUTO START WITH 1 INCREMENT BY 1;

CREATE TABLE TRANSPORTE(
    ID NUMBER NOT NULL PRIMARY KEY,
    CIUDAD VARCHAR(60) NOT NULL,
    VEHICULO VARCHAR(60) NOT NULL,
    HORARIO TIMESTAMP NOT NULL,
    CONDUCTOR VARCHAR2(60) NOT NULL,
    PRECIO NUMBER NOT NULL,
    PATENTE VARCHAR(8) NOT NULL
);
--**** TABLE TOUR ****--
CREATE SEQUENCE TOUR_AUTO START WITH 1 INCREMENT BY 1;

CREATE TABLE TOUR(
    ID NUMBER NOT NULL PRIMARY KEY,
    CIUDAD VARCHAR2(60) NOT NULL,
    CUPO NUMBER NOT NULL,
    PRECIO NUMBER NOT NULL,
    HORARIO TIMESTAMP NOT NULL,
    DESCRIPCION VARCHAR2(60)
);
--**** TABLE SERVICE ****--
CREATE SEQUENCE SERVICIO_AUTO START WITH 1 INCREMENT BY 1;

CREATE TABLE SERVICIO(
    ID NUMBER NOT NULL PRIMARY KEY,
    FECHA_CONTRATO DATE NOT NULL,
    DESCRIPCION VARCHAR2(60),
    ID_TRANSPORTE NUMBER NULL,
    ID_TOUR NUMBER NULL,
    CONSTRAINT FK_ID_TRANSPORTE_SERVICIO FOREIGN KEY(ID_TRANSPORTE) REFERENCES TRANSPORTE(ID),
    CONSTRAINT FK_ID_TOUR_SERVICIO FOREIGN KEY(ID_TOUR) REFERENCES TOUR(ID)
);

--**** TABLE CKECKIN ****--
CREATE SEQUENCE CHECKIN_AUTO START WITH 1 INCREMENT BY 1;

CREATE TABLE CHECKIN(
    ID NUMBER NOT NULL PRIMARY KEY,
    FECHA_CONTRATO DATE NOT NULL,
    HORA_DE_ENTRADA TIMESTAMP NOT NULL,
    DESCRIPCION VARCHAR2(60),
    PAGO_COMPLETADO NUMBER NOT NULL
);
--**** TABLE CHECKOUT ****--
CREATE SEQUENCE CHECKOUT_AUTO START WITH 1 INCREMENT BY 1;

CREATE TABLE CHECKOUT(
    ID NUMBER NOT NULL PRIMARY KEY,
    FECHA_CONTRATO DATE NOT NULL,
    HORA_DE_SALIDA TIMESTAMP NOT NULL,
    DESCRIPCION VARCHAR2(60),
    SUBTOTAL_INCONVENIENTES NUMBER NOT NULL
);

----**** TABLE CHECKOUT ****--
CREATE SEQUENCE RESERVA_AUTO START WITH 1 INCREMENT BY 1;

CREATE TABLE RESERVA(
    ID NUMBER NOT NULL PRIMARY KEY,
    FECHA_INICIO DATE NOT NULL,
    FECHA_SALIDA DATE NOT NULL,
    CANTIDAD_PERSONA NUMBER,
    ID_USUARIO VARCHAR2(10) NOT NULL,
    ID_DEPARTAMENTO NUMBER NOT NULL,
    ID_SERVICIO NUMBER NOT NULL,
    ID_CHECKIN NUMBER NOT NULL,
    ID_CHECKOUT NUMBER NOT NULL,
    CONSTRAINT FK_ID_USUARIO_RESERVA FOREIGN KEY(ID_USUARIO) REFERENCES USUARIO(RUT),
    CONSTRAINT FK_ID_DEPARTAMENTO_RESERVA FOREIGN KEY(ID_DEPARTAMENTO) REFERENCES DEPARTAMENTO(ID),
    CONSTRAINT FK_ID_SERVICIO_RESERVA FOREIGN KEY(ID_SERVICIO) REFERENCES SERVICIO(ID),
    CONSTRAINT FK_ID_CHECKIN_RESERVA FOREIGN KEY(ID_CHECKIN) REFERENCES CHECKIN(ID),
    CONSTRAINT FK_ID_CHECKOUT_RESERVA FOREIGN KEY(ID_CHECKOUT) REFERENCES CHECKOUT(ID)
);
--------------------------------------------------------------------------------------
INSERT INTO CATEGORIA VALUES(CATEGORIA_AUTO.NEXTVAL,'MUEBLERIA');

INSERT INTO CATEGORIA VALUES(CATEGORIA_AUTO.NEXTVAL,'SERVICIOS BASICO');

INSERT INTO CATEGORIA VALUES(CATEGORIA_AUTO.NEXTVAL,'DECORACION');
--------------------------------------------------------------------------------------
INSERT INTO ROL VALUES(ROL_AUTO.NEXTVAL,'ADMINISTRADOR');

INSERT INTO ROL VALUES(ROL_AUTO.NEXTVAL,'FUNCIONARIO');

INSERT INTO ROL VALUES(ROL_AUTO.NEXTVAL,'CLIENTE');
--------------------------------------------------------------------------------------
INSERT INTO PRODUCTO VALUES(PRODUCTO_AUTO.NEXTVAL,'SILLA','2000',1);

INSERT INTO PRODUCTO VALUES(PRODUCTO_AUTO.NEXTVAL,'MESA','6000',1);

INSERT INTO PRODUCTO VALUES(PRODUCTO_AUTO.NEXTVAL,'INTERNET','10000',2);

INSERT INTO PRODUCTO VALUES(PRODUCTO_AUTO.NEXTVAL,'LAMPARA','1000',1);
--------------------------------------------------------------------------------------
INSERT INTO USUARIO VALUES('18937755-K','CLAUDIO','ABELE','CL.DUOC@DUOCUC.CL','Y','TU CASA','9-12345678','123','1');

INSERT INTO USUARIO VALUES('20141805-4','NICOLAS','CASTILLO','NI.CASTILLOL@DUOCUC.CL','N','LA CASA DEL','9-12345678','123','2');

INSERT INTO USUARIO VALUES('21234325-2','DIEGO','PAVEZ','test@duocuc.cl','N','LA CASA DEL','9-12345678','$2b$10$1WKLtNaU8/hRbINDgMPBJuiyXp3Nhos1W/lVEl3xkJM9TL3N5aUWq','3');
-------------------------------------------------------------------------------------
INSERT INTO LOCALIDAD VALUES(LOCALIDAD_AUTO.NEXTVAL,'SANTIAGO');

INSERT INTO LOCALIDAD VALUES(LOCALIDAD_AUTO.NEXTVAL,'LA SERENA');

INSERT INTO LOCALIDAD VALUES(LOCALIDAD_AUTO.NEXTVAL,'PUERTO VARAS');

INSERT INTO LOCALIDAD VALUES(LOCALIDAD_AUTO.NEXTVAL,'PUCÓN');

INSERT INTO LOCALIDAD VALUES(LOCALIDAD_AUTO.NEXTVAL,'VIÑA DEL MAR');

--------------------------------------------------------------------------------------
INSERT INTO DEPARTAMENTO (ID,NOMBRE,NUMERO_BANNO,NUMERO_HABITACION,DIRECCION,VALOR_ARRIENDO,ID_LOCALIDAD,DESCRIPCION,ESTADO_DISPONIBLE,ESTADO_RESERVA,IMAGENES)
VALUES(DEPARTAMENTO_AUTO.NEXTVAL,'Edificio Padre Hurtado',1,1,'AV. Vespucio 305',289990,1,'Departamento Básico','Y','Y','https://turismoreal2.s3.amazonaws.com/8_1.jpg,https://turismoreal2.s3.amazonaws.com/8_2.jpg,https://turismoreal2.s3.amazonaws.com/8_3.jpg');

INSERT INTO DEPARTAMENTO (ID,NOMBRE,NUMERO_BANNO,NUMERO_HABITACION,DIRECCION,VALOR_ARRIENDO,ID_LOCALIDAD,DESCRIPCION,ESTADO_DISPONIBLE,ESTADO_RESERVA,IMAGENES)
VALUES(DEPARTAMENTO_AUTO.NEXTVAL,'Edificio Las Palmas',1,2,'Calle Almagro 8322',259990,2,'Departamento Básico','Y','Y','https://turismoreal2.s3.amazonaws.com/9_1.jpg,https://turismoreal2.s3.amazonaws.com/9_2.jpg,https://turismoreal2.s3.amazonaws.com/9_3.jpg');

INSERT INTO DEPARTAMENTO (ID,NOMBRE,NUMERO_BANNO,NUMERO_HABITACION,DIRECCION,VALOR_ARRIENDO,ID_LOCALIDAD,DESCRIPCION,ESTADO_DISPONIBLE,ESTADO_RESERVA,IMAGENES)
VALUES(DEPARTAMENTO_AUTO.NEXTVAL,'Condomio Paraiso Sur',3,2,'Calle Medalla 3942',439990,4,'Departamento Intermedio','Y','Y','https://turismoreal2.s3.amazonaws.com/10_1.jpg,https://turismoreal2.s3.amazonaws.com/10_2.jpg,https://turismoreal2.s3.amazonaws.com/10_3.jpg');

INSERT INTO DEPARTAMENTO (ID,NOMBRE,NUMERO_BANNO,NUMERO_HABITACION,DIRECCION,VALOR_ARRIENDO,ID_LOCALIDAD,DESCRIPCION,ESTADO_DISPONIBLE,ESTADO_RESERVA,IMAGENES)
VALUES(DEPARTAMENTO_AUTO.NEXTVAL,'Condomio Las Estrellas',3,3,'Nueva Zelanda 342',499990,5,'Departamento Intermedio','Y','Y','https://turismoreal2.s3.amazonaws.com/11_1.jpg,https://turismoreal2.s3.amazonaws.com/11_2.jpg,https://turismoreal2.s3.amazonaws.com/11_3.jpg');

INSERT INTO DEPARTAMENTO (ID,NOMBRE,NUMERO_BANNO,NUMERO_HABITACION,DIRECCION,VALOR_ARRIENDO,ID_LOCALIDAD,DESCRIPCION,ESTADO_DISPONIBLE,ESTADO_RESERVA,IMAGENES)
VALUES(DEPARTAMENTO_AUTO.NEXTVAL,'Recinto El Hospedaje',4,2,'AV. Coronel 232',649990,3,'Departamento Comnpleto','Y','Y','https://turismoreal2.s3.amazonaws.com/13_1.jpg,https://turismoreal2.s3.amazonaws.com/13_2.jpg,https://turismoreal2.s3.amazonaws.com/13_3.jpg');

INSERT INTO DEPARTAMENTO (ID,NOMBRE,NUMERO_BANNO,NUMERO_HABITACION,DIRECCION,VALOR_ARRIENDO,ID_LOCALIDAD,DESCRIPCION,ESTADO_DISPONIBLE,ESTADO_RESERVA,IMAGENES)
VALUES(DEPARTAMENTO_AUTO.NEXTVAL,'Recinto Sur 3',4,4,'Calle Mongoles 3322',759990,4,'Departamento Comnpleto','Y','Y','https://turismoreal2.s3.amazonaws.com/8_1.jpg,https://turismoreal2.s3.amazonaws.com/8_2.jpg,https://turismoreal2.s3.amazonaws.com/8_3.jpg');



--------------------------------------------------------------------------------------
INSERT INTO INVENTARIO VALUES(INVENTARIO_AUTO.NEXTVAL,'MUEBLE',4,'Y','PARA EL LIVING',1,2);

INSERT INTO INVENTARIO VALUES(INVENTARIO_AUTO.NEXTVAL,'MUEBLE',1,'Y','PARA EL LIVING',2,3);

INSERT INTO INVENTARIO VALUES(INVENTARIO_AUTO.NEXTVAL,'MUEBLE',1,'Y','VER PARTIDOS ONLINE',1,1);
--------------------------------------------------------------------------------------
INSERT INTO TRANSPORTE VALUES(TRANSPORTE_AUTO.NEXTVAL,'LA SERENA','AUTO','22-08-22 14:00:00','THOMAS',10000,'AB-CD-12');
--------------------------------------------------------------------------------------
INSERT INTO TOUR VALUES(TOUR_AUTO.NEXTVAL,'LA SERENA',3,7500,'22-08-22 14:00:00','PLAYA BONITA');
--------------------------------------------------------------------------------------
INSERT INTO SERVICIO VALUES(SERVICIO_AUTO.NEXTVAL,'22-08-22','DOS SERVICIOS CONTRATADOS',1,1);
--------------------------------------------------------------------------------------
INSERT INTO CHECKIN VALUES(CHECKIN_AUTO.NEXTVAL,'22-08-22','22-08-22 14:30:00','TRAEN SU MASCOTA',5000);
--------------------------------------------------------------------------------------
INSERT INTO CHECKOUT VALUES(CHECKOUT_AUTO.NEXTVAL,'22-08-22','23-08-22 14:30:00','TRAEN SU MASCOTA',5000);
--------------------------------------------------------------------------------------
INSERT INTO RESERVA VALUES(RESERVA_AUTO.NEXTVAL,'22-08-22','23-08-22',2,'18937755-K',1,1,1,1);

COMMIT;