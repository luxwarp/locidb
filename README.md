# lociDB

## Intro
Small and simple nosql-like database module 
for NodeJS and Electron applications.

This module lets you store objects into simple plain text files as a JSON string.
You dont need to stringify your objects first, we do that for you. (see usage below).

This noSQL-like database is perfect for your small NodeJS and Electron applications where you 
maby want to store some kind of user settings, todo-list etc for example.  

## Install
`npm install locidb`

## Usage

```javascript
var Loci = require("locidb");   //Import the module.
var db = new Loci();            //Create an instance of loci.

var user = {                    //This is an example object that we will INSERT into a table.
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

console.log(users[0].city);     //Example.

db.dropAll();                   //Drop/deletes all tables. Only use if you know what you doing.
```

## Testing
If you want to try some functions before using this module 
in your applications you can use the `test.js` file located in the
root folder of the module and then run the file in your terminal with the command
`node ./test.js`

## License
MIT - © Copyright [Mikael Carlsson](http://mikaelcarlsson.info)

## Note
No one but you as the user of this module can be held responsible for damaged or lost data.
If you planing on storing >100MB of data this is not for you.
