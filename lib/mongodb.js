
import mongoose  from "mongoose"


const url = process.env.MONGODB_URI
const dbName = process.env.MONGODB_DB

//mongoose
export const connectMongoose = ()=>{
    mongoose.connect(url)
}

export const userS = new mongoose.Schema(
    {
    name : String, 
    games : Array,
    desc : String,
    age : String
    }
)



export default mongoose.models.users || mongoose.model("users", userS)

