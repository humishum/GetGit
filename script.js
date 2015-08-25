// Author:Humdaan Mustafa
// Github: http://github.com/humishum/GetGit
// GetGit: Simple Tool to scrape git commits n' stuff
// npm install getgit

//Requires
var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var prompt  = require('prompt');

var uname;
//start prompt
prompt.start();
// Gets Username and store into uname var for usage
prompt.get(['username'], function(err, result){
    
    uname = result.username;
    
});

//This is where the magic happens
app.get('/scrape',function(req,res){
    //profile we're scraping
    url = 'http://github.com/'+uname;
    
    request(url, function(error,response, html){
        // error check
        if(!error){
            var $ = cheerio.load(html);    
            //define vars to scrape
        var name, Cstreak;
        var json = { name : "", Cstreak : ""}   
// span class for fullname
$('.vcard-fullname').filter(function(){
    //store filtered data into a var
    var data = $(this);
            
    name = data.text();
            
    json.name = name;
            
})
// span class for contr.number                

$( document ).ready('.contrib-number').filter(function(){
                    
    var data = $(this);
    //fix this to get actual first one.                
    
    Cstreak = data.first().text();
    
    json.Cstreak = Cstreak;
                })

        }
        
fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
            console.log('Success!');
        })
        res.send('Check the console m8')
        console.log('Name:'+name);
        console.log('Contribution Streak:' + Cstreak);
    }) ;  
})


// app is on 8080
app.listen('8080')
//confirmation that app is running
console.log('running 8080');
//idk why i need this tbh
exports = module.exports = app