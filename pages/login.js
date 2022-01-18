import { Text, Input, Box, Center, Button } from "@chakra-ui/react";
import Header from "../componets/Header";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'


const Login = () => {
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

                    <Box mt="1rem">
                        <FormLabel>Password</FormLabel>
                        <Input id='password' type='password' />
                    </Box>
                </FormControl>

                <Center>
                    <Button mt="3rem">Log in</Button>
                </Center>
            </Box>
        </Center>
        </>
    );
}

export default Login;
