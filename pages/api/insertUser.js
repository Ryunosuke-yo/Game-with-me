import { client, db } from "../../lib/mongodb"

export default async  (req, res)=>{
    await client.connect()
    console.log("connected")

    const collection = await db.collection("user")

    const insertResult = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);

    

}