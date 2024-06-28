const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose");
const app = express()
const PORT = process.env.PORT
require('dotenv').config()
app.use(cors())
app.use(express.json())

// DB Connection
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("db Connected")
}).catch(() => console.log("DB Connection Failed"))


// SignUp Model 

const signUpModel = mongoose.model("signUpModel", { userName: String, pswd: String, phoneNumber: Number, userMail: String }, "userData")



app.post('/signup', (req, res) => {
    let { userName, pswd, phoneNumber, userMail } = req.body

    signUpModel.find({ userName: userName }).then((retData) => {



        if (retData) {
            console.log("already added")
        }
        else{
            const NewUser = new signUpModel(
                {
                    userName: userName,
                    pswd: pswd,
                    phoneNumber: phoneNumber,
                    userMail: userMail,
    
                }
    
            )
            NewUser.save().then(() => console.log("added"))
        }



        



    })


    // let {userName,pswd,phoneNumber,userMail} = req.body




})

// product Db Model Creation
// const productModel = mongoose.model("productModel", { itemName: String, newPrice: Int, oldPrice: Int, sizeVariation: String, itemDescription: String, itemImg: String }, "productList")



app.listen(PORT, () => {
    console.log("server Started !!")
})