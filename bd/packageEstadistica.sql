create or replace PACKAGE ESTADISTICA
AS
    PROCEDURE CANT_DEPTOS (V_CANT OUT NUMBER);

    PROCEDURE ANNO (
        V_FECHA1 IN VARCHAR2,
        V_FECHA2 IN VARCHAR2,
        V_ANNO OUT SYS_REFCURSOR);
    
    PROCEDURE FILTRO_ANNO (       
        V_FILTRO_ANNO OUT SYS_REFCURSOR);
END;


/
create or replace PACKAGE BODY ESTADISTICA
AS
    PROCEDURE CANT_DEPTOS (V_CANT OUT NUMBER)
    AS
    BEGIN
        SELECT COUNT(*) INTO V_CANT FROM DEPARTAMENTO;
    END;
    
    PROCEDURE ANNO (
        V_FECHA1 IN VARCHAR2,
        V_FECHA2 IN VARCHAR2,
        V_ANNO OUT SYS_REFCURSOR)
    AS
        BEGIN
            OPEN V_ANNO FOR SELECT 
                D.ID,
                D.NOMBRE,
                R.FECHA_INICIO AS "FECHA",
                SUM(D.VALOR_ARRIENDO) AS TOTAL,
                L.NOMBRE AS LOCALIDAD
                FROM DEPARTAMENTO D
                JOIN 
                    RESERVA R ON D.ID = R.ID_DEPARTAMENTO 
                JOIN 
                    LOCALIDAD L ON D.ID_LOCALIDAD = L.ID
                WHERE 
                    R.FECHA_INICIO BETWEEN V_FECHA1 AND V_FECHA2
                   
                GROUP BY
                    D.ID, D.NOMBRE, R.FECHA_INICIO, L.NOMBRE
                ORDER BY 
                    R.FECHA_INICIO ASC;
    END;

    PROCEDURE FILTRO_ANNO (
        V_FILTRO_ANNO OUT SYS_REFCURSOR)
    AS
        BEGIN
            OPEN V_FILTRO_ANNO FOR SELECT 
                D.ID,
                D.NOMBRE,
                COUNT(D.NOMBRE) AS "CANT RESERVAS",                
                TO_CHAR(R.FECHA_INICIO,'YYYY') AS ANNO,
                SUM(D.VALOR_ARRIENDO) AS TOTAL,
                L.NOMBRE AS LOCALIDAD
            FROM DEPARTAMENTO D
            JOIN 
                RESERVA R ON D.ID = R.ID_DEPARTAMENTO 
            JOIN 
                LOCALIDAD L ON D.ID_LOCALIDAD = L.ID
            WHERE 
                TO_CHAR(R.FECHA_INICIO,'YYYY')= '2022'                
            GROUP BY 
                D.ID, D.NOMBRE,  
                TO_CHAR(R.FECHA_INICIO,'YYYY'), L.NOMBRE    
            ORDER BY 
                TO_CHAR(R.FECHA_INICIO,'YYYY') ASC;
    END;
END;

