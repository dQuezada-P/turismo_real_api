const oracledb = require('oracledb')

const db = {
    user: 'TRSYS',
    password: 'turismoreal',
    connectString: 'localhost:1521'
}

const open = async (sql, binds = undefined, options = undefined, callback) => {
    const con = await oracledb.getConnection(db)
    con.ping((err)=>{console.log(err)})
    const result = await con.execute(sql, binds, options)
    await callback(result)
    con.release()
    return
}

exports.Open = open