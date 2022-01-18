import { Flex, VStack,  Avatar, HStack, Text} from "@chakra-ui/react";
import { Grid, GridItem } from '@chakra-ui/react'

const Games = ({title}) => {
    return (
        <GridItem>
            <Flex>
                <Avatar src='https://bit.ly/sage-adebayo' />
                <HStack ml='3'>
                    <Text fontSize="0.8rem">
                            {title}
                    </Text>
                </HStack>
            </Flex>
        </GridItem>
    );
}

export default Games;
