/* this file is for testing the module. run it in the terminal with "node ./test" */

var Loci = require('./index'); //Import the module.
var db = new Loci(); //Create an instance of loci.

var user = {                //This is three example objects
    name: 'Mikael',
    age: 27,
    city: 'Bohus',
    country: 'Sweden'
};

var user2 = {
    name: 'Kalle',
    age: 27,
    city: 'Nol',
    country: 'Norway'
};

var settings = {
    fontSize: 13,
    color: '#000',
    active: false
};

console.log(db.listTables());                       //First list tables to se if it exists any already.

db.set('users', user); 
db.set('settings', settings);                       //This will overwrite any data in the table and insert the value instead.

db.insert('users', user2);                          //Insert the object to the table at the end.

console.log(db.get('users'));                       //Get all rows in the table as an array of objects and print it.
console.log(db.get('settings'));

console.log(db.getRows('users', 'name', 'Mikael')); //Get all rows in a table matching a key and a value as an array of objects.

console.log(db.dropRows('users', 'name', 'Mikael')) //Drop/delete specific rows in a table. Returns a number of total rows deleted.
db.dropTable('settings');                           //Drop/delete a specific table.
//db.dropAll();                                     //Drop/deletes all tables. Only use if you know what you doing.