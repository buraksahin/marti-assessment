/**
 * Log to console
 * 
 * @author  buarksahin
 */

var Logger = (exports.Logger = {});

/**
 * Log
 * 
 * @param	{String} message Log message content
 */
Logger.log = function(message) {
    var message = new Date().toISOString() + " [LOG] : " + message + "\n";
    console.log(message);
};

/**
 * Warning log
 * 
 * @param	{String} message Log message content
 */
 Logger.warn = function(message) {
    var message = new Date().toISOString() + " [WARN] : " + message + "\n";
    console.warn(message);
};

/**
 * Info log
 * 
 * @param	{String} message Log message content
 */
 Logger.info = function(message) {
    var message = new Date().toISOString() + " [INFO] : " + message + "\n";
    console.info(message);
};

/**
 * Error log
 * 
 * @param	{String} message Log message content
 */
 Logger.error = function(message) {
    var message = new Date().toISOString() + " [ERROR] : " + message + "\n";
    console.error(message);
};

/**
 * Debug log
 * 
 * @param	{String} message Log message content
 */
 Logger.debug = function(message) {
    var message = new Date().toISOString() + " [DEGBUG] : " + message + "\n";
    console.debug(message);
};