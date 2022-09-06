create or replace PACKAGE ACCIONES_USUARIO
AS
    PROCEDURE CREAR_USUARIO(
    V_RUT IN VARCHAR2, 
    V_NOMBRE IN VARCHAR2, 
    V_APELLIDO IN VARCHAR2, 
    V_CORREO IN VARCHAR2, 
    V_ESTADO IN CHAR,
    V_DIRECCION IN VARCHAR2,
    V_TELEFONO IN VARCHAR2,
    V_PASS IN VARCHAR2,
    V_ROL IN NUMBER,
    RESULTADO OUT NUMBER);

    PROCEDURE MODIFICAR_USUARIO(
    V_RUT IN VARCHAR2,
    V_NOMBRE IN VARCHAR2, 
    V_APELLIDO IN VARCHAR2, 
    V_CORREO IN VARCHAR2, 
    V_ESTADO IN CHAR,
    V_DIRECCION IN VARCHAR2,
    V_TELEFONO IN VARCHAR2,
    V_PASS IN VARCHAR2,
    V_ROL IN NUMBER,
    RESULTADO OUT NUMBER);
    
    PROCEDURE ELIMINAR_USUARIO(V_RUT IN VARCHAR2, RESULTADO OUT NUMBER);

    PROCEDURE VER_USUARIO_ADMINISTRADOR (V_USERS OUT SYS_REFCURSOR);

    PROCEDURE VER_USUARIO_CLIENTE (V_USERS OUT SYS_REFCURSOR);

    PROCEDURE VER_USUARIO_FUNCIONARIO (V_USERS OUT SYS_REFCURSOR);
END;

create or replace PACKAGE BODY ACCIONES_USUARIO
AS
        PROCEDURE CREAR_USUARIO(
        V_RUT IN VARCHAR2, 
        V_NOMBRE IN VARCHAR2, 
        V_APELLIDO IN VARCHAR2, 
        V_CORREO IN VARCHAR2, 
        V_ESTADO IN CHAR,
        V_DIRECCION IN VARCHAR2,
        V_TELEFONO IN VARCHAR2,
        V_PASS IN VARCHAR2,
        V_ROL IN NUMBER,
        RESULTADO OUT NUMBER)
    AS
    BEGIN
        INSERT INTO USUARIO VALUES(V_RUT,V_NOMBRE,V_APELLIDO,V_CORREO,V_ESTADO,V_DIRECCION,V_TELEFONO,V_PASS,V_ROL);  
        RESULTADO := SQL%ROWCOUNT;
        COMMIT;

        EXCEPTION
            WHEN OTHERS THEN
               RESULTADO:=0;
               ROLLBACK;
    END;
    ----
        PROCEDURE MODIFICAR_USUARIO(
        V_RUT IN VARCHAR2,
        V_NOMBRE IN VARCHAR2, 
        V_APELLIDO IN VARCHAR2, 
        V_CORREO IN VARCHAR2, 
        V_ESTADO IN CHAR,
        V_DIRECCION IN VARCHAR2,
        V_TELEFONO IN VARCHAR2,
        V_PASS IN VARCHAR2,
        V_ROL IN NUMBER,
        RESULTADO OUT NUMBER)
    AS
    BEGIN
        UPDATE USUARIO
        SET NOMBRE = V_NOMBRE,
            APELLIDO = V_APELLIDO,
            CORREO = V_CORREO,
            ESTADO = V_ESTADO,
            DIRECCION = V_DIRECCION,
            TELEFONO = V_TELEFONO,
            PASS = V_PASS,
            ID_ROL = V_ROL
        WHERE RUT = V_RUT;
        RESULTADO := SQL%ROWCOUNT;
        COMMIT;

        EXCEPTION
            WHEN OTHERS THEN
               RESULTADO:=0;
               ROLLBACK;
    END;
    -----
    PROCEDURE ELIMINAR_USUARIO(V_RUT IN VARCHAR2, RESULTADO OUT NUMBER)
    AS
    BEGIN
          DELETE FROM USUARIO WHERE RUT = V_RUT;
        RESULTADO := SQL%ROWCOUNT;
        COMMIT;
        EXCEPTION
            WHEN OTHERS THEN
               RESULTADO:=0;
               ROLLBACK;
    END;
    -----
        PROCEDURE VER_USUARIO_ADMINISTRADOR (V_USERS OUT SYS_REFCURSOR)
    AS
    BEGIN
        OPEN V_USERS FOR SELECT U.RUT,
                                U.NOMBRE,
                                U.APELLIDO,
                                U.CORREO,
                                U.ESTADO,
                                U.DIRECCION,
                                U.TELEFONO,
                                U.PASS,
                                R.DESCRIPCION AS "CARGO"
                                FROM USUARIO U
                                JOIN ROL R 
                                ON U.ID_ROL = R.ID
                                WHERE U.ID_ROL = 1; 

    END;
    ------
        PROCEDURE VER_USUARIO_CLIENTE ( V_USERS OUT SYS_REFCURSOR )
    AS
    BEGIN
        OPEN V_USERS FOR SELECT U.RUT,
                                U.NOMBRE,
                                U.APELLIDO,
                                U.CORREO,
                                U.ESTADO,
                                U.DIRECCION,
                                U.TELEFONO,
                                U.PASS,
                                R.DESCRIPCION AS "CARGO"
                                FROM USUARIO U
                                JOIN ROL R 
                                ON U.ID_ROL = R.ID
                                WHERE U.ID_ROL = 3;                                      

    END;
    -------
        PROCEDURE VER_USUARIO_FUNCIONARIO (V_USERS OUT SYS_REFCURSOR)
    AS
    BEGIN
        OPEN V_USERS FOR SELECT U.RUT,
                                U.NOMBRE,
                                U.APELLIDO,
                                U.CORREO,
                                U.ESTADO,
                                U.DIRECCION,
                                U.TELEFONO,
                                U.PASS,
                                R.DESCRIPCION AS "CARGO"
                                FROM USUARIO U
                                JOIN ROL R 
                                ON U.ID_ROL = R.ID
                                WHERE U.ID_ROL = 2;                                      

    END;

END;