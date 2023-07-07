require('dotenv').config()

const config = {
        host: process.env.HOST,
        db: process.env.DB,
        username: process.env.DB_USERNAME,
        password:process.env.DB_PASSWORD,
        dialect: "mysql"
}


module.exports = config
