/**
 * This common file contains all common methods
 * @author sahil <dev.sahilkumar02@gmail.com>
 * @since 2023
 */

/**
 * @uses this function is used to write log messages to the console or mongo logger table
 * @param {string} value 
 * @param {string} module 
 * @param {string || object} label 
 * @param {boolean} mongo 
 */
const writeLog = (value = '', module = 'main', label = 'success') => {
    console.error('\n************************************ ' + module + ' START ' + label + ' *****************************************************');
    console.error(value);
    console.error('\n************************************ ' + module + ' END ' + label + ' *****************************************************\n');
}

/**
 * @uses this function is used to return success the values to display
 * @param {object} res 
 * @param {boolean} status 
 * @param {string} message 
 * @param {string || object} data 
 * @param {int} statusCode 
 * @returns {object} 
 */
const success = (res, status, message, data = '', statusCode = 200) => {
    const finalData = { "success": status, "message": message }
    if (data) { finalData['data'] = data }
    return res.status(statusCode).json(finalData);
}

/**
 * @uses this function is used to return error the values to display
 * @param {object} res 
 * @param {string} message 
 * @param {int} statusCode 
 * @returns {object} 
 */
const error = (res, message, statusCode = 404, data = '') => {
    const finalData = { "success": false, "message": message }
    if (data) { finalData['result'] = data }
    return res.status(statusCode).json(finalData);
}

/**
 * @usage Used to create a logs for the requested URL.
 */
const requestUrlLogger = async (req, res, next) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    var currentdate = new Date();
    var datetime = "Date: " + currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " Time: "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    writeLog(
        {
            source_host: req.hostname,
            url: `${fullUrl}`,
            method: req.method,
            source_ip: req.ip || req.connection.remoteAddress || null,
            user_agent: req.headers['user-agent'] || undefined,
            request_body: req.body || '', // Modify this to access the request body as needed
            request_params: req.params || '', // Modify this to access the request params as needed
            request_datetime: datetime,
        },
        'visiterator_request_logs');
    next()
}

/**
 * Export global modules
 */
global.writeLog = writeLog;
global.successMsg = success;
global.errorMsg = error;
global.urlLogger = requestUrlLogger;
