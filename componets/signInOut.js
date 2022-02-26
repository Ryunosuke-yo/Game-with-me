import { Box, Text , Center, VStack} from "@chakra-ui/react"
import {loggedInContext} from "../pages/index"




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
                <a onClick={()=>{
                  signOut()
                }}>out</a>
                
    )
}