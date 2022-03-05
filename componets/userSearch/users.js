import { VStack, HStack, Grid, Badge,  Image, Text, Flex} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getStorage, ref, deleteObject, getDownloadURL, uploadBytes } from "firebase/storage"

const Users = ({u}) => {
    const [imgUrl, setImgUrl]= useState()
    const renderGames =u.games?.map(game=>
            <Badge variant='solid' colorScheme='green'>
            {game}
            </Badge>
        )
        console.log("user desu")

        useEffect(()=>{
            const getImg = async ()=>{
                const storage = getStorage()
                    const storageRef =  ref(storage, `user_${u.id}`, )
                    const url = await getDownloadURL(storageRef)
                    setImgUrl(url)
                    
                }
                getImg()
            console.log(imgUrl)
        })
    return (
            <VStack border="1px" w="80%" p="1rem 0 1rem 0" borderColor="grey"borderRadius="10px">
                <Flex justify="start" w="80%">
                    <HStack spacing="16">
                        <Image 
                        borderRadius='full'
                        boxSize='150px'
                        src={imgUrl}
                        alt='Dan Abramov'
                        boxSize="50px"
                        />
                        <Text>{u.name}</Text>
                    </HStack>
                </Flex>

                <Grid templateColumns="repeat(3, 1fr)" gap="2" pt="1rem" borderTop="1px" p="1rem">
                {renderGames}
                
                </Grid>
            </VStack>
    );
}

export default Users;
