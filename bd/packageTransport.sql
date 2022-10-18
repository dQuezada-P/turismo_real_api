create or replace PACKAGE ACCIONES_TRANSPORTE
AS
    PROCEDURE CREAR_TRANSPORTE(V_ID_CONDUCTOR IN NUMBER,
                            V_FECHA IN VARCHAR2,
                            V_HORARIO IN VARCHAR2,
                            V_PRECIO IN NUMBER,
                            V_UBICACION IN VARCHAR2,
                            V_ID_LOCALIDAD IN NUMBER,
                            RESULTADO OUT NUMBER);

    PROCEDURE MODIFICAR_TRANSPORTE(V_ID IN VARCHAR2,
                            V_ID_CONDUCTOR IN NUMBER,
                            V_FECHA IN VARCHAR2,
                            V_HORARIO IN VARCHAR2,
                            V_PRECIO IN NUMBER,
                            V_UBICACION IN VARCHAR2,
                            V_ID_LOCALIDAD IN NUMBER,
                            RESULTADO OUT NUMBER,
                            MSG OUT VARCHAR2);

    PROCEDURE ELIMINAR_TRANSPORTE( V_ID IN VARCHAR2,RESULTADO OUT NUMBER);

    PROCEDURE VER_TRANSPORTE(V_TRANSPORTES OUT SYS_REFCURSOR);
END;
/
----------------------------------------------------------------------
create or replace PACKAGE BODY ACCIONES_TRANSPORTE
AS
    PROCEDURE CREAR_TRANSPORTE(V_ID_CONDUCTOR IN NUMBER,
                            V_FECHA IN VARCHAR2,
                            V_HORARIO IN VARCHAR2,
                            V_PRECIO IN NUMBER,
                            V_UBICACION IN VARCHAR2,
                            V_ID_LOCALIDAD IN NUMBER,
                            RESULTADO OUT NUMBER)
    AS
    BEGIN
        INSERT INTO TRANSPORTE VALUES(TRANSPORTE_AUTO.NEXTVAL,V_ID_CONDUCTOR,V_FECHA,V_HORARIO,V_PRECIO,V_UBICACION,V_ID_LOCALIDAD);
        RESULTADO := SQL%ROWCOUNT;
        COMMIT;

        EXCEPTION
            WHEN OTHERS THEN
            RESULTADO := 0;
            ROLLBACK;
    END;

    PROCEDURE MODIFICAR_TRANSPORTE(V_ID IN VARCHAR2,
                            V_ID_CONDUCTOR IN NUMBER,
                            V_FECHA IN VARCHAR2,
                            V_HORARIO IN VARCHAR2,
                            V_PRECIO IN NUMBER,
                            V_UBICACION IN VARCHAR2,
                            V_ID_LOCALIDAD IN NUMBER,
                            RESULTADO OUT NUMBER,
                            MSG OUT VARCHAR2)
AS
    BEGIN
        UPDATE TRANSPORTE
        SET ID_CONDUCTOR = V_ID_CONDUCTOR,
        FECHA = V_FECHA,
        HORARIO = V_HORARIO,
        PRECIO = V_PRECIO,
        UBICACION = V_UBICACION,
        ID_LOCALIDAD = V_ID_LOCALIDAD
        WHERE ID = V_ID;
        RESULTADO := SQL%ROWCOUNT;
        COMMIT;

        EXCEPTION
            WHEN OTHERS THEN
            MSG := SQLERRM;
            ROLLBACK;

    END;

    PROCEDURE ELIMINAR_TRANSPORTE( V_ID IN VARCHAR2,RESULTADO OUT NUMBER)
    AS
    BEGIN
        DELETE FROM TRANSPORTE WHERE ID = V_ID;
        RESULTADO := SQL%ROWCOUNT;
        COMMIT;

        EXCEPTION
            WHEN OTHERS THEN
            RESULTADO := 0;
            ROLLBACK;
    END;

    PROCEDURE VER_TRANSPORTE(V_TRANSPORTES OUT SYS_REFCURSOR)
    AS
    BEGIN
        OPEN V_TRANSPORTES FOR SELECT * FROM TRANSPORTE;
    END;
END;