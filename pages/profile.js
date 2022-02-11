import Header from "../componets/Header";
import { Center, HStack, Image, Text, VStack, Flex, Grid, Heading , Tag, TagLabel, TagCloseButton, Button, FormLabel, Input, FormControl} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import {  useSession, getSession } from "next-auth/react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRef } from "react";






const Profile = ({test}) => {
    const [sessionUser, setSessionUser] = useState()
    const [userFromDatabase, setUserFromDatabase] = useState([])
    const {data : session, status} = useSession()
    const fileRef = useRef(null)
    const [fileData, setFileData] = useState()
    const [fileName, setFileName] = useState()
    const isAuthenticated = status === "authenticated"
    const [imgBuffer, setImgBuffer] = useState()
    const axiosConfig = {
        headers : { 'content-type': 'multipart/form-data'  }
    }

    const {register, handleSubmit, formState : {errors}} = useForm()

    const onSubmit = async data => {
        // const formData = new FormData()
        // formData.append('file', fileName)
        // formData.append("name", data.name)
        // formData.append('emailToUpdate', session.user.email)
        data.emailToUpdate = session.user.email
        console.log(data)
        try {
            await axios.post('/api/update', data)
        } catch (error) {
            console.log(error.response.data)
        }

        // try {
        //     await axios.post('/api/update', data, axiosConfig)
        // } catch (error) {
        //     console.log(error.response.data)
        // }
        
        

    }

    const arrayBufferToBase64=(buffer)=> {
        const binary = '';
        const bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };
    const b = ()=>{
        // setImgBuffer('data:image/png;base64,' + arrayBufferToBase64(test.img.data))
        console.log(imgBuffer)
        console.log(test.name)
        console.log(test)
    }
    const handleFileName =(e)=>{
      
            setFileName(e.target.files[0])
            console.log(e.target.files)
            // const formData = new FormData();

            //     Array.from(e.target.files).forEach((file) => {
            //     formData.append(e.target.name, file);
            //     });
            //     console.log(formData)
    }

    // console.log(session)

    useEffect(()=>{
        axios.get("/api/getauser", {params : session?.user.email})
        .then(res=>{
            console.log(res.data)
            setUserFromDatabase(res.data[0])
        })

        // setImgBuffer('data:image/png;base64,' + arrayBufferToBase64(test.img?.data.data))
        // console.log(imgBuffer)
    },[])
    
    if(isAuthenticated) {
        console.log(session.user)
    } else {
        console.log("not authed")
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

    // const listOfGames  = gamesToRender[0].games.map(game=><Text>{game}</Text>)
    const getGames = ()=>{
      
        
    }
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
                <Input id='name' {...register('name')}/>
                <Button type="submit">Tetst</Button>
                </form>
                </VStack>
        </Center>

        <VStack mt="2rem" spacing="3rem" mb="4rem">
            <Heading borderBottom="1px" fontSize="2rem" fontStyle="italic" fontWeight="lighter">{session.user.name}</Heading>
            <Heading as="h1" fontWeight="lighter"  fontSize="2rem" mb="1rem" borderBottom="1px" fontStyle="italic" mt="4rem" onClick={getGames}>Games</Heading>
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


