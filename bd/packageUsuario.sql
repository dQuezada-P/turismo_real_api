create or replace PACKAGE ACCIONES_USUARIO
AS
    PROCEDURE CREAR_USUARIO(
        V_RUT IN VARCHAR2, 
        V_NOMBRE IN VARCHAR2, 
        V_APELLIDO IN VARCHAR2, 
        V_CORREO IN VARCHAR2, 
        V_DIRECCION IN VARCHAR2,
        V_TELEFONO IN VARCHAR2,
        V_PASS IN VARCHAR2,
        V_ROL IN NUMBER,
        RESULTADO OUT NUMBER,
        MSG OUT VARCHAR2);

    PROCEDURE ACTUALIZAR_IMAGENES(
        V_ID IN VARCHAR2, 
        V_IMAGEN IN CLOB,
        RESULTADO OUT NUMBER);
        
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
    
    PROCEDURE GET_USUARIOS ( V_USERS OUT SYS_REFCURSOR );

    PROCEDURE GET_CLIENTES ( V_USERS OUT SYS_REFCURSOR );

    PROCEDURE GET_EMPLEADOS ( V_USERS OUT SYS_REFCURSOR );

    PROCEDURE GET_CONDUCTORES (V_USERS OUT SYS_REFCURSOR);

    PROCEDURE VER_USUARIO_ADMINISTRADOR (V_USERS OUT SYS_REFCURSOR);

    PROCEDURE VER_USUARIOS_CLIENTE (V_USERS OUT SYS_REFCURSOR);

    PROCEDURE GET_USUARIO ( V_RUT IN VARCHAR2, V_USERS OUT SYS_REFCURSOR );

    PROCEDURE GET_USUARIO_BY_ID ( V_ID IN VARCHAR2, V_USERS OUT SYS_REFCURSOR );

    PROCEDURE VER_USUARIO_FUNCIONARIO (V_USERS OUT SYS_REFCURSOR);

    PROCEDURE AUTH_USUARIO (V_USERNAME IN VARCHAR2 ,V_USER OUT SYS_REFCURSOR, MSG OUT VARCHAR2);

    PROCEDURE CONFIRMAR_USUARIO (V_ID IN NUMBER, V_EXIST OUT NUMBER, MSG OUT VARCHAR2);
END;
/
create or replace PACKAGE BODY ACCIONES_USUARIO
AS
    PROCEDURE CONFIRMAR_USUARIO (V_ID IN NUMBER, V_EXIST OUT NUMBER, MSG OUT VARCHAR2)
        AS
            VAL NUMBER := 0;
        BEGIN
            SELECT ID INTO VAL FROM USUARIO WHERE ID = V_ID;

            IF VAL = 0 THEN 
                V_EXIST := 0;
            ELSE 
                V_EXIST := 1;
                UPDATE USUARIO SET ESTADO = 1 WHERE ID = V_ID;
                MSG := 'EXISTE ' || SQL%ROWCOUNT ;
            END IF;

            COMMIT;

            EXCEPTION
                WHEN OTHERS THEN
                V_EXIST:=0;
                MSG:=SQLERRM;
                ROLLBACK;
        END;
    --------
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
                                    U.ID,
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
                                    U.ID,
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
        V_DIRECCION IN VARCHAR2,
        V_TELEFONO IN VARCHAR2,
        V_PASS IN VARCHAR2,
        V_ROL IN NUMBER,
        RESULTADO OUT NUMBER,
        MSG OUT VARCHAR2)
        AS
            V_ID NUMBER;
        BEGIN
            INSERT INTO USUARIO (ID, RUT, NOMBRE, APELLIDO, CORREO, DIRECCION, TELEFONO, PASS, ID_ROL) VALUES(USUARIO_AUTO.NEXTVAL,V_RUT,V_NOMBRE,V_APELLIDO,V_CORREO,V_DIRECCION,V_TELEFONO,V_PASS,V_ROL)
            RETURNING USUARIO.ID INTO V_ID;   
            RESULTADO := V_ID;
            COMMIT;

            EXCEPTION
                WHEN OTHERS THEN
                RESULTADO:=0;
                MSG:=SQLERRM;
                ROLLBACK;
        END;


    -----------------
    PROCEDURE ACTUALIZAR_IMAGENES(
        V_ID IN VARCHAR2, 
        V_IMAGEN IN CLOB,
        RESULTADO OUT NUMBER)
        AS
        BEGIN
            UPDATE USUARIO 
            SET
                IMAGEN = V_IMAGEN
                WHERE ID = V_ID;
                    
            RESULTADO := SQL%ROWCOUNT;
            COMMIT;

            EXCEPTION
                WHEN INVALID_NUMBER THEN
                RESULTADO:=0;
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

    PROCEDURE GET_USUARIOS ( V_USERS OUT SYS_REFCURSOR )
    AS
    BEGIN
        OPEN V_USERS FOR SELECT 
                                U.ID,
                                U.RUT,
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
                                ORDER BY U.ID;                                      

    END;
    ------
    PROCEDURE GET_CLIENTES ( V_USERS OUT SYS_REFCURSOR )
    AS
    BEGIN
        OPEN V_USERS FOR SELECT 
                                U.ID,
                                U.RUT,
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
                                WHERE U.ID_ROL = 3
                                ORDER BY U.ID;                                      

    END;
    ------
    PROCEDURE GET_EMPLEADOS ( V_USERS OUT SYS_REFCURSOR )
    AS
    BEGIN
        OPEN V_USERS FOR SELECT 
                                U.ID,
                                U.RUT,
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
                                WHERE U.ID_ROL != 3
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
    PROCEDURE GET_USUARIO ( V_RUT IN VARCHAR2, V_USERS OUT SYS_REFCURSOR )
    AS
    BEGIN
        OPEN V_USERS FOR SELECT 
                                U.ID,
                                U.RUT,
                                U.NOMBRE,
                                U.APELLIDO,
                                U.CORREO,
                                U.IMAGEN,
                                U.ESTADO,
                                U.DIRECCION,
                                U.TELEFONO,
                                U.ID_ROL,
                                R.CARGO
                                FROM USUARIO U
                                JOIN ROL R 
                                ON U.ID_ROL = R.ID
                                WHERE U.RUT = V_RUT;                                      

    END;
    -------
    PROCEDURE GET_USUARIO_BY_ID ( V_ID IN VARCHAR2, V_USERS OUT SYS_REFCURSOR )
        AS
        BEGIN
            OPEN V_USERS FOR SELECT 
                                    U.ID,
                                    U.RUT,
                                    U.NOMBRE,
                                    U.APELLIDO,
                                    U.CORREO,
                                    U.IMAGEN,
                                    U.ESTADO,
                                    U.DIRECCION,
                                    U.TELEFONO,
                                    U.ID_ROL,
                                    R.CARGO
                                    FROM USUARIO U
                                    JOIN ROL R 
                                    ON U.ID_ROL = R.ID
                                    WHERE U.ID = V_ID;                                      

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