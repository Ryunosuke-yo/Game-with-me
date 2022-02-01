
import mongoose from "mongoose"
import multer from "multer"
import { flushSync } from "react-dom"
import {connectMongoose, myModel} from "../../lib/mongodb"

const 

export default async (req, res)=> {
    // await mongoose.connect(process.env.MONGODB_URI)

    connectMongoose()
    if (req.method === "POST") {
        console.log("post")

        console.log(req.body)

        const doc = new myModel({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            pic : {
                data : fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename))
            }
        });

        await doc.save()

        res.send("Posted")
    } 
}