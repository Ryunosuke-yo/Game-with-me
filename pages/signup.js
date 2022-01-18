import Header from "../componets/Header";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
import { Text, Input, Box, Center, Button } from "@chakra-ui/react";
const Signup = () => {
    return (
        <>
        <Header />
        <Center mt="2rem">
            <Box w="80%">
                <FormControl>
                    <Box>
                        <FormLabel htmlFor='email'>Email address</FormLabel>
                        <Input id='email' type='email' />
                    </Box>

                    <Box>
                        <FormLabel htmlFor='name'>Your Name</FormLabel>
                        <Input id='email' type='name' />
                    </Box>

                    <Box mt="1rem">
                        <FormLabel>Password</FormLabel>
                        <Input id='password' type='password' />
                    </Box>

                    <Box mt="1rem">
                        <FormLabel>Games</FormLabel>
                        <Input id='games' type='' />
                    </Box>
                </FormControl>

                <Center>
                    <Button mt="3rem">Sign up</Button>
                </Center>
            </Box>
        </Center>
        </>
    );
}

export default Signup;
