const server = require('./src/app.js')
const { conn } = require('./src/db')
const { PORT } = process.env

conn.sync({ force: false }).then(() => {
    server.listen(PORT, () => {
        console.log(`server listening port ${PORT}`)
    })
})