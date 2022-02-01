import { Box, Text , Center, VStack} from "@chakra-ui/react"
import {signIn, signOut} from "next-auth/react"
import Link from "next/link"



export function SignIn() {


    return (
        <Center mt="1rem">
        <VStack>
        <Text>Or</Text>
        
        <a href={'/api/auth/signin'} onClick={(e)=>{
            e.preventDefault()
            signIn()
          }}>
            Sign In
        </a>
        </VStack>
        </Center>
          )
          
        }
        
        
export function SignOut() {
            return (
                <a onClick={()=>signOut()}>out</a>
                
    )
}