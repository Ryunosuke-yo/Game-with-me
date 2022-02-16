import nextConnect from "next-connect"
import multer from "multer";
import { connectMongoose, fileUpload } from "../../lib/mongodb";


const apiRoute = nextConnect({
    onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
  });

  export const config = {
    api : {
        bodyParser : false
    }
}

  const upload = multer({
    storage : multer.memoryStorage(),
})


const uploadFile = upload.single('file')



apiRoute.use(uploadFile)
apiRoute.post(async (req, res)=>{
  await connectMongoose()
  // console.log(req.body, req.file)
    const obj = new fileUpload ({
      email : req.body.email,
      img : {
        data : req.file.buffer,
        contentType : req.file.mimetype
      }
    })
  
    await obj.save()
 
 
})

export default apiRoute