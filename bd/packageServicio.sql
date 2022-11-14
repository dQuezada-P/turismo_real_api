create or replace PACKAGE ACCIONES_SERVICIO
AS
    PROCEDURE CREAR_SERVICIO(
    V_ID IN VARCHAR2,
    V_FECHA_CONTRATO IN VARCHAR2,
    V_DESCRIPCION IN VARCHAR2,
    V_ID_TRANSPORTE IN VARCHAR2,
    V_ID_TOUR IN VARCHAR2,
    RESULTADO OUT NUMBER);

    PROCEDURE MODIFICAR_SERVICIO(
    V_ID IN VARCHAR2,
    V_FECHA_CONTRATO IN VARCHAR2,
    V_DESCRIPCION IN VARCHAR2,
    V_ID_TRANSPORTE IN VARCHAR2,
    V_ID_TOUR IN VARCHAR2,
    RESULTADO OUT NUMBER);

    PROCEDURE ELIMINAR_SERVICIO(V_ID IN VARCHAR2, RESULTADO OUT NUMBER);

    PROCEDURE VER_SERVICIO(V_SERVICIOS OUT SYS_REFCURSOR);
END;
--------------------------------------------------------------------

/
create or replace PACKAGE BODY ACCIONES_SERVICIO
AS
    PROCEDURE CREAR_SERVICIO(
        V_ID IN VARCHAR2,
        V_FECHA_CONTRATO IN VARCHAR2,
        V_DESCRIPCION IN VARCHAR2,
        V_ID_TRANSPORTE IN VARCHAR2,
        V_ID_TOUR IN VARCHAR2,
        RESULTADO OUT NUMBER)
    AS
    BEGIN
        INSERT INTO SERVICIO VALUES(V_ID,TO_DATE(V_FECHA_CONTRATO,'DD-MM-YYYY HH24:MI:SS'),V_DESCRIPCION,V_ID_TRANSPORTE,V_ID_TOUR);
        RESULTADO := SQL%ROWCOUNT;
        COMMIT;

        EXCEPTION
            WHEN OTHERS THEN
               RESULTADO:=0;
               ROLLBACK;
    END;

    PROCEDURE MODIFICAR_SERVICIO(
        V_ID IN VARCHAR2,
        V_FECHA_CONTRATO IN VARCHAR2,
        V_DESCRIPCION IN VARCHAR2,
        V_ID_TRANSPORTE IN VARCHAR2,
        V_ID_TOUR IN VARCHAR2,
        RESULTADO OUT NUMBER)
    AS
    BEGIN
        UPDATE SERVICIO
        SET FECHA_CONTRATO = V_FECHA_CONTRATO,
            DESCRIPCION = V_DESCRIPCION,
            ID_TRANSPORTE = V_ID_TRANSPORTE,
            ID_TOUR = V_ID_TOUR
        WHERE ID = V_ID;
        RESULTADO := SQL%ROWCOUNT;
        COMMIT;

        EXCEPTION
            WHEN OTHERS THEN
               RESULTADO:=0;
               ROLLBACK;
    END;

    PROCEDURE ELIMINAR_SERVICIO(V_ID IN VARCHAR2, RESULTADO OUT NUMBER)
    AS
    BEGIN
        DELETE FROM SERVICIO
        WHERE ID = V_ID;
        RESULTADO := SQL%ROWCOUNT;
        COMMIT;

        EXCEPTION
            WHEN OTHERS THEN
               RESULTADO:=0;
               ROLLBACK;
    END;

    PROCEDURE VER_SERVICIO(V_SERVICIOS OUT SYS_REFCURSOR)
    AS
    BEGIN
        OPEN V_SERVICIOS FOR SELECT
                                    S.ID,
                                    S.FECHA_CONTRATO,
                                    S.DESCRIPCION,
                                    T.ID "TRANSPORTE",
                                    TR.ID "TOUR"
                                FROM SERVICIO S
                                JOIN TRANSPORTE T ON S.ID_TRANSPORTE = T.ID
                                JOIN TOUR TR ON S.ID_TOUR = TR.ID;
    END;
END;