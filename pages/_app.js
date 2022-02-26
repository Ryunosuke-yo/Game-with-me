import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { createContext } from 'react'



export const UserContext = createContext()
function MyApp({ Component, pageProps :{ session, ...pageProps} }) {
 

return(
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>

)

}

export default MyApp
