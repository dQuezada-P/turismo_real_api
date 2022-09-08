
create or replace PACKAGE ACCIONES_TOUR
AS

    PROCEDURE CREAR_TOUR(
    V_CIUDAD IN VARCHAR2,
    V_CUPO IN NUMBER,
    V_PRECIO IN NUMBER,
    V_DESCRIPCION IN VARCHAR2,
    RESULTADO OUT NUMBER );

    PROCEDURE ELIMINAR_TOUR(V_ID IN NUMBER ,RESULTADO OUT NUMBER);

    PROCEDURE MODIFICAR_TOUR(
    V_ID IN NUMBER,
    V_CIUDAD IN VARCHAR2,
    V_CUPO IN NUMBER,
    V_PRECIO IN NUMBER,
    V_DESCRIPCION IN VARCHAR2,
    RESULTADO OUT NUMBER);

    PROCEDURE VER_TOUR(V_TOURS OUT SYS_REFCURSOR);
END;

-------------------------------------------------------------------

create or replace PACKAGE BODY ACCIONES_TOUR
AS

PROCEDURE CREAR_TOUR(
    V_CIUDAD IN VARCHAR2,
    V_CUPO IN NUMBER,
    V_PRECIO IN NUMBER,
    V_DESCRIPCION IN VARCHAR2,
    RESULTADO OUT NUMBER 
)
AS
BEGIN
    Insert into TOUR Values (TOUR_AUTO.NEXTVAL,V_CIUDAD,V_CUPO,V_PRECIO,V_DESCRIPCION);
    RESULTADO := SQL%ROWCOUNT;
    COMMIT;

    EXCEPTION
        WHEN OTHERS THEN
    resultado := 0; 
    rollback;
    END;

PROCEDURE MODIFICAR_TOUR(
    V_ID IN NUMBER,
    V_CIUDAD IN VARCHAR2,
    V_CUPO IN NUMBER,
    V_PRECIO IN NUMBER,
    V_DESCRIPCION IN VARCHAR2,
    RESULTADO OUT NUMBER
)
AS
BEGIN
    UPDATE TOUR 
    SET ID = V_ID,
    CIUDAD = V_CIUDAD,
    CUPO = V_CUPO,
    PRECIO = V_PRECIO,
    DESCRIPCION = V_DESCRIPCION
    WHERE ID = V_ID;
    RESULTADO := SQL%ROWCOUNT;
    COMMIT;
     EXCEPTION
        WHEN OTHERS THEN
    resultado := 0; 
    rollback;
    END;

PROCEDURE ELIMINAR_TOUR(V_ID IN NUMBER ,RESULTADO OUT NUMBER)
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

PROCEDURE VER_TOUR(V_TOURS OUT SYS_REFCURSOR)
AS
BEGIN
    OPEN V_TOURS FOR SELECT * FROM TOUR;  
    END;

END;