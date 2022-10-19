create or replace PACKAGE ACCIONES_TRANSPORTE
AS
    PROCEDURE CREAR_TRANSPORTE(
                            V_ID_CONDUCTOR IN NUMBER,
                            V_ID_TERMINAL IN NUMBER,
                            V_FECHA IN VARCHAR2,
                            V_HORARIO IN VARCHAR2,
                            V_PRECIO IN NUMBER,
                            RESULTADO OUT NUMBER);

    PROCEDURE MODIFICAR_TRANSPORTE(
                            V_ID IN VARCHAR2,
                            V_ID_CONDUCTOR IN NUMBER,
                            V_ID_TERMINAL IN NUMBER,
                            V_FECHA IN VARCHAR2,
                            V_HORARIO IN VARCHAR2,
                            V_PRECIO IN NUMBER,
                            RESULTADO OUT NUMBER,
                            MSG OUT VARCHAR2);

    PROCEDURE ELIMINAR_TRANSPORTE( V_ID IN VARCHAR2,RESULTADO OUT NUMBER);

    PROCEDURE VER_TRANSPORTE(V_TRANSPORTES OUT SYS_REFCURSOR);
END;
/
----------------------------------------------------------------------
create or replace PACKAGE BODY ACCIONES_TRANSPORTE
AS
    PROCEDURE CREAR_TRANSPORTE(
                            V_ID_CONDUCTOR IN NUMBER,
                            V_ID_TERMINAL IN NUMBER,
                            V_FECHA IN VARCHAR2,
                            V_HORARIO IN VARCHAR2,
                            V_PRECIO IN NUMBER,
                            RESULTADO OUT NUMBER)
    AS
    BEGIN
        INSERT INTO TRANSPORTE VALUES('TR_'||TO_CHAR(TRANSPORTE_AUTO.NEXTVAL),V_ID_CONDUCTOR,V_ID_TERMINAL,V_FECHA,V_HORARIO,V_PRECIO);
        RESULTADO := SQL%ROWCOUNT;
        COMMIT;

        EXCEPTION
            WHEN OTHERS THEN
            RESULTADO := 0;
            ROLLBACK;
    END;

    PROCEDURE MODIFICAR_TRANSPORTE(
                            V_ID IN VARCHAR2,
                            V_ID_CONDUCTOR IN NUMBER,
                            V_ID_TERMINAL IN NUMBER,
                            V_FECHA IN VARCHAR2,
                            V_HORARIO IN VARCHAR2,
                            V_PRECIO IN NUMBER,
                            RESULTADO OUT NUMBER,
                            MSG OUT VARCHAR2)
AS
    BEGIN
        UPDATE TRANSPORTE
        SET 
        ID_CONDUCTOR = V_ID_CONDUCTOR,
        ID_TERMINAL = V_ID_TERMINAL,
        FECHA = V_FECHA,
        HORARIO = V_HORARIO,
        PRECIO = V_PRECIO
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
        OPEN V_TRANSPORTES FOR 
        SELECT
            TR.ID "ID",
            TR.ID_CONDUCTOR "ID_CONDUCTOR",
            U.NOMBRE || ' ' || U.APELLIDO "CONDUCTOR",
            TR.ID_TERMINAL  "ID_TERMINAL",
            TE.NOMBRE "TERMINAL",
            TR.FECHA "FECHA",
            TR.HORARIO "HORARIO",
            TR.PRECIO  "PRECIO"
        FROM TRANSPORTE TR
        JOIN CONDUCTOR C
            ON TR.ID_CONDUCTOR = C.ID
        JOIN USUARIO U
            ON C.ID_USUARIO = U.ID
        JOIN TERMINAL TE
            ON TR.ID_TERMINAL = TE.ID
            ;
    END;
END;