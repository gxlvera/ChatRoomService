//login
const emailFormat = '^[^@]+@connect\.hku\.hk$'

const submitLogin = document.getElementById('submitLogin');
submitLogin.addEventListener('click', checkAndSubmitLogin);


const msg = document.getElementById('alertMsgLogin');

const emailLogin = document.getElementById('emailLogin');
const pwLogin = document.getElementById('passwordLogin');

emailLogin.addEventListener('blur',checkAndfetchEmail);

const loginForm = document.getElementById('loginForm');

const formWidhth = loginForm.offsetWidth;
const formHeight = loginForm.offsetHeight;
const innerBox = document.getElementById('inner-box');
innerBox.style.transform=`translate(${-formWidhth/2}px,${-formHeight/2}px)`;

function showMsg(){
    msg.style.visibility='visible';
}

function checkAndSubmitLogin(e){
    e.preventDefault();

    if (!emailLogin.value.match(emailFormat)){
        showMsg();
        msg.innerHTML = "Please enter a valid HKU @connect.hku.hk email";
        return
    }

    if(emailLogin.value == "" && pwLogin.value==""){
        showMsg();
        msg.innerHTML = "Missing email address and password!";
        return
    } 
    if (emailLogin.value == ""){
        showMsg();
        msg.innerHTML = "Missing email address!";
        return 
    } 
    if (pwLogin.value==""){
        showMsg();
        msg.innerHTML = "Please provide the password!";
        return
    }
   
    loginForm.submit();
}

function checkAndfetchEmail(){
    //reset the msg
    msg.style.visibility = 'hidden';
    
    if (!emailLogin.value.match(emailFormat)){
        showMsg();
        msg.innerHTML = "Please enter a valid HKU @connect.hku.hk email";
        return
    }
    fetch('check.php'+'?email='+emailLogin.value)
    .then(response => {
        if (response.status == 200){
            response.text()
            .then( data => {
                if (data==0){
                    showMsg();
                    msg.innerHTML = "Can't find your email record";
                }
                });
        } else {
            console.log("HTTP return status: "+response.status);
        }
    })
    .catch( err => {
        console.log(err);
        });
}
const toRegister = document.getElementById("toRegister");

const registerForm = document.getElementById("registerForm");
toRegister.addEventListener("click", () => {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
})

//register
const toLogin = document.getElementById("toLogin");
toLogin.addEventListener("click", () => {
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
})

const submitRegister = document.getElementById('submitRegister');
submitRegister.addEventListener('click', checkAndSubmitRegister);

const msgR = document.getElementById('alertMsgRegister');

const emailRegister = document.getElementById('emailRegister');
const pwRegister = document.getElementById('passwordRegister');
const repeatPw = document.getElementById('repeatPassword');

emailRegister.addEventListener('blur',checkEmailRegister);

function checkEmailRegister(){
    try{
        msgR.style.visibility = 'hidden';
        if (!emailRegister.value.match(emailFormat)){

            msgR.style.visibility = 'visible';
            msgR.innerHTML = "Please enter a valid HKU @connect.hku.hk email";
            return
        }
        fetch('check.php'+'?email='+emailRegister.value)
        .then(response => {
            if (response.status == 200){
                response.text()
                .then( data => {
                    if (data==1){
                        msgR.style.visibility = 'visible';
                        msgR.innerHTML = "You have registered before!";
                    }
                    });
            } else {
                console.log("HTTP return status: "+response.status);
            }
        })
        .catch( err => {
            console.log(err);
            });
    } catch(e){

    }
}

function checkAndSubmitRegister(e){
    e.preventDefault();
    if(emailRegister.value == "" && pwRegister.value==""){
        msgR.style.visibility="visible";
        msgR.innerHTML = "Missing email address and password!";
        return
    } 
    if (emailRegister.value == ""){
        msgR.style.visibility="visible";
        msgR.innerHTML = "Missing email address!";
        return 
    } 
    if (pwRegister.value==""){
        msgR.style.visibility="visible";
        msgR.innerHTML = "Please provide the password!";
        return
    }
    if (repeatPw.value==""){
        msgR.style.visibility="visible";
        msgR.innerHTML = "Please confirm password!";
        return
    }
    if (pwRegister.value != repeatPw.value){
        msgR.style.visibility="visible";
        msgR.innerHTML = "Missmatch passwords!";
        return
    }
    if (!emailRegister.value.match(emailFormat)){
        return
    }
    registerForm.submit();
}







