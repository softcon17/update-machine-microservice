///////////////////////////////////////////////////////////////////////////// 
// This page contains helper modules that are shared between endpoints.    //
// By creating them as modules, than can be called by other functions, but //
// but the variables within the modules cannot be manipulated externally.  //
///////////////////////////////////////////////////////////////////////////// 
'use strict';

const pg = require('pg');

// A class to represent a postgres connection. To use it, create a new instance:
// of the class passing in the connection string. You can then use the instance
// to make queries to the database (initially either select or insert queries)
// and act on the results.
class PGConnection {
  constructor(connectionString) {
    this.client = new pg.Client(connectionString);
    this.client.connect();
  }

  // Make a select query. The callback is called with 2 arguments, an error
  // (if there was one) and the rows. If there is an error, the rows will be
  // empty.
  //
  // params is an array of values to pass to the queryString. These can be
  // referred to in the queryString by passing $1, $2, ... into the query.
  // For example, to get all users' name from the table users with the age
  // given by the variable age, we write
  //
  // db.selectQuery('SELECT users.name FROM users WHERE age = $1;', [age], function (err, res) { ... }
  // 
  // rather than
  //
  // db.selectQuery('SELECT users.name FROM users WHERE age = ' + age, [], function (err, res) { ... }
  //
  // which has disastrous consequences when age is passed as something like
  //
  // age = "'; DROP TABLE users; --"
  //
  // Can you work out why?
  selectQuery(queryString, params, callback) {
    this.client.query(queryString, params || [], function (err, res) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res.rows);
      }
    });
  }

  // Make an insert query. The callback is called with 2 arguments, an error
  // (if there was one) and if there wasn't an error, the string "Row inserted".
  //
  // The params act exactly as in selectQuery.
  insertQuery(queryString, params, callback) {
    this.client.query(queryString, params || [], function (err, res) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, "Row inserted");
      }
    });
  }

  updateQuery(queryString, params, callback) {
    this.client.query(queryString, params || [], function (err, res) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, "Row inserted");
      }
    });
  }
}

module.exports = PGConnection;
