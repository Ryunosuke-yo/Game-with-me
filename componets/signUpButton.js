import {Center, Text} from "@chakra-ui/react"

export default function SignUpButton ({toggleForm}){
    return (
        <Center>
            <Text onClick={toggleForm}>Sign up</Text>
        </Center>

    )
}