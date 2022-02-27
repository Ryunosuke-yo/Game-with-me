import { Box, Text , Center, VStack} from "@chakra-ui/react"
import {loggedInContext} from "../pages/index"
import { removeCookie } from "../lib/useCookie"




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
            return (
                <a onClick={()=>{
                  removeCookie()
                }}>out</a>
                
    )
}