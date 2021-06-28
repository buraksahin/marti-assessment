var logConst = require("../logger/logger_const");
var logger = require("../logger/logger").Logger;
var geoCalculator = require('./calculator');

var GeoUtils = function () { };

/**
 * Sorts a list of data by nearest geographic position to the passed parameter position
 * 
 * @param	{Object} position Geographic position with latitude and longitude
 * @param	{JSON}	 data   A list of elements which is inclues geographic positions as latitude and longitude
 * 
 * @return	{JSON} Sorted list
 */
GeoUtils.prototype.getNearest = function (position, data) {
    var calculate = new geoCalculator.Calculator();

    // Keep index and distance as key value pair
    const Struct = (...keys) => ((...v) => keys.reduce((o, k, i) => { o[k] = v[i]; return o }, {}))
    const Item = Struct('index', 'distance');
    var distances = [];

    // Calculate all distances and push to list with index of data
    for (var i = 0; i < data.length; i++) {
        var destination = new geoCalculator.Point(data[i]["latitude"], data[i]["longitude"]);
        distances[i] = Item(i,calculate.distanceBetween(position, destination));
    }

    // sort by name
    distances.sort(function (a, b) {
        if (a.distance < b.distance) {
            return -1;
        }
        if (a.distance > b.distance) {
            return 1;
        }
        return 0;
    });

    // Prepare ordered Json data
    var result = [];

    for(var i = 0; i < distances.length; i++){
        result.push(data[distances[i].index]);
    }

    return JSON.stringify(result);
};

/**
 * Sorts a list of data by nearest geographic position which is first element of the list
 * 
 * @param	{JSON}	data A list of elements which is inclues geographic positions as latitude and longitude
 * 
 * @return	{JSON} Sorted list
 */
GeoUtils.prototype.getNearestListByFirst = function (data) {
    var pivotPosition = new geoCalculator.Point(data[0]["latitude"], data[0]["longitude"]);
    return this.getNearest(pivotPosition, data);
};

/**
 * Sorts a list of data by nearest geographic position to parameterized with latitude and longitude parameters
 * 
 * @param	{Number}	latitude  Geographic positon as latitude
 * @param	{Number}	longitude Geographic positon as longitude
 * @param	{JSON}	    data      A list of elements which is inclues geographic positions as latitude and longitude
 * 
 * @return	{JSON} Sorted list
 */
GeoUtils.prototype.getNearestListByPosition = function (latitude, longitude, data) {
    var pivotPosition = new geoCalculator.Point(latitude, longitude);
    logger.log(JSON.stringify(pivotPosition));
    return this.getNearest(pivotPosition, data);
};

module.exports = {
    GeoUtils: GeoUtils,
};