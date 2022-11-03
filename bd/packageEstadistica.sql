create or replace PACKAGE ESTADISTICA
AS
    PROCEDURE CANT_DEPTOS (V_CANT OUT NUMBER);

    PROCEDURE ANNO (
        V_ID_DEPARTAMENTO IN INT,
        V_FECHA1 IN VARCHAR2,
        V_FECHA2 IN VARCHAR2,
        V_ANNO OUT SYS_REFCURSOR);
        
    PROCEDURE REPORTE_LOCALIDAD (
        V_ID_LOCALIDAD IN INT,
        V_FECHA1 IN VARCHAR2,
        V_FECHA2 IN VARCHAR2,
        V_ANNO OUT SYS_REFCURSOR);
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
        V_ANNO OUT SYS_REFCURSOR)
    AS
        BEGIN
            OPEN V_ANNO FOR SELECT 
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
                WHERE 
                    R.FECHA_INICIO BETWEEN V_FECHA1 AND V_FECHA2
                    AND D.ID = V_ID_DEPARTAMENTO
                ORDER BY 
                    R.FECHA_INICIO ASC;
    END;
    PROCEDURE REPORTE_LOCALIDAD (
        V_ID_LOCALIDAD IN INT,
        V_FECHA1 IN VARCHAR2,
        V_FECHA2 IN VARCHAR2,
        V_ANNO OUT SYS_REFCURSOR)
    AS
        BEGIN
            OPEN V_ANNO FOR SELECT 
                D.NOMBRE,
                SUM(D.VALOR_ARRIENDO) AS TOTAL,
                L.NOMBRE AS LOCALIDAD
                FROM DEPARTAMENTO D
                JOIN 
                    RESERVA R ON D.ID = R.ID_DEPARTAMENTO 
                JOIN 
                    LOCALIDAD L ON D.ID_LOCALIDAD = L.ID
                WHERE 
                    R.FECHA_INICIO BETWEEN V_FECHA1 AND V_FECHA2
                    AND L.LOCALIDAD = V_ID_LOCALIDAD
                GROUP BY D.NOMBRE, L.NOMBRE
                ORDER BY 
                    R.FECHA_INICIO ASC;
    END;
    
END;

