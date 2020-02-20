const project1=document.querySelector("#project4")
project4.addEventListener('mouseover',(e) =>{
    e.preventDefault()
    document.querySelector("#project4txt").innerHTML="<small>Help startup's monitor,post and,implement changes in employee payrolls and status</small> "
})
project4.addEventListener("mouseout", (e)=>{
    e.preventDefault()
    document.querySelector("#project4txt").remove()

});
