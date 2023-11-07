const assert = require('assert');
const dotenv = require('dotenv')
dotenv.config()

/**
 * Configuration Object
 */
const Configration = {
    // MONGODB CONFIGURATIONS
    MONGOURI: process.env.MONGOURI,
    DATABASENAME: process.env.DATABASENAME,
    PORT: process.env.PORT,
}

/**
 * Assert Configurations
 */
assert(Configration.MONGOURI, 'MONGOURI configuration is required')
assert(Configration.DATABASENAME, 'DATABASENAME configuration is required')
assert(Configration.PORT, 'PORT configuration is required')

/**
 * Export Configurations Object
 */
module.exports = Configration