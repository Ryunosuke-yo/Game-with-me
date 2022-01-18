import { Center, HStack, Image, Text, VStack, Stack, Divider, Badge, GridItem, Grid } from "@chakra-ui/react";
import Footer from "../componets/Footer";
import Header from "../componets/Header";
import { Input } from '@chakra-ui/react'
import Users from "../componets/userSearch/users";
import Inputforsearch from "../componets/InputForSearch";


const Searchuser = () => {
    return (
        <>
            <Header />
            <Inputforsearch />

            <Center mb="3rem">
            <VStack w="100%">
                <Users />
                <Users />
                <Users />
                <Users />
                <Users />
                <Users />
            </VStack>
            </Center>
        </>
    );
}

export default Searchuser;
