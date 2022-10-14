create or replace PACKAGE ACCIONES_TRANSPORTE
AS
    PROCEDURE CREAR_TRANSPORTE(V_CIUDAD IN VARCHAR2,
                            V_VEHICULO IN VARCHAR2,
                            V_HORARIO IN VARCHAR2,
                            V_CONDUCTOR IN VARCHAR2,
                            V_PRECIO IN NUMBER,
                            V_PATENTE IN VARCHAR2,
                            RESULTADO OUT NUMBER);

    PROCEDURE MODIFICAR_TRANSPORTE(V_ID IN NUMBER,
                            V_CIUDAD IN VARCHAR2,
                            V_VEHICULO IN VARCHAR2,
                            V_HORARIO IN VARCHAR2,
                            V_CONDUCTOR IN VARCHAR2,
                            V_PRECIO IN NUMBER,
                            RESULTADO OUT NUMBER);

    PROCEDURE ELIMINAR_TRANSPORTE( V_ID IN NUMBER,RESULTADO OUT NUMBER);

    PROCEDURE VER_TRANSPORTE(V_TRANSPORTES OUT SYS_REFCURSOR);
END;
/
----------------------------------------------------------------------
create or replace PACKAGE BODY ACCIONES_TRANSPORTE
AS
    PROCEDURE CREAR_TRANSPORTE(V_CIUDAD IN VARCHAR2,
                                                V_VEHICULO IN VARCHAR2,
                                                V_HORARIO IN VARCHAR2,
                                                V_CONDUCTOR IN VARCHAR2,
                                                V_PRECIO IN NUMBER,
                                                V_PATENTE IN VARCHAR2,
                                                RESULTADO OUT NUMBER)
    AS
    BEGIN
        INSERT INTO TRANSPORTE VALUES(TRANSPORTE_AUTO.NEXTVAL,V_CIUDAD,V_VEHICULO,TO_DATE(V_HORARIO,'DD-MM-YYYY HH24:MI:SS'),V_CONDUCTOR,V_PRECIO,V_PATENTE);
        RESULTADO := SQL%ROWCOUNT;
        COMMIT;

        EXCEPTION
            WHEN OTHERS THEN
            RESULTADO := 0;
            ROLLBACK;
    END;

    PROCEDURE MODIFICAR_TRANSPORTE(V_ID IN NUMBER,
                                                V_CIUDAD IN VARCHAR2,
                                                V_VEHICULO IN VARCHAR2,
                                                V_HORARIO IN VARCHAR2,
                                                V_CONDUCTOR IN VARCHAR2,
                                                V_PRECIO IN NUMBER,
                                                RESULTADO OUT NUMBER)
    AS
    BEGIN
        UPDATE TRANSPORTE
        SET CIUDAD = V_CIUDAD,
        VEHICULO = V_VEHICULO,
        HORARIO = V_HORARIO,
        CONDUCTOR = V_CONDUCTOR,
        PRECIO = V_PRECIO
        WHERE ID = V_ID;
        RESULTADO := SQL%ROWCOUNT;
        COMMIT;

        EXCEPTION
            WHEN OTHERS THEN 
            ROLLBACK;

    END;

    PROCEDURE ELIMINAR_TRANSPORTE( V_ID IN NUMBER,RESULTADO OUT NUMBER)
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

