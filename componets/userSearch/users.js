import { VStack, HStack, Grid, Badge,  Image, Text} from "@chakra-ui/react";

const Users = ({name, img}) => {
    return (
            <VStack border="1px" w="90%" p="1rem 0 1rem 0" borderColor="grey">
                <HStack>
                    <Image 
                    borderRadius='full'
                    boxSize='150px'
                    src='https://bit.ly/dan-abramov'
                    alt='Dan Abramov'
                    boxSize="50px"
                    />
                    <Text>wtanabe tarou</Text>
                </HStack>

                <Grid templateColumns="repeat(4, 1fr)" gap="2" pt="1rem" borderTop="1px">
                <Badge variant='solid' colorScheme='green'>
                    Default
                </Badge>
                
                <Badge variant='solid' colorScheme='green'>
                    Default
                </Badge>

                <Badge variant='solid' colorScheme='green'>
                    Default
                </Badge>

                <Badge variant='solid' colorScheme='green'>
                    Default
                </Badge>

                <Badge variant='solid' colorScheme='green'>
                    Default
                </Badge>

                <Badge variant='solid' colorScheme='green'>
                    Default
                </Badge>

                <Badge variant='solid' colorScheme='green'>
                    Default
                </Badge>

                <Badge variant='solid' colorScheme='green'>
                    Default
                </Badge>

                <Badge variant='solid' colorScheme='green'>
                    Default
                </Badge>
                
                </Grid>
                {/* <Text fontSize="0.8rem" p="0 2rem">
                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are
                </Text> */}
            </VStack>
    );
}

export default Users;
