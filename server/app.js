const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bodyparser = require("body-parser")


const app =express()



app.listen(3000,function(){
    console.log("server running....")
})