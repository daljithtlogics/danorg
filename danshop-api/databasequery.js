const mysql = require('mysql2');

function queryDatabase(sqlQuery, stream) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: '127.0.0.1',
      user: 'vendure',
      password: 'Sandeep@0097!@',
      database: 'danshop_latest',
      stream: stream
    });

    connection.query(sqlQuery, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
      connection.end();
    });
  });
}

module.exports = queryDatabase;
