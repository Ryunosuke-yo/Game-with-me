import {
    FormControl,
    FormLabel,
    Input,
    Center,
    VStack,
    Text,
    Heading,
    Button,
    Flex,
    InputRightElement,
    InputGroup,
    Tag,
    TagLabel,
    TagCloseButton,
    Grid
  } from '@chakra-ui/react'

import { useForm } from 'react-hook-form'
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import axios from 'axios'
import { useCallback, useRef, useState } from 'react'
import { AddIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { db, initializeDB, storage } from '../lib/firebase'
import {getStorage, ref, uploadBytes} from "firebase/storage"
import { removeCookie, setCookie } from '../lib/useCookie'
import { getFirestore, setDoc, doc } from 'firebase/firestore'


const reqMessage = "This field is required"

const schema = yup.object().shape({
    name : yup.string().required(reqMessage).max(20, "20 characters maximum"),
    email : yup.string().email("Not valid email address").required(reqMessage),
    password : yup.string().required(reqMessage).min(5, "Password should be more than 5 characters").max(20, "Password should be less than 20 characters"),
    profile : yup.string(),
    id : yup.string().required(reqMessage).max(20, "20 characters maximum")
}).required()




const SignUpForm=({toggleForm})=> { 
    const {register, handleSubmit, formState : {errors}} = useForm({
        resolver : yupResolver(schema)
    })
    const router = useRouter()
    const [gameArr, setGameArr] = useState([])
    const gameInpRef = useRef(null)
    const [file, setFile] = useState()
    const [gameError, setGameError] = useState(false)
    const handleGameClick = useCallback(()=>{
        const val = gameInpRef.current.value
       setGameArr([
           ...gameArr,
           val
       ])
        console.log(gameArr)
        
    })

    const handleFile = (e)=>{
        setFile(e.target.files[0])
        
    }


    
    const renderGameTags = gameArr.map((game, i)=>
    {
        const colorSchemes = ["red", "cyan", "blue", "green", "teal", "purple", "pink"]
        const randomIndex = Math.floor(Math.random() * colorSchemes.length) + 1;

        return (
            <Tag size="md" borderRadius='full' variant='outline' colorScheme={colorSchemes[randomIndex]} key={i}>
                <Flex align="center"  direction="row" w="100% " justifyContent="space-between" >
                    <TagLabel>{game}</TagLabel>
                    <TagCloseButton />
                </Flex>
            </Tag>
            )}
    )

    const testR = ()=>{
        router.push("/login")
    }

   
    const auth = getAuth(initializeDB)
    const {currentUser} = auth;
    
    const onSubmit = async data =>{
        if(gameArr.length == 0){
            setGameError(true)
        } else {
            
            data.games = gameArr
            const {name, email, password, profile, games, file} = data
            const metadata = {
                customMetadata : {
                    "userEmail" : `${email}`
                }
            }
            console.log(data)
            
            const storageRef = ref(storage, `user_${data.id}`)
            try {
                const f = await uploadBytes(storageRef, file[0], metadata)
                // const docRef = doc(getFirestore(), "user", data.email)
                const userCre = createUserWithEmailAndPassword(auth, data.email, data.password)
                // const saveUser = addDoc(collection(db, "user"), {
                    //         name : name,
                    //         email : email,
                    //         games : games,
                //         profile : profile,
                //         password : password,
                //     }
                // )

                const saveUser = setDoc(doc(getFirestore(),"user", data.id), {
                    name : name,
                    email : email,
                    games : games,
                    profile : profile,
                    password : password,
                    id : data.id
                })
                
                Promise.all([userCre, saveUser])
                .then(()=>{
                    console.log("upload")
                    onAuthStateChanged(auth, user=>{
                        if(user){
                                setCookie(data.id)
                                router.reload()
                        }
                    })

                })
                // removeCookie()
                // setCookie(data.email)
            } catch (error) {
                console.log(error)
            }
        }
        
    }

    const handleGameEr = ()=>{
        gameArr.length = 0 ? setGameError(true) : null
    }

    const gameErComp = <Center color="red" mt="0.4rem">Please enter at least 1 game</Center>

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
                        <FormLabel htmlFor='id' borderBottom="1px" textAlign="center">
                        UserId
                        </FormLabel>
                    <Input id="id" type="name" {...register("id")}/>
                    {erComp(errors.id?.message)}
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
                        <Input id="profile" type="profile" {...register("profile")}/>
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor='games' borderBottom="1px" textAlign="center">
                        Games
                        </FormLabel>
                        <InputGroup>
                        <InputRightElement children={<AddIcon onClick={handleGameClick} />}/>
                        <Input id="games" type="games" ref={gameInpRef} placeholder={gameArr.length == 0 ? "at least one game" : null}/>
                        </InputGroup>
                        {gameError ? gameErComp : null}
                        <Grid mt="1rem" templateColumns='repeat(3, 1fr)' gap="1em" >
                        {renderGameTags}
                        </Grid>
                    </FormControl>
                        
                    <FormControl>
                        <FormLabel htmlFor='file' borderBottom="1px" textAlign="center">
                        Upload profile pic
                        </FormLabel>
                        <Center>
                        <label className='italic' onChange={handleFile}>
                            {file?.name ? `${file.name}` : "Choose a pic file"}
                            <input id="file" type="file" className='hidden' accept="image/png, image/gif, image/jpeg" {...register("file")}/>
                        </label>
                        </Center>
                    </FormControl>
                    <Center mt="2rem">
                        <Button type="submit" textAlign="center">Submit</Button>
                    </Center>
                    </form>
                    {toggleForm ?   <Text onClick={toggleForm}>close</Text>:null}
                </VStack>
            </Center>
     </>
    )
}

export default SignUpForm