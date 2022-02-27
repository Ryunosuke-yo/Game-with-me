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
        return null
    } else {
        // const o = JSON.parse(isCookie)
        console.log(isCookie)
        return isCookie
        
    }
}


export const removeCookie = ()=>{
    Cookies.remove("auth")
}
