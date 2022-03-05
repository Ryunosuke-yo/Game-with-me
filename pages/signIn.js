import { Text, Input, Box, Center, Button } from "@chakra-ui/react";
import Header from "../componets/Header";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from 'react-hook-form'
import {initializeDB} from "../lib/firebase"
import { getFirestore, setDoc, doc, collection, query, where, getDocs } from 'firebase/firestore'
import { async } from "@firebase/util";
import { setCookie } from "../lib/useCookie";
import { useRouter } from 'next/router'

const SignIn = () => {
    initializeDB

    const {register, handleSubmit, formState : {errors}} = useForm()
    const router = useRouter()

    const onSubmit = (data)=>{
        const auth = getAuth()
        const {email, password} = data

        signInWithEmailAndPassword(auth, email, password)
        .then(userCre =>{
            const getUser = async()=>{
                const userCol = collection(getFirestore(), "user")
                const q = query(userCol, where("email", "==", userCre.user.email));
                // console.log(userDocs)
                const user = await getDocs(q)
                user.forEach(u=>{setCookie((u.data().id))})
                console.log(userCre.user.email)
                router.push("/")
            }

            getUser()
        })
    }
    
    return (
        <>
        <Header />
        <Center mt="2rem">
            <Box w="80%">
                <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <Box>
                        <FormLabel htmlFor='email'>Email address</FormLabel>
                        <Input id='email' type='email' {...register("email")}/>
                    </Box>

                    <Box mt="1rem">
                        <FormLabel>Password</FormLabel>
                        <Input id='password' type='password' {...register("password")}/>
                    </Box>
                </FormControl>

                <Center>
                    <Button mt="3rem" type="submit">Log in</Button>
                </Center>
                </form>
            </Box>
        </Center>
        </>
    );
}

export default SignIn;
