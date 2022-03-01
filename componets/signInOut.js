import { Box, Text , Center, VStack} from "@chakra-ui/react"
import {loggedInContext} from "../pages/index"
import { removeCookie } from "../lib/useCookie"
import { useRouter } from "next/router"




export function SignIn() {
  
  
  return (
        <Center mt="1rem">
        <VStack>
        <Text>Or</Text>
        
        <a href={'/api/auth/signin'} onClick={(e)=>{
          e.preventDefault()
            
          }}>
            Sign In
        </a>
        </VStack>
        </Center>
          )
          
        }
        
        
        export function SignOut() {
            const router = useRouter()
            return (
                <a onClick={()=>{
                  removeCookie()
                  router.reload()
                }}>out</a>
                
    )
}