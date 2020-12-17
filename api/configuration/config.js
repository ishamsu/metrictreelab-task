require('dotenv').config()
const { Pool } = require('pg')

// db connection poool
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
const pool = new Pool({
    connectionString: connectionString,
})

execute()

async function execute() {
    try {

        await pool.connect()
    } catch (ex) {
        logger.error(`Something wrong happend ${ex}`)
    }
}

module.exports = pool;