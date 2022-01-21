import { async } from "@firebase/util"
import {doc, getDocs, getFirestore, collection} from "firebase/firestore"
import {fireStore} from "../../firebase/initFirebase"

const ReadData = ()=>{
    const fetching = async ()=>{
        const query = await getDocs(collection(getFirestore(), "myCollection"))
        query.forEach(doc=>{
            console.log(doc.data())
        })

    }
    return (
        <button onClick={fetching}>Read</button>
    )
}

export default ReadData