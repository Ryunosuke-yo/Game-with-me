import { getFirestore, collection, setDoc, addDoc } from "firebase/firestore"


const writeData = ()=>{

    const www = async ()=>{
        const sendDoc = await addDoc(collection(getFirestore(), "myCollection"),
        {
            name : "やっとつながった",
            desc : "頼むつながってくれ"
        }    
        )

    }

    return (
        <button onClick={www}>write</button>
    )

}

export default writeData

