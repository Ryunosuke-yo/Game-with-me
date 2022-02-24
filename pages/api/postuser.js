import nextConnect from "next-connect"
import multer from "multer";

// import {connectMongoose, myModel} from "../../lib/mongodb"




export default async function(req, res){
    await connectMongoose()
    const userData = req.body

    const doc = new myModel({
        name : userData.name,
        email : userData.email,
        password : userData.password,
        games : userData.games,
        profile : userData.profile
    })

    await doc.save()
}

