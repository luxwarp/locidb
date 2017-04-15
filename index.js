/* This file is the nodejs module */

"use strict";

var fs = require("fs");

const pathToDB = "lociDB/";
const tblExtension = ".db";

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
                existing = JSON.parse(fs.readFileSync(pathToDB+tblName+tblExtension,"utf8"));
            }
        }else {
            existing = []; //if table does not exist make an array.
        }

        existing.push(value);   //push the value to the last index of array.

        //write the array to the file. if it does not exist it will be created.
        fs.writeFileSync(pathToDB+tblName+tblExtension, JSON.stringify(existing, null, "\t"));
    }

    /**
     * This will overwrite any data in the table and insert the value instead.
     * @param {String} tblName The name off the table for overwriting and insert the value to. 
     * @param {Object} value Needs to be an object. No need to stringify first, LOCI DO THAT FOR YOU!
     */
    set(tblName, value) {

        var data = [];

        data.push(value);

        fs.writeFileSync(pathToDB+tblName+tblExtension, JSON.stringify(data, null, "\t"));
    }
    
    /**
     * This will return all rows from the table as an array of objects.
     * @param {String} tblName Name of the table to return. 
     */
    get(tblName) {
        var existing;
        
        //Check if table exist
        if(fs.existsSync(pathToDB+tblName+tblExtension)) {
            //If it exist but is empty then make an array.
            if(fs.statSync(pathToDB+tblName+tblExtension).size == 0) {
                return existing;
            }else { 
                existing = JSON.parse(fs.readFileSync(pathToDB+tblName+tblExtension,"utf8"));
                return existing;
            }
        }else {
            return "Error: Table "+ tblName +" not found.";
        }
    }

    /**
     * This will return all rows from the table as an array of objects where objects key matches key and value parameters.
     * @param {String} tblName Name of the table to search in.
     * @param {String} key The name of the key in your table, eg. name, age, city, title, etc.
     * @param {String} value The value of the key you want to find.
     */
    getRows(tblName, key, value) {
        var rows = this.get(tblName);
        
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
            return "No matching rows found";
        }else {
            return result;
        }
    }

    /**
     * This will return all tables that exists as an array of strings with file extension.
     */
    listTables() {
        var files = fs.readdirSync(pathToDB);
        
        if(files.length <= 0) {
            return "Error: No tables found in folder " + pathToDB;
        }else {
            return files;
        }
    }

    /**
     * Drop/Deletes all tables (ALL FILES IN THE lociDB DIRECTORY), ONLY USE IF YOU KNOW WHAT YOU DOING.
     */
    dropAll() {
        var files = fs.readdirSync(pathToDB);
        
        if(files.length <= 0) {
            return "Error: No tables found in folder " + pathToDB;
        }else {
            for(var i = 0; i < files.length; i++) {
                fs.unlinkSync(pathToDB+files[i]);
            }
            return true;
        }
    }
}

module.exports = Loci;