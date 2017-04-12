# lociDB v0.0.1
Small and simple nosql-like database module 
for NodeJS and Electron applications.

## Install
`npm install locidb`

## Usage

```javascript

var Loci = require("locidb"); //import the module.
var db = new Loci(); //Creates an instance of lociDB.

var user = {                //This is an example object that we will insert into a table.
    name: "mikael",
    age: 27,
    city: "Bohus",
    country: "Sweden"
};

console.log(db.listTables());   //First list tables to se if it exists any already.

db.insert("users", user);       //Insert the object to the table users at the end, 
                                //if it does not exist it will be created.

var users = db.get("users");    //Get all rows in the table as an array of objects

console.log(users);             //Print out the array so we can watch it.

db.drop();                      //Drop/deletes all tables. Only use if you know what you doing,
                                //this will delete all files in the folder that locidb creates per auto.
```

## Testing
If you want to try some functions before using this module 
in your applications you can use the `test.js` file located in the
root folder of the module and then run the file with your terminal with the command
`node ./test.js`

## License
MIT - © Copyright [Mikael Carlsson](http://mikaelcarlsson.info)