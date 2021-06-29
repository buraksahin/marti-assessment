var logConst = require("../logger/logger_const");
var logger = require("../logger/logger").Logger;
var geoCalculator = require('./calculator');

var GeoUtils = function () { };

var totalStep = 0;

/**
 * Sorts a list of data by nearest geographic position to the passed parameter position
 * 
 * @param	{JSON}	 data   A list of elements which is inclues geographic positions as latitude and longitude
 * 
 * @return	{JSON} Sorted list
 */
GeoUtils.prototype.getNearest = function (data) {
    var calculate = new geoCalculator.Calculator();

    result = [];

    // Start to find nearest items
    this.getNearestRecursive(data, result);

    // Performance log
    logger.info("Total calculation step is " + totalStep);
    totalStep = 0;

    return JSON.stringify(result);
};

GeoUtils.prototype.getNearestRecursive = function (data, result) {
    var calculate = new geoCalculator.Calculator();

    // Check parameters and set data
    if(result.length == 0 && data.length > 0){
        result.push(data[0]);
        data.shift();
    }

    // Find nearest element to the last element of the result list in data list
    if(data.length > 0){
        // Start point
        var point1 = new geoCalculator.Point(result[result.length - 1]["latitude"], result[result.length - 1]["longitude"]);


        // Set first item as nearest
        var point2 = new geoCalculator.Point(data[0]["latitude"], data[0]["longitude"]);
        var nearestDistance = calculate.distanceBetween(point1, point2);
        var nearestIndex = 0;
        logger.info("Distance from " + result[result.length - 1]["poiName"] + " to " + data[0]["poiName"] + " is " + nearestDistance + "km");

        // Check other items and compare with nearestDistance
        for(var i = 1; i < data.length; i++){
            point2 = new geoCalculator.Point(data[i]["latitude"], data[i]["longitude"]);
            var distance = calculate.distanceBetween(point1, point2);
            logger.info("Distance from " + result[result.length - 1]["poiName"] + " to " + data[i]["poiName"] + " is " + distance + "km");
            if(nearestDistance > distance){
                nearestIndex = i;
                nearestDistance = distance;
            }
            totalStep++;
        }

        // Pop nearest and push to result
        result.push(data[nearestIndex]);
        data.splice(nearestIndex, 1);
        this.getNearestRecursive(data, result);
    }
    totalStep++;
}

/**
 * Sorts a list of data by nearest geographic position which is first element of the list
 * 
 * @param	{JSON}	data A list of elements which is inclues geographic positions as latitude and longitude
 * 
 * @return	{JSON} Sorted list
 */
GeoUtils.prototype.getNearestListByFirst = function (data) {
    return this.getNearest(data);
};

module.exports = {
    GeoUtils: GeoUtils,
};