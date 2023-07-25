const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { log } = require("console");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});


app.post("/", function (req, res) {
    const api_key = "live_9TYotZivfNvzIrXlr0mmLTQcrdOxVkq3oiFx1CrVE3eja4eg1xc1q73abJD9BnV8";
    const n_cats = req.body.n_cats;
    const breed = req.body.breed;
    const url = "https://api.thecatapi.com/v1/images/search?limit=" + n_cats + "&breed_ids=" + breed + "&api_key=" + api_key;
    https.get(url, function (response) {
        let responseData ="";
        response.on("data", function (data) {
            console.log(data);
            
            responseData += data;
        });
        response.on("end", function() {
            const catData = JSON.parse(responseData);
            console.log(responseData);
            // const CatImage = catData[1].url;
            // res.send("<img href=\"" + CatImage + "\" />");
        })
    })
});


app.listen(3000, function () {
    console.log("server has started on 3000");
});