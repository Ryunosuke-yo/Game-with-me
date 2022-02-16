import {connectMongoose,myModel} from "../../lib/mongodb"
import { getSession } from "next-auth/react"


export default async  (req, res)=>{
    const db = await connectMongoose()
    const session = await getSession({req})
    
    const docs = await myModel.find({email : req.query["0"]})

    res.json(docs)
}
