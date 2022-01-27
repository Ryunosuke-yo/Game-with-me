import {client, connectMongoose, Schema, createModel, model, userS, userModel, user} from "../../lib/mongodb"


export default async  (req, res)=>{
    const db = await connectMongoose()
    console.log("connected")

    
   
    
    const docs = await user.find({})

    res.json(docs)
}
