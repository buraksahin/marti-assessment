"use strict";

const fs = require("fs");
const express = require("express");
const app = express();
const port = 4000;
var geo = require('./utils/geo/geo-utils');

app.get("/", (req, res) => {
    const raw = fs.readFileSync("./data.json");
    const data = JSON.parse(raw);
    res.send(data);
});

app.get("/getOrderedList", (req, res) => {
    const raw = fs.readFileSync("./data.json");
    const data = JSON.parse(raw);
    
    var geoUtils = new geo.GeoUtils();
    var resultData = geoUtils.getNearestListByFirst(data);

    if(resultData){
        res.send(JSON.parse(resultData));
    }
    else{
        res.send(data);
    }
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});