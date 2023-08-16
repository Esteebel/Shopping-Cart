


function signUp(){
    var firstName = document.getElementById('firstName').value
    var lastName = document.getElementById('lastName').value
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    var ConfirmPassword = document.getElementById('ConfirmPassword').value
    var report1 = document.getElementById('report1')
    var report2 = document.getElementById('report2')
    var report3 = document.getElementById('report3')
    var report4 = document.getElementById('report4')
   
    var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var emailResult = regex.test(email)
    var pass =  /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    var realPassword = pass.test(password)
    if(lastName==''){
        report1.innerHTML = 'please kindly fill this input'
        return false

    } else{
        report1.innerHTML=''
    }
    if(firstName==''){
        report2.innerHTML = 'please kindly fill this input'
        return false
    } else{
        report2.innerHTML=''
    }
    if(email==''){
        report3.innerHTML = 'please kindly fill this input'
        return false
    } else{
        report3.innerHTML=''
    }
    if(!emailResult){
        report3.innerHTML ="the email is not valid"
        return false

    }
    else{
        report3.innerHTML = ''
    }
    if(password==''){
        report4.innerHTML = 'password no dey abeg jor'
        return false

    }else{
        report4.innerHTML = ''
    }
    if(!realPassword){
        report4.innerHTML = 'Password not complete'
        return false
    } 
    if(password != ConfirmPassword){
        report4.innerHTML = 'ori e baje. ole'
        return false
    }
    

    else{
        let obj = {
            id: Math.floor(Math.random() * 10000),
            name: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            pass: document.getElementById('password').value
          };
          
          let arr = [];
          if (localStorage.getItem('users') == null) {
            arr.push(obj);
          } else {
            arr = JSON.parse(localStorage.getItem('users'));
            if (arr.some(el => el.email === obj.email)) {
              return alert('Email already exists');
            } else {
              arr.push(obj);
            }
          }
          
        localStorage.setItem('users', JSON.stringify(arr))
        window.location.assign('Login-page.html')
    }
}

function showPassword(p = 'password'){
    var show = document.getElementById('show')
    var hide = document.getElementById('hide')
    var input = document.getElementById('password')

    if(p=='text'){
        input.setAttribute('type', 'text')
        show.classList.add('d-none')
        hide.classList.remove('d-none')
    } else{
        input.setAttribute('type', 'password')
        show.classList.remove('d-none')
        hide.classList.add('d-none')
    }
   
}

function showPassword2(cp = 'password'){
    var showCp = document.getElementById('showCp')
    var hideCp = document.getElementById('hideCp')
    var input2 = document.getElementById('ConfirmPassword')

    if(cp=='text'){
        input2.setAttribute('type', 'text')
        showCp.classList.add('d-none')
        hideCp.classList.remove('d-none')
    } else{
        input2.setAttribute('type', 'password')
        showCp.classList.remove('d-none')
        hideCp.classList.add('d-none')
    }
   
}