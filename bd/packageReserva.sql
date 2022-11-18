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
    -----------------------------------------------------------
    PROCEDURE GET_RESERVA(V_ID_RESERVA IN NUMBER ,V_RESERVA OUT SYS_REFCURSOR);
    ------------------------------------------------------------
    PROCEDURE GET_RESERVAS(V_RESERVA OUT SYS_REFCURSOR);
    ------------------------------------------------------------
    PROCEDURE GET_RESERVAS2(V_RESERVA OUT SYS_REFCURSOR);
    ------------------------------------------------------------
    PROCEDURE GET_RESERVAS_BY_USER(V_USER_ID IN NUMBER, V_RESERVAS OUT SYS_REFCURSOR);
    ------------------------------------------------------------
    PROCEDURE CHECKIN_RESERVA(V_ID_RESERVA IN NUMBER, V_MONTO_CANCELADO IN NUMBER, RESULTADO OUT NUMBER, MSG OUT VARCHAR2);
    ------------------------------------------------------------
    PROCEDURE CHECKOUT_RESERVA(V_ID_RESERVA IN NUMBER, V_MONTO_CANCELADO IN NUMBER, RESULTADO OUT NUMBER, MSG OUT VARCHAR2);
    -------------------------------------------------------------------------------------------
    PROCEDURE GET_SERVICES_BY_RESERVA(V_RESERVA_ID IN NUMBER, V_SERVICES OUT SYS_REFCURSOR);
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
   
    -------------------------------------------------------------------------------------------
    PROCEDURE GET_RESERVA(V_ID_RESERVA IN NUMBER ,V_RESERVA OUT SYS_REFCURSOR )
        AS
        BEGIN
            OPEN V_RESERVA FOR 
            SELECT 
                R.ID,
                D.ID DEPARTAMENTO__ID,
                D.NOMBRE DEPARTAMENTO__NOMBRE,
                L.NOMBRE AS DEPARTAMENTO__UBICACION,
                D.VALOR_ARRIENDO DEPARTAMENTO__VALOR_ARRIENDO,
                R.FECHA_INICIO,
                R.DIAS,
                R.CANTIDAD_PERSONA,
                R.ESTADO,
                CASE R.ESTADO
                    WHEN 0 THEN 'RESERVADO'
                    WHEN 1 THEN 'CHECKIN'
                    WHEN 2 THEN 'CHECKOUT S/INCIDENTES'
                    WHEN 3 THEN 'CHECKOUT C/INCIDENTES'
                END ESTADO_DESC,
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
                ON R.ID = P.ID
            JOIN LOCALIDAD L
                ON D.ID_LOCALIDAD = L.ID
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
                R.ESTADO,
                CASE R.ESTADO
                    WHEN 0 THEN 'RESERVADO'
                    WHEN 1 THEN 'CHECKIN'
                    WHEN 2 THEN 'CHECKOUT S/INCIDENTES'
                    WHEN 3 THEN 'CHECKOUT C/INCIDENTES'
                END ESTADO_DESC,
                D.ID DEPARTAMENTO__ID,
                D.NOMBRE DEPARTAMENTO__NOMBRE,
                R.FECHA_INICIO,
                R.DIAS,
                R.CANTIDAD_PERSONA,
                U.NOMBRE CLIENTE__NOMBRE,
                U.APELLIDO CLIENTE__APELLIDO,
                U.RUT CLIENTE__RUT,
                U.CORREO CLIENTE__CORREO
            FROM RESERVA R
            JOIN USUARIO U
                ON R.ID_CLIENTE = U.ID
            JOIN DEPARTAMENTO D
                ON R.ID_DEPARTAMENTO = D.ID
            JOIN PAGO P
                ON R.ID = P.ID
            ORDER BY ID;
        END;
    -------------------------------------------------------------------------------------------
    PROCEDURE GET_RESERVAS_BY_USER(V_USER_ID IN NUMBER, V_RESERVAS OUT SYS_REFCURSOR)
        AS
        BEGIN
            OPEN V_RESERVAS FOR 
            SELECT 
                R.ID,
                R.ESTADO,
                CASE R.ESTADO
                    WHEN 0 THEN 'RESERVADO'
                    WHEN 1 THEN 'CHECKIN'
                    WHEN 2 THEN 'CHECKOUT S/INCIDENTES'
                    WHEN 3 THEN 'CHECKOUT C/INCIDENTES'
                END ESTADO_DESC,
                D.ID DEPARTAMENTO__ID,
                D.NOMBRE DEPARTAMENTO__NOMBRE,
                R.FECHA_INICIO,
                R.DIAS,
                R.CANTIDAD_PERSONA,
                R.TOTAL_RESERVA
            FROM RESERVA R
            JOIN USUARIO U
                ON R.ID_CLIENTE = U.ID
            JOIN DEPARTAMENTO D
                ON R.ID_DEPARTAMENTO = D.ID
            JOIN PAGO P
                ON R.ID = P.ID
            WHERE U.ID = V_USER_ID
            ORDER BY TO_DATE(R.FECHA_INICIO, 'DD/MM/YYYY') DESC;
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

            UPDATE RESERVA
                SET ESTADO = 1
                WHERE ID = V_ID_RESERVA;

            RESULTADO := SQL%ROWCOUNT;
            COMMIT;

            EXCEPTION
                WHEN OTHERS THEN
                RESULTADO:=0;
                MSG:=SQLERRM;
                ROLLBACK;

        END;
    -------------------------------------------------------------------------------------------
    PROCEDURE CHECKOUT_RESERVA(V_ID_RESERVA IN NUMBER, V_MONTO_CANCELADO IN NUMBER, RESULTADO OUT NUMBER, MSG OUT VARCHAR2)
        AS
        BEGIN
            UPDATE CHECKOUT
            SET  ESTADO = 1
            WHERE ID = V_ID_RESERVA;

            IF V_MONTO_CANCELADO > 0 THEN
                UPDATE PAGO
                SET PAGO_INCONVENIENTE = V_MONTO_CANCELADO
                WHERE ID = V_ID_RESERVA;

                UPDATE CHECKOUT
                SET INCONVENIENTES = 1
                WHERE ID = V_ID_RESERVA;

                -- RESERVA FINALIZADA CON INCIDENTES
                UPDATE RESERVA
                SET ESTADO = 3 
                WHERE ID = V_ID_RESERVA;
            ELSE
                -- RESERVA FINALIZADA SIN INCIDENTES
                UPDATE RESERVA
                SET ESTADO = 2
                WHERE ID = V_ID_RESERVA;
            END IF;
            RESULTADO := SQL%ROWCOUNT;
            COMMIT;

            EXCEPTION
                WHEN OTHERS THEN
                RESULTADO:=0;
                MSG:=SQLERRM;
                ROLLBACK;

        END;
    -------------------------------------------------------------------------------------------
    PROCEDURE GET_SERVICES_BY_RESERVA(V_RESERVA_ID IN NUMBER, V_SERVICES OUT SYS_REFCURSOR)
            AS
            BEGIN
                OPEN V_SERVICES FOR 
                    SELECT 
                      CASE 
                        WHEN ID_TRANSPORTE IS NOT NULL THEN 'TRANSPORTE'
                        ELSE 'TOUR'
                      END AS TIPO_SERVICIO,
                      CASE 
                        WHEN ID_TRANSPORTE IS NOT NULL THEN TE.NOMBRE
                        ELSE TOU.DESCRIPCION
                      END AS NOMBRE,
                      CASE 
                        WHEN ID_TRANSPORTE IS NOT NULL THEN TR.PRECIO
                        ELSE TOU.PRECIO
                      END AS VALOR
                    FROM SERVICIO S 
                    LEFT JOIN TRANSPORTE TR
                      ON S.ID_TRANSPORTE = TR.ID
                    LEFT JOIN TERMINAL TE
                      ON TR.ID_TERMINAL = TE.ID
                    LEFT JOIN TOUR TOU
                      ON S.ID_TOUR = TOU.ID
                    WHERE ID_RESERVA = V_RESERVA_ID
                    ORDER BY TIPO_SERVICIO ASC;
            END;
    
END;