import nextConnect from "next-connect";
import multiparty from "multiparty"

const middleware = nextConnect()

middleware.use(async (req, res, next)=>{
    console.log("koko")
    const form = new multiparty.Form()
    console.log(form)
    await form.parse(req, function(err, fields, files){
        console.log(fields)
        req.body = fields
        req.files = files
        next()
    })
})

export default middleware