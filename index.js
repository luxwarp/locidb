
/* This file is the nodejs module */

var fs = require("fs");

const pathToDB = "lociDB/";
const tableExtension = ".db";

class Loci {
    constructor() {
        
        if(!fs.existsSync(pathToDB)) {
            fs.mkdirSync(pathToDB);
        }
    }

    
    /**
     * This inserts value to last row in the table. 
     * @param {String} dbName The name off the table for writing the value to. 
     * @param {Object} value Needs to be an object. No need to stringify first we do that FOR YOU.
     */
    insert(dbName, value) {
        var existing;
        
        if(fs.existsSync(pathToDB+dbName+tableExtension)) {
            if(fs.statSync(pathToDB+dbName+tableExtension).size == 0) {
                existing = [];
            }else {
                existing = JSON.parse(fs.readFileSync(pathToDB+dbName+tableExtension,"utf8"));
            }
        }else {
            existing = [];
        }

        existing.push(value)

        fs.writeFileSync(pathToDB+dbName+tableExtension, JSON.stringify(existing,null,"\t"));
    }
    
    /**
     * This will return all from the table.
     * @param {String} dbName Name of the table. 
     */
    get(dbName) {
        var existing;
        
        if(fs.existsSync(pathToDB+dbName+tableExtension)) {
            if(fs.statSync(pathToDB+dbName+tableExtension).size == 0) {
                existing = [];
                return existing;
            }else {
                existing = JSON.parse(fs.readFileSync(pathToDB+dbName+tableExtension,"utf8"));
                return existing;
            }
        } else {
            return "Error: table not found.";
        }
    }
    
}


module.exports = Loci;