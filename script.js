// Author:Humdaan Mustafa
// Github: http://github.com/humishum/GetGit
// GetGit: Simple Tool to scrape git commits n' stuff

//Requires
var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var username = 'humishum';
//This is where the magic happens
app.get('/scrape',function(req,res){

    //profile we're scraping
    url = 'http://github.com/'+username;
    
    request(url, function(error,response, html){
     
        // error check
        if(!error){
            var $ = cheerio.load(html);
            
            //define vars to scrape
        var name, yearContri;
        var json = { name : "", yearContri : ""}
        
// span class for fullname
$('.vcard-fullname').filter(function(){
    //store filtered data into a var
    var data = $(this);
            
    name = data.text();
            
    json.name = name;
            
            })
// span class for contr.number                
$('.contrib-number').filter(function(){
                    
    var data = $(this);
    //fix this to get actual first one.                
    yearContri = data.first().text();
    
    json.yearContri = yearContri;
                })

        }
        
fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
            console.log('Success!');
        })
        res.send('Check the console lad')
    }) ;   
})

// app is on 8080
app.listen('8080')
//confirmation that app is running
console.log('Magic is happening on 8080');

//idk why i need this tbh
exports = module.exports = app