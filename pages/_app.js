import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import {SessionProvider} from "next-auth/react"
import { createContext } from 'react'



export const UserContext = createContext()
function MyApp({ Component, pageProps :{ session, ...pageProps} }) {
 
  return (
    <SessionProvider session={session}>
      <UserContext.Provider value={session}>
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
    </UserContext.Provider>
    </SessionProvider>
  )
}

export default MyApp
