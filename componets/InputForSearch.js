import {Center, Input, VStack} from "@chakra-ui/react"
import { useState } from "react";

const Inputforsearch = ({handleNameInput}) => {

    
    return (
        <Center mb="2rem" mt="2rem">
        <VStack w="90%" spacing="7">
        <Input placeholder="Type username or game" w="80%" onChange={handleNameInput}/>
        {/* <Input placeholder="Search by games" w="80%" onChange={handleGameInput}/> */}
        </VStack>
        </Center>
    );
}

export default Inputforsearch;
