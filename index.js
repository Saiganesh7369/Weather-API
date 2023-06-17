
const express = require("express");
const bodyparser= require("body-parser");
const https=require("https"); //https is used to get data from one http
const app=express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    
})
app.post("/",function(req,res){
    const query=req.body.cityName;
    const appkey="6d01eee3aa02089be57ed1672ca03d17";
    const units="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=" + appkey+"&units="+units;
    
    https.get(url,function(response){
        console.log(response.statusCode);
        
        response.on("data",function(data){                        //on is a method which  gives the data 
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const des=weatherData.weather[0].description;
            res.write("<h1>The Temperature in "+query+" is: "+temp+" degrees</h1>");
            res.write("<p>The Weather Description is: "+des+"</p>");
            res.send();
        })
    })
 })



app.listen(3000,function(){
    console.log("PORT STARTED");
})