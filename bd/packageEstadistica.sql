create or replace PACKAGE ESTADISTICA
AS
    PROCEDURE CANT_DEPTOS (V_CANT OUT NUMBER);

    PROCEDURE REPORTE_DEPARTAMENTO (
        V_ID_DEPARTAMENTO IN INT,
        V_FECHA1 IN VARCHAR2,
        V_FECHA2 IN VARCHAR2,
        V_DEPARTAMENTO OUT SYS_REFCURSOR);
        
    PROCEDURE REPORTE_LOCALIDAD (
        V_ID_LOCALIDAD IN INT,
        V_FECHA1 IN VARCHAR2,
        V_FECHA2 IN VARCHAR2,
        V_LOCALIDAD OUT SYS_REFCURSOR);
END;


/
create or replace PACKAGE BODY ESTADISTICA
AS
    PROCEDURE CANT_DEPTOS (V_CANT OUT NUMBER)
    AS
    BEGIN
        SELECT COUNT(*) INTO V_CANT FROM DEPARTAMENTO;
    END;
    
    PROCEDURE REPORTE_DEPARTAMENTO (
        V_ID_DEPARTAMENTO IN INT,
        V_FECHA1 IN VARCHAR2,
        V_FECHA2 IN VARCHAR2,
        V_DEPARTAMENTO OUT SYS_REFCURSOR)
    AS
        BEGIN
            OPEN V_DEPARTAMENTO FOR SELECT 
                D.ID,
                D.NOMBRE,
                R.FECHA_INICIO AS "FECHA",
                R.DIAS,
                R.CANTIDAD_PERSONA,
                D.VALOR_ARRIENDO AS TOTAL,
                L.NOMBRE AS LOCALIDAD
                FROM DEPARTAMENTO D
                JOIN 
                    RESERVA R ON D.ID = R.ID_DEPARTAMENTO 
                JOIN 
                    LOCALIDAD L ON D.ID_LOCALIDAD = L.ID
                JOIN
                    PAGO P ON R.ID_PAGO = P.ID
                WHERE 
                    R.FECHA_INICIO BETWEEN V_FECHA1 AND V_FECHA2
                    AND D.ID = V_ID_DEPARTAMENTO
                    AND R.ESTADO = 1
                ORDER BY 
                    R.FECHA_INICIO ASC;
    END;
    PROCEDURE REPORTE_LOCALIDAD (
        V_ID_LOCALIDAD IN INT,
        V_FECHA1 IN VARCHAR2,
        V_FECHA2 IN VARCHAR2,
        V_LOCALIDAD OUT SYS_REFCURSOR)
    AS
        BEGIN
            OPEN V_LOCALIDAD FOR SELECT 
                D.NOMBRE,
                SUM(P.ABONO + P.PAGO_TOTAL + P.PAGO_INCONVENIENTE) AS TOTAL,
                R.FECHA_INICIO,
                L.NOMBRE AS LOCALIDAD
                FROM DEPARTAMENTO D
                JOIN 
                    RESERVA R ON D.ID = R.ID_DEPARTAMENTO 
                JOIN 
                    LOCALIDAD L ON D.ID_LOCALIDAD = L.ID
                JOIN
                    PAGO P ON R.ID_PAGO = P.ID
                WHERE 
                    TO_DATE(R.FECHA_INICIO, 'DD/MM/YYYY') BETWEEN  TO_DATE(V_FECHA1, 'DD/MM/YYYY') AND  TO_DATE(V_FECHA2, 'DD/MM/YYYY')                     
                    AND L.ID = V_ID_LOCALIDAD
                    AND R.ESTADO = 1
                GROUP BY D.NOMBRE, L.NOMBRE, R.FECHA_INICIO
                ORDER BY 
                    R.FECHA_INICIO ASC;
    END;
    
END;