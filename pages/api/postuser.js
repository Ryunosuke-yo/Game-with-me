import nextConnect from "next-connect"
import multer from "multer";

import {connectMongoose, myModel} from "../../lib/mongodb"




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

// export const config = {
//     api: {
//       bodyParser: false,
//     },
//   };


// const upload = multer({
//     storage : multer.memoryStorage()
// })
// const middleware = upload.single("file")

// const handler = nextConnect({
//     onNoMatch(req, res) {
//         res.status(405).json(({error : `${req.method} not allowed`}))
//     },
// })
// handler.use(middleware)

// handler.post(async (req, res)=>{
//     await connectMongoose()
//     console.log(req.body)
//     const doc = new myModel({
//                     name : req.body.name,
//                     email : req.body.email,
//                     password : req.body.password,
//                     profile : req.body.profile,
//                     games : req.body.games,
//                     file : req.file
//                 });
                

//         await doc.save()
// })


// const handler = nextConnect()
// handler.use(middleware)

// handler.post(async (req, res)=>{
//     console.log("aaa")
//     console.log(req.body)
//     console.log(req.files)
// })



// export default handler