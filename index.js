/* This file is the nodejs module */

'use strict';

var fs = require('fs');

const pathToDB = 'lociDB/';
const tblExtension = '.db';

class Loci {
    /**
     * Constructor will create a folder for all table files.
     */
    constructor() {
        //Lets create a folder if it does not exist when we starting to use the module.
        if(!fs.existsSync(pathToDB)) {
            fs.mkdirSync(pathToDB);
        }
    }

    /**
     * This inserts value to last row in the table. 
     * @param {String} tblName The name off the table for writing the value to. 
     * @param {Object} value Needs to be an object. No need to stringify first, LOCI DO THAT FOR YOU!
     */
    insert(tblName, value) {
        var existing;
        
        //Check if table exist
        if(fs.existsSync(pathToDB+tblName+tblExtension)) {
            //If it exist but is empty then make an array.
            if(fs.statSync(pathToDB+tblName+tblExtension).size == 0) {
                existing = [];
            }else { //if its not empty parse the content.
                existing = JSON.parse(fs.readFileSync(pathToDB+tblName+tblExtension,'utf8'));
            }
        }else {
            existing = []; //if table does not exist make an array.
        }

        existing.push(value);   //push the value to the last index of array.

        //write the array to the file. if it does not exist it will be created.
        fs.writeFileSync(pathToDB+tblName+tblExtension, JSON.stringify(existing, null, '\t'));
    }

    /**
     * This will overwrite any data in the table and insert the value instead.
     * @param {String} tblName The name off the table for overwriting and insert the value to. 
     * @param {Object} value Needs to be an object. No need to stringify first, LOCI DO THAT FOR YOU!
     */
    set(tblName, value) {

        var data = [];
        

        data.push(value);

        fs.writeFileSync(pathToDB+tblName+tblExtension, JSON.stringify(data, null, '\t'));
    }
    
    /**
     * This will return all rows from the table as an array of objects. Return false if table not exist or is empty.
     * @param {String} tblName Name of the table to return. 
     */
    get(tblName) {
        var existing = [];
        
        //Check if table exist
        if(fs.existsSync(pathToDB+tblName+tblExtension)) {
            //If it exist but is empty then make an array.
            if(fs.statSync(pathToDB+tblName+tblExtension).size == 0) {
                return false;
            }else { 
                existing = JSON.parse(fs.readFileSync(pathToDB+tblName+tblExtension,'utf8'));
                return existing;
            }
        }else {
            return false;
        }
    }

    /**
     * This will return all rows from the table as an array of objects where objects key matches key and value parameters. Returns false if no matching is found.
     * @param {String} tblName Name of the table to search in.
     * @param {String} key The name of the key in your table, eg. name, age, city, title, etc.
     * @param {any} value The value of the key you want to find.
     */
    getRows(tblName, key, value) {
        var rows = this.get(tblName);
        if(!rows) {
            return false;
        }
        
        var result = rows.filter(function(obj) {
            
            if(obj.hasOwnProperty(key)) {
                if(obj[key] === value) {
                    return true;
                }
                return false;
            }
            return false;
        });

        if(result.length <= 0) {
            return false;
        }else {
            return result;
        }
    }

     /**
     * This will return how many rows there is in a table. Returns false if no table exist or is empty.
     * @param {String} tblName Name of the table to count rows in.
     */
    countRows(tblName) {
        var rows = this.get(tblName);
        if(!rows) {
            return false;
        }

        return rows.length;
    }

    /**
     * This will return all tables that exists as an array of strings with file extension. Returns false if no tables are found.
     */
    listTables() {
        var files = fs.readdirSync(pathToDB);
        
        if(files.length <= 0) {
            return false;
        }else {
            return files;
        }
    }

    /**
     * Drop/delete specific rows in a table. Returns a number of total rows deleted. Returns false if table dont exists.
     * @param {String} tblName Name of the table to delete in.
     * @param {String} key The name of the key in your table, eg. name, age, city, title, etc.
     * @param {any} value The value of the key you want to match.
     */
    dropRows(tblName, key, value) {
        var rows = this.get(tblName);
        if(!rows) {
            return false;
        }
        var total = rows.length;
        
        for(var i = 0; i < rows.length; i++) {
            var obj = rows[i];

            if(obj.hasOwnProperty(key)) {
                if(obj[key] === value) {
                    rows.splice(i, 1);
                    i--;
                }
            }
        }

        fs.writeFileSync(pathToDB+tblName+tblExtension, JSON.stringify(rows, null, '\t'));

        return total - rows.length;
    }

    /**
     * Drop/Deletes a specific table. Returns false if table dont exist. ONLY USE IF YOU KNOW WHAT YOU DOING.
     * @param {String} tblName The name of the table you want to drop/delete.
     */
    dropTable(tblName) {
        var deleted;

        try {
            deleted = fs.unlinkSync(pathToDB+tblName+tblExtension);
        } catch(err) {
            return false;
        }
        return true;
    }

    /**
     * Drop/Deletes all tables (ALL FILES IN THE lociDB DIRECTORY), Returns false if no table exists. Returns true if drop/delete was successful. ONLY USE IF YOU KNOW WHAT YOU DOING.
     */
    dropAll() {
        var files = fs.readdirSync(pathToDB);
        
        if(files.length <= 0) {
            return false;
        }else {
            for(var i = 0; i < files.length; i++) {
                fs.unlinkSync(pathToDB+files[i]);
            }
            return true;
        }
    }
}

module.exports = Loci;