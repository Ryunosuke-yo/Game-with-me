import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import {MongoDBAdapter} from "@next-auth/mongodb-adapter"
import {connectMongoose, users} from "../../../lib/mongodb"
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoClient } from "mongodb";


export default NextAuth ({
    providers : [
        GithubProvider({
            clientId : process.env.GITHUB_ID,
            clientSecret : process.env.GITHUB_SECRET,           
        }),
        CredentialsProvider({
            credentials: {
                name: { label: "name", type: "text"},
              },
              async authorize(credentials, req){
                const db = await MongoClient.connect(process.env.MONGODB_URI, {
                    useNewUrlParser: true,
		            useUnifiedTopology: true,
                })

                const colle = db.db().collection("users")
                const user = await colle.findOne({
                    name : credentials.name
                })

                

                if(user){
                    return user
                } else {
                    return null
                }
              }
        })
    ],
    // adapter : MongoDBAdapter(connectMongoose)
})