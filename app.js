const express = require('express');
const port = process.env.PORT || 7070
const router = require('./app/config/routes');

const app = express()
app.set("port", port)

app.use(router)

app.listen(app.get("port"), function(){
    console.log("Server started on port " + app.get("port"))
})

module.exports = app