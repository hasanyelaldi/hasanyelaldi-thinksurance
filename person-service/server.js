const express = require('express')
const app = express()
const port = 4000

app.use(express.json())
app.use('/', require('./routes/person'));

app.listen(port, () => {
    console.log(`Person Service listening on port ${port}`)
})

module.exports = app;