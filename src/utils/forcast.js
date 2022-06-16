const request = require("request");

const forcast = (latitude,longitude,callback) =>{

const url="http://api.weatherstack.com/current?access_key=1524cf8b01eb6e11745549ceef09da32&query="+longitude+","+latitude+"&units=f";
request({url,json:true},(error,{body})=>{

    if(error){
        callback("check ur connection",undefined);
    }
    else if(body.error){
        callback("url issue",undefined);
    }
    else{
        callback(undefined,"todays forcast is: " +body.current.weather_descriptions[0]);
    }
})};

module.exports = forcast;