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

app.get("/nearest", (req, res) => {
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

app.get("/getNearestLocations/:lat/:lon", (req, res) => {
    const raw = fs.readFileSync("./data.json");
    const data = JSON.parse(raw);
    
    var geoUtils = new geo.GeoUtils();
    var lat = req.params.lat;
    var lon = req.params.lon;
    if(lat && lon){
        var resultData = geoUtils.getNearestListByPosition(lat,lon,data);
        if(resultData){
            res.send(JSON.parse(resultData));
        }
    }
    else{
        res.send(data);
    }
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});