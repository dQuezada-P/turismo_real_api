create or replace PACKAGE ACCIONES_USUARIO
AS
    PROCEDURE CREAR_USUARIO(
        V_RUT IN VARCHAR2, 
        V_NOMBRE IN VARCHAR2, 
        V_APELLIDO IN VARCHAR2, 
        V_CORREO IN VARCHAR2, 
        V_ESTADO IN NUMBER,
        V_DIRECCION IN VARCHAR2,
        V_TELEFONO IN VARCHAR2,
        V_PASS IN VARCHAR2,
        V_ROL IN NUMBER,
        RESULTADO OUT NUMBER,
        MSG OUT VARCHAR2);
        
    PROCEDURE CREAR_CONDUCTOR(V_ID_USUARIO IN VARCHAR2,     
                        V_VEHICULO IN VARCHAR2,
                        V_PATENTE IN VARCHAR2,
                        V_ID_LOCALIDAD IN NUMBER,
                        RESULTADO OUT NUMBER,
                        MSG OUT VARCHAR2);

    PROCEDURE MODIFICAR_USUARIO(
        V_RUT IN VARCHAR2,
        V_NOMBRE IN VARCHAR2, 
        V_APELLIDO IN VARCHAR2, 
        V_CORREO IN VARCHAR2, 
        V_ESTADO IN NUMBER,
        V_DIRECCION IN VARCHAR2,
        V_TELEFONO IN VARCHAR2,
        RESULTADO OUT NUMBER,
        MSG OUT VARCHAR2);
        
    PROCEDURE MODIFICAR_CONDUCTOR(V_ID_CONDUCTOR IN NUMBER,
                            V_ID_USUARIO IN VARCHAR2 ,     
                            V_VEHICULO IN VARCHAR2,
                            V_PATENTE IN VARCHAR2,
                            V_ID_LOCALIDAD IN NUMBER,
                            RESULTADO OUT NUMBER,
                            MSG OUT VARCHAR2);
                            
    PROCEDURE ELIMINAR_USUARIO(V_RUT IN VARCHAR2, RESULTADO OUT NUMBER);

    PROCEDURE ELIMINAR_CONDUCTOR(V_ID_CONDUCTOR IN VARCHAR2, RESULTADO OUT NUMBER);
    
    PROCEDURE GET_USUARIOS ( V_ID_ROL IN NUMBER, V_USERS OUT SYS_REFCURSOR );

    PROCEDURE GET_CONDUCTORES (V_USERS OUT SYS_REFCURSOR);

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
            OPEN V_USER FOR SELECT 
                                U.RUT,
                                U.NOMBRE,
                                U.APELLIDO,
                                U.IMAGEN,
                                U.CORREO,
                                U.ESTADO,
                                U.DIRECCION,
                                U.TELEFONO,
                                U.PASS,
                                U.ID_ROL,
                                R.CARGO
                                FROM USUARIO U
                                JOIN ROL R 
                                ON U.ID_ROL = R.ID
                                WHERE U.CORREO = V_USERNAME;
        ELSE
            OPEN C_RUT;
            FETCH C_RUT INTO C;  

            COUNT_ROW := C_RUT%ROWCOUNT;
            CLOSE C_RUT;

            IF COUNT_ROW > 0 THEN
                OPEN V_USER FOR SELECT 
                                U.RUT,
                                U.NOMBRE,
                                U.APELLIDO,
                                U.IMAGEN,
                                U.CORREO,
                                U.ESTADO,
                                U.DIRECCION,
                                U.TELEFONO,
                                U.PASS,
                                U.ID_ROL,
                                R.CARGO
                                FROM USUARIO U
                                JOIN ROL R  
                                ON U.ID_ROL = R.ID
                                WHERE U.RUT = V_USERNAME;
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
    V_ESTADO IN NUMBER,
    V_DIRECCION IN VARCHAR2,
    V_TELEFONO IN VARCHAR2,
    V_PASS IN VARCHAR2,
    V_ROL IN NUMBER,
    RESULTADO OUT NUMBER,
    MSG OUT VARCHAR2)
    AS
    BEGIN
        INSERT INTO USUARIO VALUES(USUARIO_AUTO.NEXTVAL,V_RUT,V_NOMBRE,V_APELLIDO,'',V_CORREO,V_ESTADO,V_DIRECCION,V_TELEFONO,V_PASS,V_ROL);  
        RESULTADO := SQL%ROWCOUNT;
        COMMIT;

        EXCEPTION
            WHEN OTHERS THEN
               RESULTADO:=0;
               MSG:=SQLERRM;
               ROLLBACK;
    END;
    -----------------
    PROCEDURE CREAR_CONDUCTOR(V_ID_USUARIO IN VARCHAR2 ,     
                            V_VEHICULO IN VARCHAR2,
                            V_PATENTE IN VARCHAR2,
                            V_ID_LOCALIDAD IN NUMBER,
                            RESULTADO OUT NUMBER,
                            MSG OUT VARCHAR2)
    AS
    BEGIN
    INSERT INTO CONDUCTOR VALUES(CONDUCTOR_AUTO.nextval,V_ID_USUARIO,V_VEHICULO,V_PATENTE,V_ID_LOCALIDAD);
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
        V_ESTADO IN NUMBER,
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
            ESTADO = V_ESTADO,
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
    PROCEDURE MODIFICAR_CONDUCTOR(V_ID_CONDUCTOR IN NUMBER,
                            V_ID_USUARIO IN VARCHAR2 ,     
                            V_VEHICULO IN VARCHAR2,
                            V_PATENTE IN VARCHAR2,
                            V_ID_LOCALIDAD IN NUMBER,
                            RESULTADO OUT NUMBER,
                            MSG OUT VARCHAR2)
        AS
        BEGIN
        UPDATE CONDUCTOR
        SET ID_USUARIO = V_ID_USUARIO,
        VEHICULO = V_VEHICULO,
        PATENTE = V_PATENTE,
        ID_LOCALIDAD = V_ID_LOCALIDAD
        WHERE ID = V_ID_CONDUCTOR;
        RESULTADO := SQL%ROWCOUNT;
        COMMIT;

        EXCEPTION
            WHEN OTHERS THEN
               RESULTADO:=0;
               MSG:=SQLERRM;
               ROLLBACK;
        END;
    
-------------------------------
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
    PROCEDURE ELIMINAR_CONDUCTOR(V_ID_CONDUCTOR IN VARCHAR2, RESULTADO OUT NUMBER)
        AS
    BEGIN
        DELETE FROM CONDUCTOR WHERE ID = V_ID_CONDUCTOR;
        RESULTADO := SQL%ROWCOUNT;
        COMMIT;
        EXCEPTION
            WHEN OTHERS THEN
               RESULTADO:=0;
               ROLLBACK;
    END;
    ------------
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
                                R.CARGO
                                FROM USUARIO U
                                JOIN ROL R 
                                ON U.ID_ROL = R.ID
                                WHERE U.ID_ROL = 3;                                      

    END;

    PROCEDURE GET_USUARIOS ( V_ID_ROL IN NUMBER, V_USERS OUT SYS_REFCURSOR )
    AS
    BEGIN
        OPEN V_USERS FOR SELECT U.RUT,
                                U.NOMBRE,
                                U.APELLIDO,
                                U.CORREO,
                                U.ESTADO,
                                U.DIRECCION,
                                U.TELEFONO,
                                R.CARGO
                                FROM USUARIO U
                                JOIN ROL R 
                                ON U.ID_ROL = R.ID
                                WHERE U.ID_ROL = V_ID_ROL
                                ORDER BY U.ID;                                      

    END;
    ------
    PROCEDURE GET_CONDUCTORES (V_USERS OUT SYS_REFCURSOR)
    AS
    BEGIN
        OPEN V_USERS FOR SELECT *
                        FROM CONDUCTOR C
                        ORDER BY C.ID_USUARIO; 

    END;
    ------
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
                                R.CARGO
                                FROM USUARIO U
                                JOIN ROL R 
                                ON U.ID_ROL = R.ID
                                WHERE U.ID_ROL = 1; 

    END;
    
    ------
    PROCEDURE VER_USUARIO_CLIENTE ( V_RUT IN VARCHAR2, V_USERS OUT SYS_REFCURSOR )
    AS
    BEGIN
        OPEN V_USERS FOR SELECT U.RUT,
                                U.NOMBRE,
                                U.APELLIDO,
                                U.CORREO,
                                U.IMAGEN,
                                U.ESTADO,
                                U.DIRECCION,
                                U.TELEFONO
                                FROM USUARIO U
                                JOIN ROL R 
                                ON U.ID_ROL = R.ID
                                WHERE U.RUT = V_RUT;                                      

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
                                R.CARGO
                                FROM USUARIO U
                                JOIN ROL R 
                                ON U.ID_ROL = R.ID
                                WHERE U.ID_ROL = 2;                                      

    END;
END;