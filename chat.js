

var user ="";

async function fetchMsg(){
    var time=Math.floor(Date.now());
    var response = await fetch("chatmsg.php"+"?time="+time);
    response = await response.json()
    console.log(response);
    if (response.length==1){
        //no recent msg
        return 
    }
    user = response[0];
    const data = response[1];
    const msgContainer = document.getElementById("msg-container");
    msgContainer.innerHTML = "";
    for (var i = 0;i<data.length;i++){
        const msg = document.createElement("span");
        msg.innerHTML = `<p>`+data[i].person+`</p>`
        +`<p id="time">`+data[i].time+`</p>`
        +`<p>`+data[i].message+`</p>`;

        const msgBox = document.createElement("div");
        msgBox.setAttribute("id", data[i].time);
        if (data[i].person == user){
            msgBox.className='msg-right';
        } else {
            msgBox.className='msg-left';
        }
        msgBox.appendChild(msg);
        msgContainer.appendChild(msgBox);
    }
}
const button = document.getElementById("send-msg");
button.addEventListener("click",sendMsg);

const msg = document.getElementById("message");

async function sendMsg(e){
   e.preventDefault();
    if (msg.value ==""){
        return
    } 
    var time=Date.now();
    var formData = new FormData();
    formData.append("message",msg.value);  
    formData.append("time",time) 

    let response = await fetch("chatmsg.php", {
        method: "POST",
        body:formData
    })
 
    response = await response.text();
    

    console.log(response)

    fetchMsg();
    

}

const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click",logout);

fetchMsg();

const intervalId = setInterval(fetchMsg, 5000);

async function logout(){
    var time = Date.now();
    try{
        let response = await fetch("login.php"+"?action=signout")
        if (response.redirected){
            window.location.href = response.url;
        }
        
    } catch (e){
        console.log(e);
    }
    clearInterval(intervalId);
}

var timePass = 0;

function checkTime(){
    var lastMsgBox = document.querySelector('#msg-container div:last-child');
    if (lastMsgBox == null){
        return 30000;
    }
    const lastTime = lastMsgBox.id;
    console.log("lastTime: ",lastTime);
    console.log("Date now:" ,Date.now())
    return (Date.now() - lastTime);
}

function updateTime(isInitialCall=false){
    if (isInitialCall){
        timePass = 0;
    } else{
        timePass = checkTime();
        console.log("timePass",timePass);
    }
    if (timePass<30000){
        setTimeout(updateTime, 30000-timePass)
    } else {
        logout();
    }
}

updateTime(isInitialCall = true);










