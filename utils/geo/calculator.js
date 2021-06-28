var logConst = require("../logger/logger_const");
var logger = require("../logger/logger").Logger;

/**
 * Geographic point as latitude and longitude
 * 
 * @param	{Number} latitude  Value of the latitude
 * @param	{Number} longitude Value of the longitude
 */
var Point = function (latitude, longitude) {
	this.lat = new Number(latitude);
	this.lon = new Number(longitude);
};

var Calculator = function () { };

/**
 * Converts to radian
 * 
 * @param	{Number} value Value to be converted
 * 
 * @return	{Number} Radian result of the converted value
 */
Calculator.prototype.toRad = function (value) {
	return value * Math.PI / 180;
};

/**
 * Calcultes distance between Points
 * 
 * @param	{Point}	Point1 Geo Locaiton includes latitude and longitude.
 * @param   {Point}	Point2 Geo Locaiton includes latitude and longitude.
 * 
 * @return	{Number} Distance of the Points as km
 */
Calculator.prototype.distanceBetween = function (point1, point2) {
	// Check parameters
	if(point1 == null || point2 == null){
		logger.warn("{Calculator}.{distanceBetween}(" + JSON.stringify(point1) + ', ' + JSON.stringify(point2) + ') ' + logConst.NULL_PARAM);
		return 0;
	}

	// Radius of the earth in: 1.609344 miles, 6371 km R = (6371 / 1.609344);
	var R = 3958.7558657440545;
	var dLat = this.toRad(point2.lat - point1.lat);
	var dLon = this.toRad(point2.lon - point1.lon);
	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(this.toRad(point1.lat)) * Math.cos(this.toRad(point2.lat)) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c;

	return d * 1.609344;
};

module.exports = {
	Point: Point,
	Calculator: Calculator
};