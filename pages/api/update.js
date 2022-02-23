
import { getSession } from "next-auth/react";
import { connectMongoose, myModel } from "../../lib/mongodb";


export default async function(req, res){
  await connectMongoose()
  const comingData = req.body
  console.log(req.body)

   
  const doUpdate = await myModel.update({email : comingData.emailToUpdate}, 
    {
    name : comingData.name,
    email : comingData.email, 
    profile : comingData.profile
    })


}
