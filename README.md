# lociDB

## Intro
Small and simple nosql-like database module 
for NodeJS and Electron applications.

This module lets you store an array of objects into simple plain text files as a JSON string.
You dont need to stringify your objects first, we do that for you. (see usage below).

This noSQL-like database is perfect for your small NodeJS and Electron applications where you 
maby want to store some kind of user settings, todo-list etc for example.

See our [change log](https://github.com/mmcarlsson/locidb/wiki/Change-log) in the wiki.

## Install
`npm install locidb`

## Usage

```javascript
var Loci = require('locidb');                       //Import the module.
var db = new Loci();                                //Create an instance of loci.

var user = {                                        //This is three example objects
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

console.log(db.countRows('users'));                 //Count how many rows there is in a table.

console.log(db.get('users'));                       //Get all rows in the table as an array of objects and print it.
console.log(db.get('settings'));

console.log(db.getRows('users', 'name', 'Mikael')); //Get all rows in a table matching a key and a value as an array of objects.

console.log(db.dropRows('users', 'name', 'Mikael')); //Drop/delete specific rows in a table. Returns a number of total rows deleted.
db.dropTable('settings');                           //Drop/delete a specific table.
db.dropAll();                                       //Drop/deletes all tables. Only use if you know what you doing.
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
