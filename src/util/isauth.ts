const auth = () =>{
    var res = null
    var token = localStorage.getItem('token')
    var authorization = localStorage.getItem('authorization')
    if(token!=null && authorization !=null){
        res = {
            token,
            authorization
        }
    }
    return res
}

export default auth