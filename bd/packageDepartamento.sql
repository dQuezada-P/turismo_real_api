create or replace PACKAGE ACCIONES_DEPARTAMENTO
AS
    PROCEDURE CREAR_DEPARTAMENTO(
        V_NOMBRE IN VARCHAR2,  
        V_NUMERO_BANNO IN NUMBER, 
        V_NUMERO_HABITACION IN NUMBER,
        V_FECHA IN VARCHAR2,
        V_DIRECCION IN VARCHAR2,
        V_VALOR IN NUMBER,
        V_LOCALIDAD IN NUMBER,
        V_DESCRIPCION IN VARCHAR2,
        RESULTADO OUT NUMBER,
        MSG OUT VARCHAR2);

    PROCEDURE MODIFICAR_DEPARTAMENTO(
    V_ID IN VARCHAR2, 
    V_NOMBRE IN VARCHAR2,  
    V_NUMERO_BANNO IN NUMBER, 
    V_NUMERO_HABITACION IN NUMBER,
    -- V_FECHA IN VARCHAR2,
    V_DIRECCION IN VARCHAR2,
    V_VALOR IN NUMBER,
    V_LOCALIDAD IN NUMBER,
    V_DESCRIPCION IN VARCHAR2,
    RESULTADO OUT NUMBER);

    PROCEDURE ELIMINAR_DEPARTAMENTO(V_ID IN VARCHAR2, RESULTADO OUT NUMBER);

    PROCEDURE VER_DEPARTAMENTOS (V_DEPTOS OUT SYS_REFCURSOR);
    
    PROCEDURE VER_DEPARTAMENTO (V_ID IN VARCHAR2, V_DEPTOS OUT SYS_REFCURSOR);
END;
/
--------------------------------------------------------------------
create or replace PACKAGE BODY ACCIONES_DEPARTAMENTO
AS
        PROCEDURE CREAR_DEPARTAMENTO(
        V_NOMBRE IN VARCHAR2, 
        V_NUMERO_BANNO IN NUMBER, 
        V_NUMERO_HABITACION IN NUMBER,
        V_FECHA IN VARCHAR2,
        V_DIRECCION IN VARCHAR2,
        V_VALOR IN NUMBER,
        V_LOCALIDAD IN NUMBER,
        V_DESCRIPCION IN VARCHAR2,
        RESULTADO OUT NUMBER,
        MSG OUT VARCHAR2)
    AS
    BEGIN
        INSERT INTO DEPARTAMENTO (ID,NOMBRE,NUMERO_BANNO,NUMERO_HABITACION,FECHA_INS,DIRECCION,VALOR_ARRIENDO,ID_LOCALIDAD,DESCRIPCION) 
        VALUES(DEPARTAMENTO_AUTO.NEXTVAL,V_NOMBRE,V_NUMERO_BANNO,V_NUMERO_HABITACION,V_FECHA,V_DIRECCION,V_VALOR,V_LOCALIDAD,V_DESCRIPCION);  
        RESULTADO := SQL%ROWCOUNT;
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
        -- V_FECHA IN VARCHAR2,
        V_DIRECCION IN VARCHAR2,
        V_VALOR IN NUMBER,
        V_LOCALIDAD IN NUMBER,
        V_DESCRIPCION IN VARCHAR2,
        RESULTADO OUT NUMBER)
    AS
    BEGIN
        UPDATE DEPARTAMENTO 
        SET
        NOMBRE = V_NOMBRE,
        NUMERO_BANNO = V_NUMERO_BANNO,
        NUMERO_HABITACION = V_NUMERO_HABITACION,
        -- FECHA_INS = TO_DATE(V_FECHA,'DD-MM-YYYY HH24:MI:SS'),
        DIRECCION = V_DIRECCION,
        VALOR_ARRIENDO = V_VALOR,
        ID_LOCALIDAD = V_LOCALIDAD,
        DESCRIPCION = V_DESCRIPCION
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
                                    D.FECHA_INS,
                                    D.DIRECCION,
                                    D.VALOR_ARRIENDO,
                                    L.NOMBRE AS "UBICACION",
                                    D.DESCRIPCION 
                                    FROM DEPARTAMENTO D 
                                    JOIN LOCALIDAD L ON D.ID_LOCALIDAD = L.ID;                                      

    END;
    -------------------------
    PROCEDURE VER_DEPARTAMENTO (V_ID IN VARCHAR2, V_DEPTOS OUT SYS_REFCURSOR)
    AS
    BEGIN
        OPEN V_DEPTOS FOR SELECT    D.ID,
                                    D.NOMBRE,
                                    D.NUMERO_BANNO,
                                    D.NUMERO_HABITACION,
                                    D.FECHA_INS,
                                    D.DIRECCION,
                                    D.VALOR_ARRIENDO,
                                    L.NOMBRE AS "UBICACION",
                                    D.DESCRIPCION 
                                    FROM DEPARTAMENTO D 
                                    JOIN LOCALIDAD L ON D.ID = L.ID
                                    WHERE D.ID = V_ID;                                      

    END;
END;
