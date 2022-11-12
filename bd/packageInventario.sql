create or replace PACKAGE ACCIONES_INVENTARIO
AS   
    -- PROCEDURE CREAR_INVENTARIO(
    --     V_ID IN NUMBER,
    --     V_NOMBRE IN VARCHAR2, 
    --     V_CANTIDAD IN NUMBER, 
    --     V_ESTADO IN CHAR, 
    --     V_DESCRIPCION IN VARCHAR2, 
    --     V_ID_PRODUCTO IN NUMBER,
    --     V_ID_DEPARTAMENTO IN VARCHAR2,
    --     RESULTADO OUT NUMBER);

    -- PROCEDURE MODIFICAR_INVENTARIO(
    --     V_ID IN NUMBER,
    --     V_NOMBRE IN VARCHAR2, 
    --     V_CANTIDAD IN NUMBER, 
    --     V_ESTADO IN CHAR, 
    --     V_DESCRIPCION IN VARCHAR2, 
    --     V_ID_PRODUCTO IN NUMBER,
    --     V_ID_DEPARTAMENTO IN VARCHAR2,
    --     RESULTADO OUT NUMBER);

    -- PROCEDURE ELIMINAR_INVENTARIO(V_ID IN NUMBER, RESULTADO OUT NUMBER);

    PROCEDURE GET_INVENTARIO(V_ID_DEPARTAMENTO IN NUMBER, V_INVENTARIOS OUT SYS_REFCURSOR);
     
END;
/
---------------------------------------------------------------
create or replace PACKAGE BODY ACCIONES_INVENTARIO
AS
    -- PROCEDURE CREAR_INVENTARIO(
    --     V_ID IN NUMBER,
    --     V_NOMBRE IN VARCHAR2, 
    --     V_CANTIDAD IN NUMBER, 
    --     V_ESTADO IN CHAR, 
    --     V_DESCRIPCION IN VARCHAR2, 
    --     V_ID_PRODUCTO IN NUMBER,
    --     V_ID_DEPARTAMENTO IN VARCHAR2,
    --     RESULTADO OUT NUMBER)
    --     AS
    --     BEGIN
    --         INSERT INTO INVENTARIO VALUES(V_ID,V_NOMBRE,V_CANTIDAD,V_ESTADO,V_DESCRIPCION,V_ID_PRODUCTO,V_ID_DEPARTAMENTO);
    --         RESULTADO := SQL%ROWCOUNT;
    --         COMMIT;

    --         EXCEPTION
    --             WHEN OTHERS THEN
    --                 RESULTADO:=0;
    --                 ROLLBACK;
    --     END;

    -- PROCEDURE MODIFICAR_INVENTARIO(
    --     V_ID IN NUMBER,
    --     V_NOMBRE IN VARCHAR2, 
    --     V_CANTIDAD IN NUMBER, 
    --     V_ESTADO IN CHAR, 
    --     V_DESCRIPCION IN VARCHAR2, 
    --     V_ID_PRODUCTO IN NUMBER,
    --     V_ID_DEPARTAMENTO IN VARCHAR2,
    --     RESULTADO OUT NUMBER)
    --     AS
    --     BEGIN
    --         UPDATE INVENTARIO
    --         SET NOMBRE = V_NOMBRE,
    --         CANTIDAD = V_CANTIDAD,
    --         ESTADO = V_ESTADO,
    --         DESCRIPCION = V_DESCRIPCION,
    --         ID_PRODUCTO = V_ID_PRODUCTO,
    --         ID_DEPARTAMENTO = V_ID_DEPARTAMENTO
    --         WHERE ID = V_ID;
    --         RESULTADO := SQL%ROWCOUNT;
    --         COMMIT;

    --         EXCEPTION
    --             WHEN OTHERS THEN
    --                 RESULTADO:=0;
    --                 ROLLBACK;
    --     END;

    -- PROCEDURE ELIMINAR_INVENTARIO(V_ID IN NUMBER, RESULTADO OUT NUMBER)
        -- AS
        -- BEGIN
        --     DELETE FROM INVENTARIO
        --     WHERE ID = V_ID;
        --     RESULTADO := SQL%ROWCOUNT;
        --     COMMIT;

        --     EXCEPTION
        --         WHEN OTHERS THEN
        --             RESULTADO:=0;
        --             ROLLBACK;

        -- END;

    PROCEDURE GET_INVENTARIO(V_ID_DEPARTAMENTO IN NUMBER, V_INVENTARIOS OUT SYS_REFCURSOR)
        AS
        BEGIN
            OPEN V_INVENTARIOS FOR 
            SELECT  
                I.ID,
                I.CANTIDAD,
                I.ESTADO,
                I.DESCRIPCION, 
                P.ID PRODUCTO__ID,
                P.NOMBRE PRODUCTO__NOMBRE,
                P.PRECIO PRODUCTO__PRECIO,
                P.CANTIDAD_INICIAL PRODUCTO__CANTIDAD_INICIAL 
            FROM INVENTARIO I
            JOIN PRODUCTO P 
                ON I.ID_PRODUCTO = P.ID
            WHERE I.ID_DEPARTAMENTO = V_ID_DEPARTAMENTO;
            
        END;
END;
