create or replace PACKAGE ACCIONES_RESERVA
AS
    PROCEDURE CREAR_RESERVA(V_FECHA_INICIO IN VARCHAR2,
                        V_DIAS IN NUMBER,
                        V_CANTIDAD_PERSONA IN NUMBER,
                        V_CLIENTE IN VARCHAR2,
                        V_ID_DEPARTAMENTO IN NUMBER,
                        V_ABONO IN NUMBER,
                        V_ID_RESERVA OUT NUMBER,
                        MSG OUT VARCHAR2);
    -------------------------------------------------------
    PROCEDURE MODIFICAR_RESERVA(ID_RESERVA IN NUMBER,
                                V_FECHA_INICIO IN DATE,
                                V_DIAS IN NUMBER,
                                V_CANTIDAD IN NUMBER,
                                V_ID_CLIENTE IN VARCHAR2,
                                V_ID_DEPARTAMENTO IN NUMBER,
                                V_ID_CHECKIN IN NUMBER,
                                V_ID_CHECKOUT IN NUMBER,
                                V_PAGO IN NUMBER,
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
                        V_FECHA_INICIO IN VARCHAR2,
                        V_DIAS IN NUMBER,
                        V_CANTIDAD_PERSONA IN NUMBER,
                        V_CLIENTE IN VARCHAR2,
                        V_ID_DEPARTAMENTO IN NUMBER,
                        V_ABONO IN NUMBER,
                        V_ID_RESERVA OUT NUMBER,
                        MSG OUT VARCHAR2)
    AS
    ID NUMBER;
    BEGIN
        INSERT INTO RESERVA(ID,FECHA_INICIO,DIAS,CANTIDAD_PERSONA,ID_CLIENTE,ID_DEPARTAMENTO) VALUES(RESERVA_AUTO.nextval,TO_DATE(V_FECHA_INICIO,'DD/MM/YYYY'),V_DIAS,V_CANTIDAD_PERSONA,V_CLIENTE,V_ID_DEPARTAMENTO)
        RETURNING RESERVA.ID INTO ID;
        V_ID_RESERVA := ID;
        
        UPDATE RESERVA 
        SET ID_CHECKIN = ID, 
        ID_CHECKOUT = ID,
        ID_PAGO = ID
        WHERE ID = ID;
        
        UPDATE PAGO
        SET ABONO = V_ABONO
        WHERE ID = V_ID_RESERVA;
        
    COMMIT;
    
    EXCEPTION
        WHEN OTHERS THEN
        MSG:= SQLERRM;
        ROLLBACK;
    END;
    ------------------------------------------------------------------------------------------------------------------
    PROCEDURE MODIFICAR_RESERVA(ID_RESERVA IN NUMBER,
                                V_FECHA_INICIO IN DATE,
                                V_DIAS IN NUMBER,
                                V_CANTIDAD IN NUMBER,
                                V_ID_CLIENTE IN VARCHAR2,
                                V_ID_DEPARTAMENTO IN NUMBER,
                                V_ID_CHECKIN IN NUMBER,
                                V_ID_CHECKOUT IN NUMBER,
                                V_PAGO IN NUMBER,
                                RESULTADO OUT NUMBER,
                                MSG OUT VARCHAR2)
    AS 
    BEGIN
        UPDATE RESERVA
        SET FECHA_INICIO = V_FECHA_INICIO,
        DIAS = V_DIAS,
        CANTIDAD_PERSONA = V_CANTIDAD,
        ID_CLIENTE = V_ID_CLIENTE,
        ID_DEPARTAMENTO = V_ID_DEPARTAMENTO,
        ID_CHECKIN = V_ID_CHECKIN,
        ID_CHECKOUT = V_ID_CHECKOUT,
        ID_PAGO = V_PAGO
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