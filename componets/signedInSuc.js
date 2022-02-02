import { Text , Center} from "@chakra-ui/react"
import { SignOut } from "./signInOut"


export default function SignedInSuc({name}) {
    return (
        <Center>
        <Text>Hello, {name}</Text>

        <SignOut />
        </Center>
    )
}