
create or replace PACKAGE ACCIONES_TOUR
AS

    PROCEDURE CREAR_TOUR(
    V_CUPO IN NUMBER,
    V_PRECIO IN NUMBER,
    V_FECHA IN VARCHAR2,
    V_HORA_INICIO IN VARCHAR2,
    V_DURACION IN VARCHAR2,
    V_DESCRIPCION IN VARCHAR2,
    V_ID_LOCALIDAD IN NUMBER,
    RESULTADO OUT VARCHAR2 ,
    MSG OUT VARCHAR2);

    PROCEDURE ELIMINAR_TOUR(V_ID IN VARCHAR2, RESULTADO OUT NUMBER);

    PROCEDURE MODIFICAR_TOUR(
    V_ID IN VARCHAR2,
    V_CUPO IN NUMBER,
    V_PRECIO IN NUMBER,
    V_FECHA IN VARCHAR2,
    V_HORA_INICIO IN VARCHAR2,
    V_DURACION IN VARCHAR2,
    V_DESCRIPCION IN VARCHAR2,
    V_ESTADO IN NUMBER,
    V_ID_LOCALIDAD IN NUMBER,
    RESULTADO OUT NUMBER);

    PROCEDURE VER_TOURS(V_TOURS OUT SYS_REFCURSOR);
    
    PROCEDURE VER_TOUR(V_ID IN VARCHAR2, V_TOUR OUT SYS_REFCURSOR);
    PROCEDURE ACTUALIZAR_IMAGENES(V_ID IN VARCHAR2,V_IMAGENES IN CLOB,RESULTADO OUT NUMBER);
END;

/
-------------------------------------------------------------------

create or replace PACKAGE BODY ACCIONES_TOUR
AS

    PROCEDURE CREAR_TOUR(
        V_CUPO IN NUMBER,
        V_PRECIO IN NUMBER,
        V_FECHA IN VARCHAR2,
        V_HORA_INICIO IN VARCHAR2,
        V_DURACION IN VARCHAR2,
        V_DESCRIPCION IN VARCHAR2,
        V_ID_LOCALIDAD IN NUMBER,
        RESULTADO OUT VARCHAR2,
        MSG OUT VARCHAR2)
        AS
            V_ID VARCHAR2(150);
        BEGIN
            Insert into TOUR (ID,CUPO,PRECIO,FECHA,HORA_INICIO,DURACION,DESCRIPCION,ID_LOCALIDAD) 
            Values ('TO_'||TO_CHAR(TOUR_AUTO.NEXTVAL),
            V_CUPO,
            V_PRECIO,
            V_FECHA,
            V_HORA_INICIO,
            V_DURACION,
            V_DESCRIPCION,
            V_ID_LOCALIDAD)
            RETURNING TOUR.ID INTO V_ID;
            RESULTADO := V_ID;
            COMMIT;

            EXCEPTION
                WHEN OTHERS THEN
                RESULTADO := 0; 
                MSG:=SQLERRM;
                rollback;
        END;

    PROCEDURE MODIFICAR_TOUR(
        V_ID IN VARCHAR2,
        V_CUPO IN NUMBER,
        V_PRECIO IN NUMBER,
        V_FECHA IN VARCHAR2,
        V_HORA_INICIO IN VARCHAR2,
        V_DURACION IN VARCHAR2,
        V_DESCRIPCION IN VARCHAR2,
        V_ESTADO IN NUMBER,    
        V_ID_LOCALIDAD IN NUMBER,
        RESULTADO OUT NUMBER
        )
        AS
        BEGIN
            UPDATE TOUR 
            SET ID = V_ID,
            CUPO = V_CUPO,
            PRECIO = V_PRECIO,
            FECHA = V_FECHA,
            HORA_INICIO = V_HORA_INICIO,
            DURACION = V_DURACION,
            DESCRIPCION = V_DESCRIPCION,
            ESTADO = V_ESTADO, 
            ID_LOCALIDAD = V_ID_LOCALIDAD
            WHERE ID = V_ID;
            RESULTADO := SQL%ROWCOUNT;
            COMMIT;
            EXCEPTION
                WHEN OTHERS THEN
            resultado := 0; 
            rollback;
        END;

    PROCEDURE ELIMINAR_TOUR(V_ID IN VARCHAR2 ,RESULTADO OUT NUMBER)
        AS
        BEGIN
            DELETE FROM TOUR WHERE ID = V_ID;
            RESULTADO := SQL%ROWCOUNT;
                COMMIT;
                EXCEPTION
                    WHEN OTHERS THEN
                    RESULTADO:=0;
                    ROLLBACK;
        END;

    PROCEDURE VER_TOURS(V_TOURS OUT SYS_REFCURSOR)
        AS
        BEGIN
            OPEN V_TOURS FOR SELECT T.ID,
            T.CUPO,
            T.PRECIO,
            T.FECHA,
            T.HORA_INICIO,
            T.DURACION,
            T.DESCRIPCION,
            T.ID_LOCALIDAD,
            T.IMAGENES,
            L.NOMBRE 
            AS LOCALIDAD 
            FROM TOUR T 
            JOIN LOCALIDAD L 
                ON(T.ID_LOCALIDAD = L.ID);
        END;

    PROCEDURE VER_TOUR(V_ID IN VARCHAR2, V_TOUR OUT SYS_REFCURSOR)
        AS
        BEGIN
            OPEN V_TOUR FOR SELECT T.ID,
            T.CUPO,
            T.PRECIO,
            T.FECHA,
            T.HORA_INICIO,
            T.DURACION,
            T.DESCRIPCION,
            T.IMAGENES,
            T.ESTADO,
            T.ID_LOCALIDAD,
            L.NOMBRE AS LOCALIDAD 
            FROM TOUR T JOIN LOCALIDAD L ON(T.ID_LOCALIDAD = L.ID)
            WHERE T.ID = V_ID
            ;
        END;

    PROCEDURE ACTUALIZAR_IMAGENES(
        V_ID IN VARCHAR2, 
        V_IMAGENES IN CLOB,
        RESULTADO OUT NUMBER)
        AS
        BEGIN

            UPDATE TOUR 
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
    


END;