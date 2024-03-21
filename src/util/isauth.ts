const auth = () =>{
    var res = null
    var token = localStorage.getItem('token')
    var authorization = localStorage.getItem('authorization')
    var user = localStorage.getItem('user')
    if(token!=null && authorization !=null && user != null){
        res = {
            token,
            authorization,
            user
        }
    }
    return res
}

export default auth