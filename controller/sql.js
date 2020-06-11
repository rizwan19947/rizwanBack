const mysql = require('mysql');

var con = mysql.createConnection(
    {
        host: "webapp-akays.ctuennwch00f.ap-southeast-1.rds.amazonaws.com",
        user : "admin",
        password: "noorrizwanammar",
        database : "web_app",
        port : 4000
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
      });   

      module.exports = con;
