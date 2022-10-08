create or replace PACKAGE ACCIONES_RESERVA
AS
    PROCEDURE CREAR_RESERVA(V_FECHA_INICIO IN TIMESTAMP,
                        V_FECHA_TERMINO IN TIMESTAMP,
                        V_CANTIDAD_PERSONA IN NUMBER,
                        V_CLIENTE IN VARCHAR2,
                        V_ID_DEPARTAMENTO IN NUMBER ,
                        V_ID_RESERVA OUT NUMBER,
                        MSG OUT VARCHAR2);
    
    
    PROCEDURE ACTUALIZAR_SERVICIO(V_ID_RESERVA IN NUMBER, V_SERVICIO IN NUMBER,RESULTADO OUT NUMBER);
    -------------------------------------------------------
    PROCEDURE ACTUALIZAR_CHECKS(ID_RESERVA IN NUMBER,RESULTADO OUT NUMBER,MSG OUT VARCHAR2);
    -------------------------------------------------------
    PROCEDURE MODIFICAR_RESERVA(ID_RESERVA IN NUMBER,
                                V_FECHA_INICIO IN TIMESTAMP,
                                V_FECHA_TERMINO IN TIMESTAMP,
                                V_CANTIDAD IN NUMBER,
                                V_ID_CLIENTE IN VARCHAR2,
                                V_ID_DEPARTAMENTO IN NUMBER,
                                V_ID_SERVICIO IN NUMBER,
                                V_ID_CHECKIN IN NUMBER,
                                V_ID_CHECKOUT IN NUMBER,
                                RESULTADO OUT NUMBER,
                                MSG OUT VARCHAR2);
    -----------------------------------------------------------
    PROCEDURE VER_RESERVA(V_ID_RESERVA IN NUMBER ,V_RESERVA OUT SYS_REFCURSOR);
    ------------------------------------------------------------
    PROCEDURE VER_RESERVAS(V_RESERVA OUT SYS_REFCURSOR);
END;
/
create or replace PACKAGE BODY ACCIONES_RESERVA
AS
    PROCEDURE CREAR_RESERVA(
    V_FECHA_INICIO IN TIMESTAMP,
    V_FECHA_TERMINO IN TIMESTAMP,
    V_CANTIDAD_PERSONA IN NUMBER,
    V_CLIENTE IN VARCHAR2,
    V_ID_DEPARTAMENTO IN NUMBER,
    V_ID_RESERVA OUT NUMBER,
    MSG OUT VARCHAR2)
    AS
    ID NUMBER;
    BEGIN
        INSERT INTO RESERVA(ID,FECHA_INICIO,FECHA_SALIDA,CANTIDAD_PERSONA,ID_CLIENTE,ID_DEPARTAMENTO) VALUES(RESERVA_AUTO.nextval,V_FECHA_INICIO,V_FECHA_TERMINO,V_CANTIDAD_PERSONA,V_CLIENTE,V_ID_DEPARTAMENTO)
        RETURNING RESERVA.ID INTO ID;
        V_ID_RESERVA := ID;
        
    COMMIT;
    EXCEPTION
        WHEN OTHERS THEN
        MSG:= SQLERRM;
        ROLLBACK;
    END;
    ------------------------------------------------------------------------------------------------------------------
    PROCEDURE ACTUALIZAR_SERVICIO(V_ID_RESERVA IN NUMBER, V_SERVICIO IN NUMBER, RESULTADO OUT NUMBER)
    AS
    BEGIN
        UPDATE RESERVA
            SET ID_SERVICIO = V_SERVICIO
            WHERE ID = V_ID_RESERVA;
            RESULTADO:= SQL%ROWCOUNT;
            COMMIT;
        EXCEPTION
            WHEN OTHERS THEN
            RESULTADO:= 0;
            ROLLBACK;
    END;
    ---------------------------------------------------------------------------------------------------------------
    PROCEDURE ACTUALIZAR_CHECKS(ID_RESERVA IN NUMBER,RESULTADO OUT NUMBER,MSG OUT VARCHAR2)
    AS
    BEGIN
    UPDATE RESERVA 
    SET ID_CHECKIN = ID_RESERVA, 
        ID_CHECKOUT = ID_RESERVA 
    WHERE ID = ID_RESERVA;
        RESULTADO:= SQL%ROWCOUNT;
        COMMIT;
    EXCEPTION
        WHEN OTHERS THEN
            MSG := SQLERRM;
            ROLLBACK;
    END;
    ------------------------------------------------------------------------------------------------------------------
    PROCEDURE MODIFICAR_RESERVA(ID_RESERVA IN NUMBER,
                                V_FECHA_INICIO IN TIMESTAMP,
                                V_FECHA_TERMINO IN TIMESTAMP,
                                V_CANTIDAD IN NUMBER,
                                V_ID_CLIENTE IN VARCHAR2,
                                V_ID_DEPARTAMENTO IN NUMBER,
                                V_ID_SERVICIO IN NUMBER,
                                V_ID_CHECKIN IN NUMBER,
                                V_ID_CHECKOUT IN NUMBER,
                                RESULTADO OUT NUMBER,
                                MSG OUT VARCHAR2)
    AS 
    BEGIN
        UPDATE RESERVA
        SET FECHA_INICIO = V_FECHA_INICIO,
        FECHA_SALIDA = V_FECHA_TERMINO,
        CANTIDAD_PERSONA = V_CANTIDAD,
        ID_CLIENTE = V_ID_CLIENTE,
        ID_DEPARTAMENTO = V_ID_DEPARTAMENTO,
        ID_SERVICIO = V_ID_SERVICIO,
        ID_CHECKIN = V_ID_CHECKIN,
        ID_CHECKOUT = V_ID_CHECKOUT
        WHERE ID = ID_RESERVA;
        RESULTADO := SQL%ROWCOUNT;
        COMMIT;
        EXCEPTION
        WHEN OTHERS THEN
            MSG := SQLERRM;
            ROLLBACK;
        
        
    END;
    -------------------------------------------------------------------------------------------
    PROCEDURE VER_RESERVA(V_ID_RESERVA IN NUMBER ,V_RESERVA OUT SYS_REFCURSOR )
    AS
    BEGIN
        OPEN V_RESERVA FOR SELECT * FROM RESERVA WHERE ID = V_ID_RESERVA;
    END;
    -------------------------------------------------------------------------------------------
    PROCEDURE VER_RESERVAS(V_RESERVA OUT SYS_REFCURSOR)
    AS
    BEGIN
        OPEN V_RESERVA FOR SELECT * FROM RESERVA ORDER BY ID;
    END;
END;