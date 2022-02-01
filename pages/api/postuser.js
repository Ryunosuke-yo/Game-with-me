
import mongoose from "mongoose"
import multer from "multer"

import {connectMongoose, myModel} from "../../lib/mongodb"



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
        });

        await doc.save()

        res.send("Posted")
    } 
}

// const upload = multer({
//     storage : multer.diskStorage({
//         destination : "./public/uploads",
//         filename : (req, file, cb)=>cb(null, file.originalname)
//     })
// })

// const middleware = upload.array("theFiles")

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
//                     pic : {
//                         data: fs.readFileSync(path.join(__dirname + '/public/uploads/' + req.file.filename)),
//                         contentType: 'image/png'
//                     }
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

// export const config = {
//     api: {
//       bodyParser: false,
//     },
//   };

// export default handler