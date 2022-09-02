const { dir } = require('console')
const { Router } = require('express')
const oracledb = require('oracledb')

const router = Router()
const db = require('../config/config.js')

// *Verbos HTTPS

// *POST
router.post('/', async (req,res) =>{

    const { rut,nombre,apellido,correo,estado,direccion,telefono,pass,rol } = req.body
    let r = {type:oracledb.NUMBER, dir:oracledb.BIND_OUT}

    sql = `BEGIN ACCIONES_USUARIO.CREAR_USUARIO(:rut,:nombre,:apellido,:correo,:estado,:direccion,:telefono,:pass,:rol,:r); END;`

    const options = {
        autoCommit: true
    }
    
    const callback = (result) => {
        res.json(result)
    }
    await db.Open(sql, [rut,nombre,apellido,correo,estado,direccion,telefono,pass,rol,r], options, callback)

})

// *PUT

router.put('/',async(req,res)=>{
    const { rut,nombre,apellido,correo,estado,direccion,telefono,pass,rol } = req.body
    let r = {type:oracledb.NUMBER, dir:oracledb.BIND_OUT}

    sql = `BEGIN ACCIONES_USUARIO.MODIFICAR_USUARIO(:rut,:nombre,:apellido,:correo,:estado,:direccion,:telefono,:pass,:rol,:r); END;`

    const options = {
        autoCommit: true
    }   
    const callback = (result) => {
        res.json(result)
    }
    await db.Open(sql, [rut,nombre,apellido,correo,estado,direccion,telefono,pass,rol,r], options, callback)
    
})

// *DELETE

router.delete('/', async (req,res) =>{

    const {rut} = req.body
    let r = {type:oracledb.NUMBER, dir:oracledb.BIND_OUT}

    sql = `BEGIN ACCIONES_USUARIO.ELIMINAR_USUARIO(:rut,:r);END;`

    const options = {
        autoCommit: true
    }

    const callback = (result) => {
        res.json(result)
    }
    await db.Open(sql, [rut,r], options, callback)
})

// *GET
router.get('/', async (req,res) => {
    const sql = `BEGIN ACCIONES_USUARIO.VER_USUARIO_CLIENTE(:cursor); END;`
    
    const binds = {
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
    }

    const options = {
        autoCommit: false
    }

    const callback = async(result) => {
        const resultSet = result.outBinds.cursor;
        rows = await resultSet.getRows()
        await resultSet.close();  
        res.json(rows)
    }

    await db.Open(sql, binds, options, callback)
    
})


module.exports = router