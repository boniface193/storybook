const mongoose = require('mongoose')

const connect_DB = async () => {
    try {
       const conn = await mongoose.connect(process.env.CONNECT_DB, {
            useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
        })
        console.log(`Database Connection esterblished ${conn.connection.host}`)
    } catch (error) {
        console.error(error)
        process.exit()
    }

}
module.exports = connect_DB