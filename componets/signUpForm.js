import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Center,
    VStack,
    Text,
    Heading,
    Button
  } from '@chakra-ui/react'

import { useForm } from 'react-hook-form'
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from 'axios'
import { useRef, useState } from 'react'
import { set } from 'mongoose'

const reqMessage = "This field is required"

const schema = yup.object().shape({
    name : yup.string().required(reqMessage).max(20, "20 characters maximum"),
    email : yup.string().email("Not valid email address").required(reqMessage),
    password : yup.string().required(reqMessage).min(5, "Password should be more than 5 characters").max(20, "Password should be less than 20 characters"),
    pic : yup.mixed()
}).required()

const SignUpForm=()=> {
    const fileNameRef = useRef(null)
    const [fileUploaded, setFileUploaded] = useState()
    // const handleFileName = (e)=>{
        
    //     const path = e.current.value
    //     const fName = path.split("\\").reverse()[0]
    //     console.log(fName)
    //     setFileName(fName)
    // }

    const fileHandler = (e)=>{
        setFileUploaded(e.target.files[0])
    }

    const {register, handleSubmit, formState : {errors}} = useForm({
        resolver : yupResolver(schema)
    })
    const onSubmit = data =>{
        console.log(data)
        axios.post("/api/postuser", data)
        .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
        
    }

    const erComp = (er)=><Text textAlign="center" color="red" m="0.5rem 0 1rem 0">{er}</Text>
    return (
    <>  
        <Center mb="1rem">
        <Heading as="h2">Sign Up Here</Heading>
        </Center>
            <Center>
                <VStack>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl>
                        <FormLabel htmlFor='name' borderBottom="1px" textAlign="center">
                        User name
                        </FormLabel>
                    <Input id="name" type="name" {...register("name")}/>
                    {erComp(errors.name?.message)}
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor='email' borderBottom="1px" textAlign="center">
                        Email Address
                        </FormLabel>
                        <Input id="email" type="email" {...register("email")}/>
                        {erComp(errors.email?.message)}
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor='password' borderBottom="1px" textAlign="center">
                        password
                        </FormLabel>
                        <Input id="password" type="password" {...register("password")}/>
                        {erComp(errors.password?.message)}
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor='profile'borderBottom="1px" textAlign="center">
                        Profile
                        </FormLabel>
                        <Input id="profile" type="profile"/>
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor='games' borderBottom="1px" textAlign="center">
                        Games
                        </FormLabel>
                        <Input id="games" type="games"/>
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor='pic' borderBottom="1px" textAlign="center">
                        Upload profile pic
                        </FormLabel>
                        <Center>
                        <label className='italic' onChange={fileHandler}>
                            {fileUploaded ? `${fileUploaded.name}` : "Choose a pic file"}
                            <input id="pic" type="file" className='hidden' accept="image/png, image/gif, image/jpeg" ref={fileNameRef}  {...register("pic")}/>
                        </label>
                        </Center>
                    </FormControl>
                    <Center mt="2rem">
                        <Button type="submit" textAlign="center">Submit</Button>
                    </Center>


                    </form>
                </VStack>
            </Center>
     </>
    )
}

export default SignUpForm