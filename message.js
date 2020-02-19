const btn=document.querySelector("#btn")
const message=document.querySelector("#message")
const name=document.querySelector("#fname")
const email=document.querySelector("#mail_")
const msg=document.getElementById("msg")
btn.addEventListener('click',(e) =>{
    e.preventDefault()
    document.querySelector(".container").getElementsByClassName.background= "#b85880"
    if( name.value===''|| email.value===''){
        msg.classList.add("error")
        msg.innerHTML="*Please fill in both your name and email"
    }
    else if(message.value===''){
        msg.classList.add("error")
        msg.innerHTML="*Please enter a message to Submit"
    }
    else{
        messageContent.textContent = message.value
        msg.innerHTML="Thank You for your feedback!"
        msg.getElementsByClassName.color="blue"
        message.value=''
    }
})