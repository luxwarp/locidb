/* this file is for testing the module. run it the terminal with "node ./test" */

var Loci = require("./index"); //import the module.
var db = new Loci(); //create an instance of loci.

var user = {                //this is an example object that we will insert into a table.
    name: "mikael",
    age: 27,
    city: "Bohus",
    country: "Sweden"
};

console.log(db.listTables());   //First list tables to se if it exists any already.

db.insert("users", user);       //insert the object to the table at the end.

var users = db.get("users");    //get all rows in the table as an array of objects

console.log(users);             //Print out the array so we can watch it.

//db.drop();                      //Drop/deletes all tables. Only use if you know what you doing.