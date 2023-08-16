function SubmitLogin(){
    var password =document.getElementById('password').value
    var email =document.getElementById('email').value

    var loginData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    }

    let usersData = JSON.parse(localStorage.getItem('users'))
    let obj = {}
    let loginStatus = false

    usersData.some(item=>{
        if(item.email==loginData.email && item.pass == loginData.password){
            localStorage.setItem("authUser", JSON.stringify(item))
            loginStatus = true
            obj = item
        }
    })

    if(loginStatus){
        window.location.assign('Shopping-cart.html')
    } else{
        alert('you have no account with us. Kindly sign up')
        window.location.assign('Sign-up.html')
    }
}