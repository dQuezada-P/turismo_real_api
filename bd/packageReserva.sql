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
    PROCEDURE GET_RESERVA(V_ID_RESERVA IN NUMBER ,V_RESERVA OUT SYS_REFCURSOR);
    ------------------------------------------------------------
    PROCEDURE GET_RESERVAS(V_RESERVA OUT SYS_REFCURSOR);
    ------------------------------------------------------------
    PROCEDURE GET_RESERVAS2(V_RESERVA OUT SYS_REFCURSOR);
    ------------------------------------------------------------
    PROCEDURE CHECKIN_RESERVA(V_ID_RESERVA IN NUMBER, V_MONTO_CANCELADO IN NUMBER, RESULTADO OUT NUMBER, MSG OUT VARCHAR2);
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
            
            INSERT INTO CHECKIN(ID) VALUES(ID);
            INSERT INTO CHECKOUT(ID) VALUES(ID);
            INSERT INTO PAGO(ID) VALUES(ID);
            
            UPDATE RESERVA 
            SET ID_CHECKIN = ID, 
            ID_CHECKOUT = ID,
            ID_PAGO = ID
            WHERE ID = ID;
            
            UPDATE PAGO
            SET ABONO = V_ABONO
            WHERE ID = V_ID_RESERVA;
            
            UPDATE DEPARTAMENTO
            SET ESTADO_RESERVA = 'N'
            WHERE ID = V_ID_DEPARTAMENTO;
            
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
    PROCEDURE GET_RESERVA(V_ID_RESERVA IN NUMBER ,V_RESERVA OUT SYS_REFCURSOR )
        AS
        BEGIN
            OPEN V_RESERVA FOR 
            SELECT 
                R.ID,
                D.ID DEPARTAMENTO__ID,
                D.NOMBRE DEPARTAMENTO__NOMBRE,
                D.VALOR_ARRIENDO DEPARTAMENTO__VALOR_ARRIENDO,
                R.FECHA_INICIO,
                R.DIAS,
                R.CANTIDAD_PERSONA,
                U.NOMBRE CLIENTE__NOMBRE,
                U.APELLIDO CLIENTE__APELLIDO,
                U.RUT CLIENTE__RUT,
                U.CORREO CLIENTE__CORREO,
                U.TELEFONO CLIENTE__TELEFONO,
                P.ABONO PAGO__ABONO,
                P.PAGO_TOTAL PAGO__PAGO_TOTAL,
                P.PAGO_INCONVENIENTE PAGO__PAGO_INCONVENIENTE
            FROM RESERVA R
            JOIN USUARIO U
                ON R.ID_CLIENTE = U.ID
            JOIN DEPARTAMENTO D
                ON R.ID_DEPARTAMENTO = D.ID
            JOIN PAGO P
                ON R.ID_PAGO = P.ID
            WHERE R.ID = V_ID_RESERVA
            ORDER BY ID;
        END;
    -------------------------------------------------------------------------------------------
    PROCEDURE GET_RESERVAS(V_RESERVA OUT SYS_REFCURSOR)
        AS
        BEGIN
            OPEN V_RESERVA FOR 
            SELECT * 
            FROM RESERVA R
            ORDER BY ID;
        END;

    -------------------------------------------------------------------------------------------
    PROCEDURE GET_RESERVAS2(V_RESERVA OUT SYS_REFCURSOR)
        AS
        BEGIN
            OPEN V_RESERVA FOR 
            SELECT 
                R.ID,
                D.NOMBRE DEPARTAMENTO__NOMBRE,
                R.FECHA_INICIO,
                R.DIAS,
                R.CANTIDAD_PERSONA,
                U.NOMBRE CLIENTE__NOMBRE,
                U.APELLIDO CLIENTE__APELLIDO,
                U.RUT CLIENTE__RUT,
                U.CORREO CLIENTE__CORREO,
                P.ABONO
            FROM RESERVA R
            JOIN USUARIO U
                ON R.ID_CLIENTE = U.ID
            JOIN DEPARTAMENTO D
                ON R.ID_DEPARTAMENTO = D.ID
            JOIN PAGO P
                ON R.ID_PAGO = P.ID
            ORDER BY ID;
        END;
    -------------------------------------------------------------------------------------------
    
    PROCEDURE CHECKIN_RESERVA(V_ID_RESERVA IN NUMBER, V_MONTO_CANCELADO IN NUMBER, RESULTADO OUT NUMBER, MSG OUT VARCHAR2)
        AS
        BEGIN
            UPDATE CHECKIN
            SET PAGO_COMPLETADO = 1
            WHERE ID = V_ID_RESERVA;

            UPDATE PAGO
            SET PAGO_TOTAL = V_MONTO_CANCELADO
            WHERE ID = V_ID_RESERVA;

            RESULTADO := SQL%ROWCOUNT;
            COMMIT;

            EXCEPTION
                WHEN OTHERS THEN
                RESULTADO:=0;
                MSG:=SQLERRM;
                ROLLBACK;

        END;
END;