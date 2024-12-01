

var user ="";

fetchMsg();

const intervalId = setInterval(fetchMsg, 5000);

async function fetchMsg(){
    
    var time=Date.now();
    console.log("currenttime",time);
 
    var response = await fetch("chatmsg.php"+"?time="+time);
    console.log(response.status);
    if (!response.ok){
        console.log("session expire");
        window.location.href="login.php";
        return;
    }
    response = await response.json()
    console.log(response);
    if (response.length!=4){
        //no recent msg
        return 
    }
    user = response[0];
    const data = response[1];
    const msgContainer = document.getElementById("msg-container");
    msgContainer.innerHTML = "";
    for (var i = 0;i<data.length;i++){
        const msgTime = getTime(parseInt(data[i].time));  
        const name = data[i].person.split('@')[0]; 
   
        const msg = document.createElement("div");
        msg.setAttribute("class", "msg-body");
   
        msg.innerHTML = `<span>`+name+`</span>`
        +`<span>`+msgTime+`</span>`
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
    msgContainer.scrollTop = msgContainer.scrollHeight;
    console.log("current",response[2]);
    console.log("last",response[3]);
    
}

function getTime(time){
    const date = new Date(time)
    let hour = check(date.getHours());
    let minute = check(date.getMinutes());
    let second = check(date.getSeconds());

    function check(i){
        if (i<10){
            return "0"+i;
        } else{
            return i;
        }
    }
    return `${hour}:${minute}:${second}`;
}

const button = document.getElementById("send-msg");
button.addEventListener("click",sendMsg);

const msg = document.getElementById("message");

async function sendMsg(e){
   e.preventDefault();
   const msgValue = msg.value.replace(/\\n/g, '\n');
  
    if (msgValue.trim() ==""){
        msg.value="";
        return
    } 
    var time=Date.now();
    var formData = new FormData();
    formData.append("message",msgValue);  
    formData.append("time",time) 
    
    let response = await fetch("chatmsg.php", {
        method: "POST",
        body:formData
    })
    response = await response.text();
    console.log(response)
    msg.value="";
    fetchMsg();
}

const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click",logout);



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
        return 120000;
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
    if (timePass<120000){
        setTimeout(updateTime, 120000-timePass)
    } else {
        logout();
    }
}

// updateTime(isInitialCall = true);










