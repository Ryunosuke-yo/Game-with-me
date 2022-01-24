const mapUser = (user)=>{
    const {uid, email, xa, displayName, photoUrl} = user
    // console.log(uid, email, xa, displayName, photoUrl)
    return {
        id : uid,
        email,
        token : xa,
        name : displayName,
        picUrl : photoUrl
    }
    
}

export default mapUser