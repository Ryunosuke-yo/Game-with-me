import {initFirebase} from "../../firebase/initFirebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import {EmailAuthProvider, GithubAuthProvider, GoogleAuthProvider, TwitterAuthProvider, getAuth, onAuthStateChanged, signOut} from "firebase/auth"
import { useEffect, useState } from "react"
import mapUser from "../../firebase/mapUser"
import { setUserCookie, getUserFromCookies, removeUserCookie } from "../../firebase/useCookies"

initFirebase()

const firebaseAuthConfig = {
    signinFlow : "popup",
    signInOptions : [
        {
            provider : EmailAuthProvider.PROVIDER_ID,
            requiredDisplayName : true,
        },
        GoogleAuthProvider.PROVIDER_ID,
        TwitterAuthProvider.PROVIDER_ID,
        GithubAuthProvider.PROVIDER_ID,
    ],
    // signInSuccessUrl: '/',
    credentialHelper : "none",
    callbacks : {
        signInSuccessWithAuthResult : async ({user}, redirectUrl)=>{
            const mappedUser = mapUser(user)
            setUserCookie(mappedUser)
            redirectUrl == "/"
        }
    }
}
const auth = getAuth()

const FirebaseAuthComp = ()=>{
    const [isLoggedIn, setLoggedIn] = useState(false)
    
    const signOutFunc = ()=>{
        signOut(auth).then(()=>{
            console.log("out")
            removeUserCookie()
            setLoggedIn(false)
        }).catch((error) =>{
            console.log(error)
        })
    } 
    useEffect(()=>{
        onAuthStateChanged(auth,(user)=>{
            if(user){
                setLoggedIn(true)
                console.log(auth.currentUser)
                getUserFromCookies()
            } else {
                console.log("not login")
                setLoggedIn(false)
            }
        })
       
        
    },[])
    return (
        <>
        {isLoggedIn ? <div>Logged IN !!</div> :
        <StyledFirebaseAuth uiConfig={firebaseAuthConfig} firebaseAuth={auth}/>
        
        }
        <button onClick={signOutFunc}>out</button>
        </>
    )
}


export default FirebaseAuthComp