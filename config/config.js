import oracledb from "oracledb";
import * as credentials from "./credentials.js"
  
const db = {
  user: credentials.ORACLE_USER,
  password: credentials.ORACLE_PASSWORD,
  connectString: credentials.ORACLE_CONNECT_STRING
}

export async function conectBD(sql, binds, options, flag = true) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(db);
    if (flag) {
      await connection.execute(sql, binds, options).then((resultSet) => {
        result = resultSet.outBinds.cursor;
      });
      const rows = await result.getRows();
      await result.close();
      return rows;
    } else {
      await connection.execute(sql, binds, options).then((resultSet) => {
        result = resultSet.outBinds;
      });
      return result;
    }
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (error) {
        console.error(error);
      }
    }
  }
}

export const connectdb = async (sql, binds, options) => {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(db);
    await connection.execute(sql, binds, options).then((resultSet) => {
      result = resultSet.outBinds;
    });

    return result;
  } catch (error) {
    console.error(error);
    return false;
  }
};
