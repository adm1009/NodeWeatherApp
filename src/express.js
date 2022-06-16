const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const port = process.env.PORT || 8000;
const geocode =require("./utils/geocode");
const forcast =require("./utils/forcast");

//define path for config info
const staticDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,"../template/partials")
// console.log(viewsPath);

//setup static directory to server
app.use(express.static(staticDirectory))

//setting up view engine and views path 
app.set("view engine","hbs");
app.set("views",viewsPath)
hbs.registerPartials(partialsPath);

app.get("",(req,res)=>{
    res.render("index",{
        title:"Weather",
        name:" abhijeet"
    })
})
app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About Me",
        name:"abhi"
    })
})
app.get("/home",(req,res)=>{
    res.render("home",{
        title:"Home page",
        name:"abhi mulik"
    })
})

// app.get("/weather",(req,res)=>{
//     res.send("this is weather page")
// });
app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"no address given"
        })
    }
    geocode(req.query.address,(err,{latitude,longitude,location}={})=>{
        if(err){
            return res.send({err});
        }
        forcast(latitude,longitude,(err,forcastData)=>{
            if(err){
                return res.send({err});
            }
            res.send({
                forcastData:forcastData,
                location:location,
                address:req.query.address
            })
        })
    })

    // res.send({
    //     address:req.query.address
    // })
});

app.get("/product",(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"no query for search item"
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
});

// app.get("/home/*",(req,res)=>{
//     res.send("Home particle not found")
// });

// app.get("*",(req,res)=>{
//     res.send("404 Page not found")
// });
app.get("/home/*",(req,res)=>{
    res.render("404",{
        title:"404 page",
        name:"abhijit mulik",
        errorMessage:"Home page details not found"
    })
});

app.get("*",(req,res)=>{
    res.render("404",{
        title:"404 page",
        name:"abhijit mulik",
        errorMessage:"Page Not Found"
    })
});

app.listen(port,()=>{
    console.log("listing on port "+port);
});