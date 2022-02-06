import Header from "../componets/Header";
import { Center, HStack, Image, Text, VStack, Flex, Grid, Heading , Tag, TagLabel, TagCloseButton, Button} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import {  useSession, getSession } from "next-auth/react";
import axios from "axios";
import { render } from "react-dom";





const Profile = () => {
    // const [rawUser, setRawUSer] = useState([]) 
    const [sessionUser, setSessionUser] = useState()
    const [gamesToRender, setGamesToRender] = useState([])
    const {data : session, status} = useSession()
    const isAuthenticated = status === "authenticated"

    console.log(session)

    useEffect(()=>{
        axios.get("/api/getauser")
        .then(res=>{
            console.log(res.data)
            setGamesToRender(res.data)
        })

        // const get = async ()=>{
        //     await connectMongoose()
        //     const docs = await myModel.find({email : session?.user.email})

        //     setGamesToRender(docs.games)
        // }

        // get()
    },[])
    
    if(isAuthenticated) {
        console.log(session.user)
    } else {
        console.log("not authed")
    }
   
    
    const listOfGames = gamesToRender[0]?.games.map((game, i)=>
       { 
        const colorSchemes = ["red", "cyan", "blue", "green", "teal", "purple", "pink"]
        const randomIndex = Math.floor(Math.random() * colorSchemes.length) + 1;


       return(<Tag size="md" borderRadius='full' variant='outline' colorScheme={colorSchemes[randomIndex]} key={i}>
                <Flex align="center"  direction="row" w="100% " justifyContent="space-between" >
                    <TagLabel>{game}</TagLabel>
                    <TagCloseButton />
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
            <Image
                borderRadius='full'
                boxSize='150px'
                src='https://bit.ly/dan-abramov'
                alt='Dan Abramov'
                boxSize="200px"
                />
        </Center>

        <VStack mt="3rem" spacing="3rem" mb="4rem">
            <Heading borderBottom="1px" fontSize="2rem" fontStyle="italic" fontWeight="lighter">{session.user.name}</Heading>
            <Heading as="h1" fontWeight="lighter"  fontSize="2rem" mb="1rem" borderBottom="1px" fontStyle="italic" mt="4rem" onClick={getGames}>Games</Heading>
            <Grid templateColumns="repeat(2, 1fr)" gap={5} >
            {listOfGames}
            </Grid>
            <Center>
                <VStack>
                    <Heading as="h3" fontStyle="italic" fontWeight="lighter" borderBottom="1px">Profile</Heading>
                    <Text p="1.2rem" fontStyle="0.5rem">
                   {/* {rawUser.profile} */}
                    </Text>
                </VStack>
            </Center>
        </VStack>

        
        </>
    );
}

// export async function getServerSideProps(req, res){
//     await connectMongoose()
//     console.log("connected")
//     const session = await getSession({req})
//     // const docs = await myModel.find({email : session.user.email})
//     console.log(session)
    
//     // res.send("a")
//     return {
//         props : {
//             rawUser : "a"
//         }
//     }
// }



export default Profile;
