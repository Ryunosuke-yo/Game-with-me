
import mongoose  from "mongoose"


const url = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB

//mongoose
export const connectMongoose = ()=>{
    mongoose.connect(url)
}

export const userS = new mongoose.Schema(
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
    // pic : {
    //     data: Buffer,
    //     contentType: String
    // }
    games :{type: Array},
    profile : {type : String},
    }

)



export const myModel = mongoose.models.users || mongoose.model("users", userS)

// module.exports = mongoose.models.users || mongoose.model("users", userS)

