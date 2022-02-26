// import {connectMongoose, fileUpload} from "../../lib/mongodb"
// import { getSession } from "next-auth/react"

// export default async function(req, res){
//     const db = await connectMongoose()
//     const session = await getSession({req})

//     const docs = await fileUpload.find({email : req.query["0"]})

//     res.json(docs)
// }