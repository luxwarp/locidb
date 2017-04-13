/* this file is for testing the module. run it the terminal with "node ./test" */

var Loci = require("./index"); //Import the module.
var db = new Loci(); //Create an instance of loci.

var user = {                //This is an example object that we will INSERT into a table.
    name: "mikael",
    age: 27,
    city: "Bohus",
    country: "Sweden"
};

var settings = {                //This is another example object that we will SET into a table.
    fontSize: 10,
    fontColor: "#00FFCC",
    network: "NAT",
    active: false
};

console.log(db.listTables());   //First list tables to se if it exists any already.

db.set("settings", settings);   //This will overwrite any data in the table and insert the value instead.

db.insert("users", user);       //Insert the object to the table at the end.

var users = db.get("users");    //Get all rows in the table as an array of objects

console.log(users);             //Print out the array so we can watch it.

//db.dropAll();                      //Drop/deletes all tables. Only use if you know what you doing.