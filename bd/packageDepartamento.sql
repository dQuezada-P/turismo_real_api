create or replace PACKAGE ACCIONES_DEPARTAMENTO
AS
    PROCEDURE CREAR_DEPARTAMENTO(
        V_NOMBRE IN VARCHAR2, 
        V_NUMERO_BANNO IN NUMBER, 
        V_NUMERO_HABITACION IN NUMBER,
        V_DIRECCION IN VARCHAR2,
        V_VALOR IN NUMBER,
        V_LOCALIDAD IN NUMBER,
        V_DESCRIPCION IN VARCHAR2,
        V_ESTADO_DISPONIBLE IN VARCHAR2,
        V_ESTADO_RESERVA IN VARCHAR2,
        RESULTADO OUT NUMBER,
        MSG OUT VARCHAR2);

      PROCEDURE MODIFICAR_DEPARTAMENTO(
        V_ID IN VARCHAR2, 
        V_NOMBRE IN VARCHAR2, 
        V_NUMERO_BANNO IN NUMBER, 
        V_NUMERO_HABITACION IN NUMBER,
        V_DIRECCION IN VARCHAR2,
        V_VALOR IN NUMBER,      
        V_ESTADO IN NUMBER, 
        V_LOCALIDAD IN NUMBER,
        V_DESCRIPCION IN VARCHAR2,
        V_ESTADO_DISPONIBLE IN VARCHAR2,
        V_ESTADO_RESERVA IN VARCHAR2,        
        RESULTADO OUT NUMBER,
        MSG OUT VARCHAR2);

    PROCEDURE ACTUALIZAR_IMAGENES(
        V_ID IN VARCHAR2, 
        V_IMAGENES IN CLOB,
        RESULTADO OUT NUMBER);

    PROCEDURE ELIMINAR_DEPARTAMENTO(V_ID IN VARCHAR2, RESULTADO OUT NUMBER);

    PROCEDURE VER_DEPARTAMENTOS (V_DEPTOS OUT SYS_REFCURSOR);

    PROCEDURE VER_DEPARTAMENTO (V_ID IN VARCHAR2, V_DEPTOS OUT SYS_REFCURSOR);
END;
/
create or replace PACKAGE BODY ACCIONES_DEPARTAMENTO
AS
        PROCEDURE CREAR_DEPARTAMENTO(
        V_NOMBRE IN VARCHAR2, 
        V_NUMERO_BANNO IN NUMBER, 
        V_NUMERO_HABITACION IN NUMBER,
        V_DIRECCION IN VARCHAR2, 
        V_VALOR IN NUMBER,   
        V_LOCALIDAD IN NUMBER,
        V_DESCRIPCION IN VARCHAR2,
        V_ESTADO_DISPONIBLE IN VARCHAR2,
        V_ESTADO_RESERVA IN VARCHAR2,      
        RESULTADO OUT NUMBER,
        MSG OUT VARCHAR2)
    AS
        V_ID NUMBER;
    BEGIN
        INSERT INTO DEPARTAMENTO (ID,NOMBRE,NUMERO_BANNO,NUMERO_HABITACION,DIRECCION,VALOR_ARRIENDO,ID_LOCALIDAD,DESCRIPCION,ESTADO_DISPONIBLE,ESTADO_RESERVA)
        VALUES(DEPARTAMENTO_AUTO.NEXTVAL,V_NOMBRE,V_NUMERO_BANNO,V_NUMERO_HABITACION,V_DIRECCION,V_VALOR,V_LOCALIDAD,V_DESCRIPCION,V_ESTADO_DISPONIBLE,V_ESTADO_RESERVA)
        RETURNING departamento.id INTO V_ID; 
        RESULTADO := V_ID;

        INSERT INTO INVENTARIO (ID, ID_DEPARTAMENTO, ID_PRODUCTO, CANTIDAD) 
            SELECT 
                INVENTARIO_AUTO.NEXTVAL, 
                V_ID AS ID_DEPARTAMENTO, 
                P.ID AS ID_PRODUCTO, 
                P.CANTIDAD_INICIAL 
            FROM PRODUCTO P 
            LEFT JOIN DEPARTAMENTO D 
                ON D.ID IS NULL;
                
        COMMIT;

        EXCEPTION
            WHEN OTHERS THEN
               RESULTADO:=0;
               MSG:=SQLERRM;
               ROLLBACK;
    END;
    ------------
        PROCEDURE MODIFICAR_DEPARTAMENTO(
        V_ID IN VARCHAR2, 
        V_NOMBRE IN VARCHAR2, 
        V_NUMERO_BANNO IN NUMBER, 
        V_NUMERO_HABITACION IN NUMBER,
        V_DIRECCION IN VARCHAR2,   
        V_VALOR IN NUMBER,  
        V_ESTADO IN NUMBER,
        V_LOCALIDAD IN NUMBER,
        V_DESCRIPCION IN VARCHAR2,
        V_ESTADO_DISPONIBLE IN VARCHAR2,
        V_ESTADO_RESERVA IN VARCHAR2,        
        RESULTADO OUT NUMBER,
        MSG OUT VARCHAR2)
    AS
    BEGIN
        UPDATE DEPARTAMENTO 
        SET
        NOMBRE = V_NOMBRE,
        NUMERO_BANNO = V_NUMERO_BANNO,
        NUMERO_HABITACION = V_NUMERO_HABITACION,
        DIRECCION = V_DIRECCION,
        VALOR_ARRIENDO = V_VALOR,
        ESTADO = V_ESTADO,        
        ID_LOCALIDAD = V_LOCALIDAD,
        DESCRIPCION = V_DESCRIPCION,
        ESTADO_DISPONIBLE = V_ESTADO_DISPONIBLE,
        ESTADO_RESERVA = V_ESTADO_RESERVA        
        WHERE ID = V_ID;
        RESULTADO := SQL%ROWCOUNT;
        COMMIT;

        EXCEPTION
            WHEN OTHERS THEN
               RESULTADO:=0;
                MSG:=SQLERRM;
               ROLLBACK;
    END;
    ---------------------
    PROCEDURE ACTUALIZAR_IMAGENES(
        V_ID IN VARCHAR2, 
        V_IMAGENES IN CLOB,
        RESULTADO OUT NUMBER)
        AS
        BEGIN

            UPDATE DEPARTAMENTO 
            SET
                IMAGENES = V_IMAGENES
                WHERE ID = V_ID;
                    
            RESULTADO := SQL%ROWCOUNT;
            COMMIT;

            EXCEPTION
                WHEN INVALID_NUMBER THEN
                RESULTADO:=0;
                ROLLBACK;
        END;
    ---------------------
        PROCEDURE ELIMINAR_DEPARTAMENTO(V_ID IN VARCHAR2, RESULTADO OUT NUMBER)
    AS
    BEGIN
        DELETE FROM DEPARTAMENTO WHERE ID = V_ID;
        RESULTADO := SQL%ROWCOUNT;
        COMMIT;
        EXCEPTION
            WHEN OTHERS THEN
                RESULTADO:=0;               
               ROLLBACK;
    END;
    -------------------------
        PROCEDURE VER_DEPARTAMENTOS (V_DEPTOS OUT SYS_REFCURSOR)
    AS
    BEGIN
        OPEN V_DEPTOS FOR SELECT    D.ID,
                                    D.NOMBRE,
                                    D.NUMERO_BANNO,
                                    D.NUMERO_HABITACION,
                                    D.DIRECCION,
                                    D.VALOR_ARRIENDO,
                                    D.ESTADO,
                                    D.ID_LOCALIDAD,
                                    L.NOMBRE AS "UBICACION",
                                    D.DESCRIPCION,
                                    D.ESTADO_DISPONIBLE,
                                    D.ESTADO_RESERVA,
                                    D.IMAGENES
                                    FROM DEPARTAMENTO D 
                                    JOIN LOCALIDAD L ON D.ID_LOCALIDAD = L.ID
                                    ORDER BY D.ID;                                      

    END;
    -------------------------
    PROCEDURE VER_DEPARTAMENTO (V_ID IN VARCHAR2, V_DEPTOS OUT SYS_REFCURSOR)
    AS
    BEGIN
        OPEN V_DEPTOS FOR SELECT D.ID, D.NOMBRE,
                                    D.NUMERO_BANNO,
                                    D.NUMERO_HABITACION,
                                    D.DIRECCION,
                                    D.VALOR_ARRIENDO,
                                    D.ESTADO,
                                    D.ID_LOCALIDAD,
                                    L.NOMBRE AS "UBICACION",
                                    D.DESCRIPCION ,
                                    D.ESTADO_DISPONIBLE,
                                    D.ESTADO_RESERVA,
                                    D.IMAGENES,
                                    D.ADDED_DATE,
                                    D.MODIFIED_DATE
                                    FROM DEPARTAMENTO D JOIN LOCALIDAD L ON D.ID_LOCALIDAD = L.ID WHERE D.ID = V_ID;
                                                                  

    END;
END;