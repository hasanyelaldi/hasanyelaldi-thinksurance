const express = require('express')
const app = express()
const port = 5000

app.use(express.json())
app.use('/', require('./routes/array'));

app.listen(port, () => {
    console.log(`Array Service listening on port ${port}`)
})

module.exports = app;