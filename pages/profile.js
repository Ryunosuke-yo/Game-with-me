import Header from "../componets/Header";
import { Center, HStack, Image, Text, VStack, Flex, Avatar, Box, Badge, Grid, Heading } from "@chakra-ui/react";
import Games from "../componets/profile/games";
import Footer from "../componets/Footer";


const Profile = () => {



    const gameLIst = ["Apex legends", "popo no boken", "monster Hundter", "GOd of War", "Shadow verse"]

    const renderGames = gameLIst.map(el=><Games title={el}/>)


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
            <Text borderBottom="1px">Tarou Watanabe</Text>
            <Text borderBottom="1px">Age  : 106</Text>
            <Heading as="h1" fontWeight="lighter"  fontSize="2rem" mb="1rem" borderBottom="1px" fontStyle="italic" mt="4rem">Games</Heading>
            <Grid templateColumns="repeat(2, 1fr)" gap={5} >
            {renderGames}
            </Grid>
            <Center>
                <VStack>
                    <Heading as="h3" fontStyle="italic" fontWeight="lighter" borderBottom="1px">Profile</Heading>
                    <Text p="1.2rem" fontStyle="0.5rem">
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, 
                    </Text>
                </VStack>
            </Center>
        </VStack>

        
        </>
    );
}

export default Profile;
