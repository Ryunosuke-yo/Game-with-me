import {connectMongoose,myModel} from "../../lib/mongodb"


export default async  (req, res)=>{
    const db = await connectMongoose()
    console.log("connected")

    
   
    
    const docs = await myModel.find({})

    res.json(docs)
}
