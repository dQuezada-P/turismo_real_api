const { Router } = require('express')
const oracledb = require('oracledb')

const router = Router()
const db = require('../config/config.js')

router.get('/', async (req,res) => {
    const sql = `BEGIN VER_USUARIO_CLIENTE(:cursor); END;`
    
    const binds = {
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
    }

    const options = {
        autoCommit: true
    }

    const callback = async (result) => {
        const resultSet = result.outBinds.cursor;
        rows = await resultSet.getRows()
        await resultSet.close();  
        res.json(rows)
    }

    await db.Open(sql, binds, options, callback)
    
})

router.get('/ejemploselect', async (req, res) => {
    const sql = 'select * from rol'
    const callback = (result) => {
        console.log(result)
        res.json(result)
    }

    await db.Open(sql, [], {}, callback)
})



module.exports = router