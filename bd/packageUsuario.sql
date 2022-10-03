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
    RESULTADO OUT NUMBER,
    MSG OUT VARCHAR2);

    PROCEDURE MODIFICAR_USUARIO(
        V_RUT IN VARCHAR2,
        V_NOMBRE IN VARCHAR2, 
        V_APELLIDO IN VARCHAR2, 
        V_CORREO IN VARCHAR2, 
        V_DIRECCION IN VARCHAR2,
        V_TELEFONO IN VARCHAR2,
        RESULTADO OUT NUMBER,
        MSG OUT VARCHAR2);

    PROCEDURE ELIMINAR_USUARIO(V_RUT IN VARCHAR2, RESULTADO OUT NUMBER);

    PROCEDURE VER_USUARIO_ADMINISTRADOR (V_USERS OUT SYS_REFCURSOR);

    PROCEDURE VER_USUARIOS_CLIENTE (V_USERS OUT SYS_REFCURSOR);

    PROCEDURE VER_USUARIO_CLIENTE (V_RUT IN VARCHAR2 ,V_USERS OUT SYS_REFCURSOR);

    PROCEDURE VER_USUARIO_FUNCIONARIO (V_USERS OUT SYS_REFCURSOR);

    PROCEDURE AUTH_USUARIO (V_USERNAME IN VARCHAR2 ,V_USER OUT SYS_REFCURSOR, MSG OUT VARCHAR2);
END;
/
create or replace PACKAGE BODY ACCIONES_USUARIO
AS
    PROCEDURE AUTH_USUARIO (V_USERNAME IN VARCHAR2 ,V_USER OUT SYS_REFCURSOR, MSG OUT VARCHAR2)
    AS
        CURSOR C_RUT IS SELECT U.RUT FROM USUARIO U WHERE U.RUT = V_USERNAME;
        CURSOR C_CORREO IS SELECT U.CORREO FROM USUARIO U WHERE U.CORREO = V_USERNAME; 
        COUNT_ROW NUMBER;
        C VARCHAR2(60);
    BEGIN
        OPEN C_CORREO ;
        FETCH C_CORREO INTO C;  

        COUNT_ROW := C_CORREO%ROWCOUNT;
        CLOSE C_CORREO;

        IF COUNT_ROW > 0 THEN
            OPEN V_USER FOR SELECT * FROM USUARIO U WHERE U.CORREO = V_USERNAME;
        ELSE
            OPEN C_RUT;
            FETCH C_RUT INTO C;  

            COUNT_ROW := C_RUT%ROWCOUNT;
            CLOSE C_RUT;

            IF COUNT_ROW > 0 THEN
                OPEN V_USER FOR SELECT * FROM USUARIO U WHERE U.RUT = V_USERNAME;
            END IF;
        END IF;

    EXCEPTION
        WHEN OTHERS THEN
           MSG:=SQLERRM;
           ROLLBACK;

    END;
    --------
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
    RESULTADO OUT NUMBER,
    MSG OUT VARCHAR2)
    AS
    BEGIN
        INSERT INTO USUARIO VALUES(V_RUT,V_NOMBRE,V_APELLIDO,'https://pbs.twimg.com/profile_images/825896631132422144/XG4CZU8N_400x400.jpg',V_CORREO,V_ESTADO,V_DIRECCION,V_TELEFONO,V_PASS,V_ROL);  
        RESULTADO := SQL%ROWCOUNT;
        COMMIT;

        EXCEPTION
            WHEN OTHERS THEN
               RESULTADO:=0;
               MSG:=SQLERRM;
               ROLLBACK;
    END;
    ----
        PROCEDURE MODIFICAR_USUARIO(
        V_RUT IN VARCHAR2,
        V_NOMBRE IN VARCHAR2, 
        V_APELLIDO IN VARCHAR2, 
        V_CORREO IN VARCHAR2, 
        V_DIRECCION IN VARCHAR2,
        V_TELEFONO IN VARCHAR2,
        RESULTADO OUT NUMBER,
        MSG OUT VARCHAR2)
    AS
    BEGIN
        UPDATE USUARIO
        SET NOMBRE = V_NOMBRE,
            APELLIDO = V_APELLIDO,
            CORREO = V_CORREO,
            DIRECCION = V_DIRECCION,
            TELEFONO = V_TELEFONO
        WHERE RUT = V_RUT;
        RESULTADO := SQL%ROWCOUNT;
        COMMIT;

        EXCEPTION
            WHEN OTHERS THEN
               RESULTADO:=0;
               MSG:=SQLERRM;
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
        PROCEDURE VER_USUARIOS_CLIENTE ( V_USERS OUT SYS_REFCURSOR )
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
    ------
        PROCEDURE VER_USUARIO_CLIENTE ( V_RUT IN VARCHAR2, V_USERS OUT SYS_REFCURSOR )
    AS
    BEGIN
        OPEN V_USERS FOR SELECT U.RUT,
                                U.NOMBRE,
                                U.APELLIDO,
                                U.CORREO,
                                U.ESTADO,
                                U.DIRECCION,
                                U.TELEFONO
                                FROM USUARIO U
                                JOIN ROL R 
                                ON U.ID_ROL = R.ID
                                WHERE U.ID_ROL = 3 AND U.RUT = V_RUT;                                      

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