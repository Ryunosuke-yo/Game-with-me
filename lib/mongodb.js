
import mongoose  from "mongoose"


const url = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB

//mongoose
export const connectMongoose = ()=>{
    mongoose.connect(url)
}

export const users = new mongoose.Schema(
    {
    name : {
        type : String,
        required : "name is required",
    }, 
    email : {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required'
    },
    password : {
        type : String,
        required : "password is required"
    }, 
    profile : {type : String},
    games :{type: Array},
    }

)



export const myModel = mongoose.models.users || mongoose.model("users", users)


export const fileTest = new mongoose.Schema({
    name : String,
    img : {
        data : Buffer,
        contentType : String
    }
})

export const Test = mongoose.models.fileTest || mongoose.model("fileTest", fileTest)
