import nextConnect from "next-connect"
import multer from "multer";
import { Test, connectMongoose, myModel } from "../../lib/mongodb";
import { Mongoose } from "mongoose";


// const apiRoute = nextConnect({
//     // Handle any other HTTP method
//     onNoMatch(req, res) {
//       res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//     },
//   });

//   export const config = {
//     api : {
//         bodyParser : false
//     }
// }

//   const upload = multer({
//     storage : multer.memoryStorage(),
// })


// const uploadFile = upload.single('file')



// apiRoute.use(uploadFile)
// apiRoute.post(async (req, res)=>{
//   // await connectMongoose()
//   // console.log(req.body, req.file)
//   //   const obj = new Test ({
//   //     name : req.body.name,
//   //     img : req.file
//   //   })
  
//   //   await obj.save()
 
//   await connectMongoose()
//   const comingData = req.body
//   console.log(req.body)
//   const doUpdate = await myModel.update({email : comingData.emailToUpdate}, {name : comingData.name, img : req.file})
// })

// export default apiRoute

export default async function(req, res){
  await connectMongoose()
  const comingData = req.body
  console.log(req.body)
  const doUpdate = await myModel.update({email : comingData.emailToUpdate}, {name : comingData.name, img : req.file})
}
