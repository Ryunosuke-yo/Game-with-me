import Header from "../componets/Header";
import { Center, HStack, Image, Text, VStack, Flex, Grid, Heading , Tag, TagLabel, TagCloseButton, Button, FormLabel, Input, FormControl, Icon, InputGroup, InputRightElement, Box} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { EditIcon,  AddIcon} from "@chakra-ui/icons";
import Link from "next/link";
import { getAuth } from "firebase/auth";
import { db, initializeDB } from "../lib/firebase";
import { collection, query, where, getDocs, getFirestore, getDoc  } from "firebase/firestore";
import { getCookie } from "../lib/useCookie";
import { getStorage, ref, deleteObject, getDownloadURL, list } from "firebase/storage"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"


const schema = yup.object().shape({
    name : yup.string().max(20, "20 characters maximum"),
    email : yup.string().email("Not valid email address"),
    password : yup.string().min(6, "Password should be more than 6 characters").max(20, "Password should be less than 20 characters"),
    profile : yup.string()
})


const Profile = () => {
    const [userFromDatabase, setUserFromDatabase] = useState()
    const fileRef = useRef(null)
    const [gameArr, setGameArr] = useState()
    const [fileName, setFileName] = useState()
    const [imgBuffer, setImgBuffer] = useState()
    const [inputField, setInputFiled] = useState(false)
    const [userPIc, setUserPic] = useState()
    const [imgUrl, setImgUrl] = useState()
    useEffect(()=>{
        initializeDB

         if(getCookie){
             const getUser = async ()=>{
                 
                 const userCol = collection(getFirestore(), "user")
                 const q = query(userCol, where("email", "==", getCookie()));
                 // console.log(userDocs)
                const user = await getDocs(q)
                user.forEach(u=>setUserFromDatabase(u.data()))
                setGameArr(userFromDatabase.games)
                console.log(user)
                
                console.log(userFromDatabase)             
            }
            getUser()
        }
    },[])
    useEffect(()=>{
        const getImg = async ()=>{
            const storage = getStorage()
            if (userFromDatabase !== undefined){
                const i = userFromDatabase.email
                const storageRef =  ref(storage, `user_${i}`, )
                const url = await getDownloadURL(storageRef)
                setImgUrl(url)
                console.log(url)
                
            }
    
        }
        getImg()

    })
    const {register, handleSubmit, formState : {errors}} = useForm({
        resolver : yupResolver(schema)
    })

    const onSubmit = async data => {
        data.games = gameArr
        const {name, email, password, profile, games, file} = data
        const validateData = (key)=>{
            if(key !== undefined){
                return key
            } else {
                return null
            }
        }
        
        const userObj = {
            [validateData(name)] : name,
            [validateData(email)] : email,
            [validateData(password)] : password,
            [validateData(profile)] : profile,
        }
        
    }

    const handleFileName =(e)=>{
            setFileName(e.target.files[0])
            // console.log(e.target.files)
    }
      
    const listOfGames = userFromDatabase?.games.map((game, i)=>
       { 
        const colorSchemes = ["red", "cyan", "blue", "green", "teal", "purple", "pink"]
        const randomIndex = Math.floor(Math.random() * colorSchemes.length) + 1;


       return(<Tag size="md" borderRadius='full' variant='outline' colorScheme={colorSchemes[randomIndex]} key={i}>
                <Flex align="center"  direction="row" w="100% " justifyContent="center" >
                    <TagLabel>{game}</TagLabel>
                </Flex>
            </Tag>)
    }
    )

    const renderGameTags = userFromDatabase?.games.map((game, i)=>
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


    const renderInputField = 
    <>
    <Center mt='2rem' mb='8rem'>
    <VStack spacing='2rem'>

    <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
            <FormLabel htmlFor="name" textAlign='center' fontStyle='italic'>Name</FormLabel>
            <Input placeholder={userFromDatabase?.name} id='name' variant='flushed' fontStyle='italic' fontWeight="lighter" {...register("name")}/>
        </FormControl>

        <FormControl>
            <FormLabel htmlFor="email"  textAlign='center' fontStyle='italic' >email</FormLabel>
            <Input variant='flushed' placeholder={userFromDatabase?.email} id='email' variant='flushed' fontStyle='italic' fontWeight="lighter" {...register("email")}/>
        </FormControl>

        <FormControl>
            <FormLabel htmlFor="email"  textAlign='center' fontStyle='italic' >games</FormLabel>
            <InputGroup>
            <Input variant='flushed' placeholder='edit your games' id='games' variant='flushed' fontStyle='italic' fontWeight="lighter"/>
            <InputRightElement children={<AddIcon />}/>
            </InputGroup>
            <Grid mt="1rem" templateColumns='repeat(3, 1fr)' gap="1em" >
            {renderGameTags}
            </Grid>
        </FormControl>

        <FormControl>
            <FormLabel htmlFor="email"  textAlign='center' fontStyle='italic' >profile</FormLabel>
            <Input variant='flushed' placeholder={userFromDatabase?.profile} id='profile' variant='flushed' fontStyle='italic' fontWeight="lighter" {...register("profile")}/>
        </FormControl>
        <Button type="submit">Update</Button>
    </form>

    </VStack>
    </Center>
    </>





    const displayInfo = 
    <>
    <VStack mt="2rem" spacing="3rem" mb="4rem">
    <Heading borderBottom="1px" fontSize="2rem" fontStyle="italic" fontWeight="lighter">{userFromDatabase?.name}</Heading>
            <Heading as="h1" fontWeight="lighter"  fontSize="2rem" mb="1rem" borderBottom="1px" fontStyle="italic" mt="4rem">Games</Heading>
            <Grid templateColumns="repeat(2, 1fr)" gap={5} >
            {listOfGames}
            </Grid>
            <Center>
                <VStack>
                    <Heading as="h3" fontStyle="italic" fontWeight="lighter" borderBottom="1px">Profile</Heading>
                    <Text p="1.2rem" fontStyle="0.5rem"> 
                   {userFromDatabase?.profile}
                    </Text>
                </VStack>
            </Center>
    </VStack>
    </>

    return (
        <>
        <Header />
        <Center mt="2rem">
        <VStack>
            <Image
                borderRadius='full'
                boxSize='150px'
                src={imgUrl}
                alt='No profile pic'
                boxSize="200px"
                mb="1rem"
                />
                <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl  >
                <FormLabel size="md" fontSize="md" fontWeight="thin" p="0.8rem" fontStyle="italic" htmlFor="file" textAlign="center" onChange={handleFileName}>
                {fileName ? `${fileName.name}` : "Add profile pic"}
                    <input id="file" type="file" className='hidden' accept="image/png, image/gif, image/jpeg" ref={fileRef}
                {...register('file')}/>
                </FormLabel>
                </FormControl>
                </form>
                </VStack>
                
        </Center>
        <Center>
        <Icon as={EditIcon} mt='1rem' onClick={()=>setInputFiled(prev=>!prev)}></Icon>
        </Center>
            {inputField ? renderInputField : displayInfo}
        </>
    );
}


export default Profile;


