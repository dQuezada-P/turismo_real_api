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

DROP SEQUENCE PAGO_AUTO;

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
    CARGO VARCHAR2(60) NOT NULL
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
    ID VARCHAR2(5) NOT NULL PRIMARY KEY,
    VEHICULO VARCHAR(60) NOT NULL,
    HORARIO TIMESTAMP NOT NULL,
    CONDUCTOR VARCHAR2(60) NOT NULL,
    PRECIO NUMBER NOT NULL,
    PATENTE VARCHAR(8) NOT NULL,
    ID_LOCALIDAD NUMBER NOT NULL,
    CONSTRAINT FK_ID_LOCALIDAD_TRANSPORTE FOREIGN KEY(ID_LOCALIDAD) REFERENCES LOCALIDAD(ID)
    
);
--**** TABLE TOUR ****--
CREATE SEQUENCE TOUR_AUTO START WITH 1 INCREMENT BY 1;

CREATE TABLE TOUR(
    ID VARCHAR2(5) NOT NULL PRIMARY KEY,
    CIUDAD VARCHAR2(60) NOT NULL,
    CUPO NUMBER NOT NULL,
    PRECIO NUMBER NOT NULL,
    HORARIO TIMESTAMP NOT NULL,
    DESCRIPCION VARCHAR2(60),
    ID_LOCALIDAD NUMBER NOT NULL,
    CONSTRAINT FK_ID_LOCALIDAD_TOUR FOREIGN KEY(ID_LOCALIDAD) REFERENCES LOCALIDAD(ID)
);

--**** TABLE CKECKIN ****--
CREATE SEQUENCE CHECKIN_AUTO START WITH 1 INCREMENT BY 1;

CREATE TABLE CHECKIN(
    ID NUMBER NOT NULL PRIMARY KEY,
    DESCRIPCION VARCHAR2(60),
    PAGO_COMPLETADO NUMBER,
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
    FECHA_INICIO DATE NOT NULL,
    DIAS NUMBER NOT NULL,
    CANTIDAD_PERSONA NUMBER,
    ID_CLIENTE VARCHAR2(10) NOT NULL,
    ID_DEPARTAMENTO NUMBER NOT NULL,
    ID_CHECKIN NUMBER,
    ID_CHECKOUT NUMBER,
    ID_PAGO NUMBER,
    ADDED_DATE TIMESTAMP DEFAULT SYSDATE,
    MODIFIED_DATE TIMESTAMP DEFAULT SYSDATE,
    CONSTRAINT FK_ID_CLIENTE FOREIGN KEY(ID_CLIENTE) REFERENCES USUARIO(RUT),
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
INSERT INTO USUARIO VALUES('18937755-K','CLAUDIO','ABELE','https://pbs.twimg.com/profile_images/825896631132422144/XG4CZU8N_400x400.jpg','cl.duoc@duocuc.cl','Y','TU CASA','9-12345678','$2b$10$1WKLtNaU8/hRbINDgMPBJuiyXp3Nhos1W/lVEl3xkJM9TL3N5aUWq','1');

INSERT INTO USUARIO VALUES('20141805-4','NICOLAS','CASTILLO','https://pbs.twimg.com/profile_images/825896631132422144/XG4CZU8N_400x400.jpg','ni.duoc@duocuc.cl','N','LA CASA DEL','9-12345678','$2b$10$1WKLtNaU8/hRbINDgMPBJuiyXp3Nhos1W/lVEl3xkJM9TL3N5aUWq','2');

INSERT INTO USUARIO VALUES('21234325-2','DIEGO','PAVEZ','https://pbs.twimg.com/profile_images/825896631132422144/XG4CZU8N_400x400.jpg','test@duocuc.cl','N','LA CASA DEL','9-12345678','$2b$10$1WKLtNaU8/hRbINDgMPBJuiyXp3Nhos1W/lVEl3xkJM9TL3N5aUWq','3');
-----------------
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
INSERT INTO TRANSPORTE VALUES('TR_'||TO_CHAR(TRANSPORTE_AUTO.NEXTVAL),'AUTO','22-08-22 14:00:00','THOMAS',10000,'AB-CD-12',2);
--------------------------------------------------------------------------------------
INSERT INTO TOUR VALUES('TO_'||TO_CHAR(TOUR_AUTO.NEXTVAL),'LA SERENA',3,7500,'22-08-22 14:00:00','PLAYA BONITA',1);
--------------------------------------------------------------------------------------
INSERT INTO CHECKIN(ID,DESCRIPCION,PAGO_COMPLETADO) VALUES(CHECKIN_AUTO.NEXTVAL,'TRAEN SU MASCOTA',5000);
--------------------------------------------------------------------------------------
INSERT INTO CHECKOUT(ID,DESCRIPCION,INCONVENIENTES) VALUES(CHECKOUT_AUTO.NEXTVAL,'MESA LIVING ROTA',15000);
--------------------------------------------------------------------------------------
INSERT INTO PAGO(ID) VALUES(PAGO_AUTO.NEXTVAL);
--------------------------------------------------------------------------------------
INSERT INTO RESERVA(ID,FECHA_INICIO,DIAS,CANTIDAD_PERSONA,ID_CLIENTE,ID_DEPARTAMENTO,ID_CHECKIN,ID_CHECKOUT,ID_PAGO) VALUES(RESERVA_AUTO.NEXTVAL,'22-08-22',3,2,'18937755-K',1,1,1,1);
--------------------------------------------------------------------------------------
create or replace TRIGGER CREAR_RESERVA
    BEFORE INSERT ON RESERVA
    DECLARE
    PRAGMA AUTONOMOUS_TRANSACTION;
    ID_RESERVA NUMBER;
    BEGIN
        SELECT ID INTO ID_RESERVA FROM (SELECT * FROM RESERVA
                        ORDER BY ID DESC )
                        WHERE ROWNUM = 1 ;
        ID_RESERVA := ID_RESERVA + 1;
        INSERT INTO CHECKIN(ID) VALUES(ID_RESERVA);
        INSERT INTO CHECKOUT(ID) VALUES(ID_RESERVA);
        INSERT INTO PAGO(ID) VALUES(ID_RESERVA);
        --acciones_reserva.actualizar_checks(ID_RESERVA,V,B);
        --UPDATE RESERVA SET ID_CHECKIN = ID_RESERVA WHERE ID = ID_RESERVA;
        --DBMS_OUTPUT.PUT_LINE(B);
        COMMIT;

END;
/
--------------------------------------------------------------------------------------
INSERT INTO SERVICIO(ID,FECHA_CONTRATO,DESCRIPCION,ID_RESERVA,ID_TRANSPORTE) VALUES(SERVICIO_AUTO.NEXTVAL,'22-08-22','DOS SERVICIOS CONTRATADOS',1,'TR_1');
INSERT INTO SERVICIO(ID,FECHA_CONTRATO,DESCRIPCION,ID_RESERVA,ID_TOUR) VALUES(SERVICIO_AUTO.NEXTVAL,'22-08-22','DOS SERVICIOS CONTRATADOS',1,'TO_1');