/* this file is for testing the module. run it the terminal with "node ./test" */

var Loci = require("./index");

var db = new Loci();

var user = { 
    name: "mikael",
    age: 27,
    city: "Bohus",
    country: "Sweden"
};

db.insert("users", user);
var users = db.get('users');

 console.log(users);