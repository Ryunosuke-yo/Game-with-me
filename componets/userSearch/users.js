import { VStack, HStack, Grid, Badge,  Image, Text, Flex} from "@chakra-ui/react";

const Users = ({u}) => {
    const renderGames =u.games?.map(game=>
            <Badge variant='solid' colorScheme='green'>
            {game}
            </Badge>
        )
        console.log("user desu")
    return (
            <VStack border="1px" w="80%" p="1rem 0 1rem 0" borderColor="grey"borderRadius="10px">
                <Flex justify="start" w="80%">
                    <HStack spacing="16">
                        <Image 
                        borderRadius='full'
                        boxSize='150px'
                        src='https://bit.ly/dan-abramov'
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
