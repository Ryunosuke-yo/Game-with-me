import { AtSignIcon } from '@chakra-ui/icons'
import Head from 'next/head'
import Header from '../componets/Header'
import Inputforsearch from '../componets/InputForSearch'
import {signIn, useSession, signOut} from "next-auth/react"
import SignUpForm from '../componets/signUpForm'
import { SignOut, SignIn } from '../componets/signInOut'
import { Center, Text, VStack } from '@chakra-ui/react'
import SignedInSuc from '../componets/signedInSuc'
import { createContext, useCallback, useEffect } from 'react'
import {connectMongoose, myModel} from "../lib/mongodb"
import Users from '../componets/userSearch/users'
import { useState } from 'react'
import axios from 'axios'


export default function Home({user}) {
  const {data : session} = useSession()
  if(session){
    console.log(session.user)
  }
  // console.log(user)
  
  const [searchInput, setSearchInput] = useState()
  const [searchedUser, setSearchedUser] = useState(null)
    const [userData, setUserData] =useState(user)
    
    const renderUsers = searchedUser ?  searchedUser.map(u=>
      <Users u = {u}/>
      ) : 
      null
      
      
      useEffect(()=>{
        setSearchedUser(userData)
      },[])

    
  const handleNameInput = e =>{
  //   setSearchInput(e.target.value)
  //   console.log("call", searchInput)

  //   axios.get("/api/users")
  // .then((res)=>{

  //   // console.log(searchedUser)
    
  // })
  // .catch(err => {
  //   console.error(err);
  // });
  const filtered = userData.filter(user=>{

    const isGamesIncludes = user.games.some((game)=>game.includes(e.target.value))

     return isGamesIncludes ? user : user.name.includes(e.target.value)
}
)
  console.log(searchedUser)
  setSearchedUser(filtered)
}

  const handleGameInput = ()=>{

  }
  

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        {session ? <SignedInSuc name={session.user.name} /> : 
        <>
        <SignUpForm />
        <SignIn />
        </>
        }
        <Inputforsearch handleNameInput={handleNameInput}/>
        <Center mb="2rem">
          <VStack>
              {renderUsers}
          </VStack>
        </Center>
      </main>
      </>
  )
}

export async function getServerSideProps() {
  await connectMongoose()
  console.log("fetched")
  
  const findUsers = await myModel.find({})
  return {
            props : {
                user : JSON.parse(JSON.stringify(findUsers))
            }
        }
} 