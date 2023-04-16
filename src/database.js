const mysql = require('mysql2');
const { promisify } = require('util');

const { database } = require('./keys');


const pool = mysql.createPool(database);

pool.getConnection((err, connection)=>{
  if(err){
      if(err.code === 'PROTOCOL_CONNECTION_LOST'){
          console.log('DATABASE CONEXION A SIDO CERRADA');
       }
      if(err.code === 'ER_CON_COUNT_ERROR'){
           console.log('DATABASE CONEXIONIONES NUMERO');
       }
       if(err.code === 'ECONNREFUSED'){
           console.log('DATABASE CONEXION A SIDO RECHAZADA');
      }
  }
  if(connection) connection.release();
  console.log('DATABASE CONECTADA');
  return;
});

pool.query = promisify(pool.query);

module.exports = pool;