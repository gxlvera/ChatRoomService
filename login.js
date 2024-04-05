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

const alerts = document.getElementsByClassName("alertAfterSubmit");
const alertAfterLogin = alerts[0];
const alertAfterRegister = alerts[1];

function showMsg(){
    msg.style.visibility='visible';
}

async function checkAndSubmitLogin(e){
    e.preventDefault();
    msg.style.visibility='hidden';
    alertAfterLogin.style.display = 'none';
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
    // var formDataLogin = new FormData();
    // formDataLogin.append("email",emailLogin.value)
    // formDataLogin.append("password",pwLogin.value)
    // formDataLogin.append("type","login");
    // const response = await fetch('login.php', {
    //     method: 'POST',
    //     body:formDataLogin
    // })
    // if (response.status === 200) {
    //     const responseMsg = await response.text();
    //     console.log(responseMsg);
    //     if (responseMsg == "success"){
    //         window.location.href = "chat.php";
    //         return;
    //     }
    //     showMsg();
    //     msg.innerHTML = responseMsg;
    //     emailLogin.value = "";
    //     pwLogin.value = "";
    // } 
    msg.style.display = 'none';
    alertAfterLogin.style.display = 'inline';
    console.log("show alert")
    loginForm.submit();
}

function checkAndfetchEmail() {

    //reset the msg
    msg.style.display='inline';
    msg.style.visibility = 'hidden';
    alertAfterLogin.style.display = 'none';
    
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

const loginSection = document.getElementById("login");
const registerSection = document.getElementById("register");

toRegister.addEventListener("click", () => {
    loginSection.style.display = 'none';
    registerSection.style.display = 'block';
})

//register
const toLogin = document.getElementById("toLogin");

toLogin.addEventListener("click", () => {
    loginSection.style.display = 'block';
    registerSection.style.display = 'none';
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







