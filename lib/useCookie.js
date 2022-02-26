import Cookies from "js-cookie";

export const setCookie = (user)=>{
    Cookies.set("auth", user, {
        expires : 1/24
    })
}

export const getCookie = ()=>{
    const isCookie = Cookies.get("auth")
    if(!isCookie){
        console.log("no cookie")
    } else {
        console.log(JSON.parse(isCookie))
        return isCookie
        
    }
}

