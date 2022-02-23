import Header from "../componets/Header";
import { Center, HStack, Image, Text, VStack, Flex, Grid, Heading , Tag, TagLabel, TagCloseButton, Button, FormLabel, Input, FormControl, Icon, InputGroup, InputRightElement, Box} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import {  useSession, getSession } from "next-auth/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { EditIcon,  AddIcon} from "@chakra-ui/icons";
import Link from "next/link";






const Profile = ({test}) => {
    const [sessionUser, setSessionUser] = useState()
    const [userFromDatabase, setUserFromDatabase] = useState([])
    const {data : session, status} = useSession()
    const fileRef = useRef(null)
    const [fileData, setFileData] = useState() 
    const [fileName, setFileName] = useState()
    const isAuthenticated = status === "authenticated"
    const [imgBuffer, setImgBuffer] = useState()
    const [inputField, setInputFiled] = useState(false)
    const [userPIc, setUserPic] = useState()
    const axiosConfig = {
        headers : { 'content-type': 'multipart/form-data'  }
    }

    const {register, handleSubmit, formState : {errors}} = useForm()

    const onSubmit = async data => {
        data.emailToUpdate = session.user.email
        const formData = new FormData()
        formData.append('file', fileName)
        formData.append('email', session.user.email)
        console.log(data)
        try {
            const updateUser = axios.post('/api/update', data)
            const postImg = axios.post('/api/postimg', formData, axiosConfig)
            const res = await Promise.all([updateUser,postImg])
        } catch (error) {
            console.log(error.response.data)
        }
    }

    const arrayBufferToBase64=(buffer)=> {
        const binary = '';
        const bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };
    const b = ()=>{
        // setImgBuffer('data:image/png;base64,' + arrayBufferToBase64(test.img.data))
        // console.log(imgBuffer)
        // console.log(test.name)
        // console.log(test)
    }
    const handleFileName =(e)=>{
      
            setFileName(e.target.files[0])
            // console.log(e.target.files)
            // const formData = new FormData();

            //     Array.from(e.target.files).forEach((file) => {
            //     formData.append(e.target.name, file);
            //     });
            //     console.log(formData)
    }

    // console.log(session)

    useEffect(async ()=>{
        const getUser = axios.get("/api/getauser", {params : session?.user.email})
        const getPic = axios.get("/api/getpic", {params : session?.user.email})
        const res = await Promise.all([getUser, getPic])
        setUserFromDatabase(res[0].data[0])
        console.log(res)


        setImgBuffer('data:image/png;base64,' + arrayBufferToBase64(res[1].data[0]?.img.data.data))
        // console.log(imgBuffer)
    },[])
    
    if(isAuthenticated) {
        // console.log(session.user)
    } else {
        // console.log("not authed")
    }
   
    
    const listOfGames = userFromDatabase.games?.map((game, i)=>
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

    const renderGameTags = userFromDatabase.games?.map((game, i)=>
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
        <Input placeholder={userFromDatabase.name} id='name' variant='flushed' fontStyle='italic' fontWeight="lighter" {...register("name")}/>
        </FormControl>

        <FormControl>
        <FormLabel htmlFor="email"  textAlign='center' fontStyle='italic' >email</FormLabel>
        <Input variant='flushed' placeholder={userFromDatabase.email} id='email' variant='flushed' fontStyle='italic' fontWeight="lighter" {...register("email")}/>
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
        <Input variant='flushed' placeholder={userFromDatabase.profile} id='profile' variant='flushed' fontStyle='italic' fontWeight="lighter" {...register("profile")}/>
        </FormControl>
        <Button type="submit">Update</Button>
        <Link href="/api/auth/[...nextauth]">
            <a>sss</a>
        </Link>
    </form>

    </VStack>
    </Center>
    </>





    const displayInfo = 
    <>
    <VStack mt="2rem" spacing="3rem" mb="4rem">
    <Heading borderBottom="1px" fontSize="2rem" fontStyle="italic" fontWeight="lighter">{session.user.name}</Heading>
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
                src={imgBuffer}
                alt='Dan Abramov'
                boxSize="200px"
                mb="1rem"
                onClick={b}
                />
                <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl  >
                <FormLabel size="md" fontSize="md" fontWeight="thin" p="0.8rem" fontStyle="italic" htmlFor="file" textAlign="center" onChange={handleFileName}>
                {fileName ? `${fileName.name}` : "Add profile pic"}
                    <input id="file" type="file" className='hidden' accept="image/png, image/gif, image/jpeg" ref={fileRef}
                {...register('file')}/>
                </FormLabel>
                </FormControl>
                {/* <Input id='name' {...register('name')}/>
                <Button type="submit">Tetst</Button> */}
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

// export async function getServerSideProps(req, res){
//     connectMongoose()
//     const docs = await Test.find({name : "test"})
    
    
    
//     return {
//         props : {
//             test : JSON.parse(JSON.stringify(docs[0]))
//         }
//     }
// }



export default Profile;


