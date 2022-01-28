import { AtSignIcon } from '@chakra-ui/icons'
import Head from 'next/head'
import Header from '../componets/Header'
import Inputforsearch from '../componets/InputForSearch'
import {signIn, useSession, signOut} from "next-auth/react"
import SignUpForm from '../componets/signUpForm'




export default function Home() {
  const {data : session} = useSession()
  return (
    <div>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        <SignUpForm />
        <Inputforsearch />

        <a href={'/api/auth/signin'} onClick={(e)=>{
          e.preventDefault()
          signIn()
        }}>signIn</a>
        <a onClick={()=>signOut()}>out</a>



       {session ? <div>{session.user.name}</div> : null}
      </main>
    </div>
  )
}
