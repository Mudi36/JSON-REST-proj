const slidepage = document.querySelector(".slide-page");
const nextBtnFirst = document.querySelector(".firstNext");
const prevBtnsec = document.querySelector(".prev-1");
const nextBtnsec = document.querySelector(".prev-1");
const prevBtnThird = document.querySelector(".prev-2");
const nextBtnThird = document.querySelector(".prev-2");
const prevBtnFourth = document.querySelector(".prev-3");
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullet = document.querySelectorAll(".step .bullet");
let current = 1;

nextBtnFirst.addEventListener("click", function(event){
    event.preventDefault();
    slidepage.style.margin-left = "-25%"
    bullet [current - 1]. classList.add("active")
    progressCheck [current - 1].classList.add("active")
    progressText [current - 1].classList.add("active")
    current += 1;
})

nextBtnsec.addEventListener("click", function(event){
    event.preventDefault();
    slidepage.style.margin-left = "-50%"
    bullet [current - 1]. classList.add("active")
    progressCheck [current - 1].classList.add("active")
    progressText [current - 1].classList.add("active")
    current += 1;
})

nextBtnThird.addEventListener("click", function(event){
    event.preventDefault();
    slidepage.style.margin-left = "-75%"
    bullet [current - 1]. classList.add("active")
    progressCheck [current - 1].classList.add("active")
    progressText [current - 1].classList.add("active")
    current += 1;
})

prevBtnsec.addEventListener("click", function(event){
    event.preventDefault();
    slidepage.style.margin-left = "0%"
    bullet [current - 2]. classList.remove("active")
    progressCheck [current - 2].classList.remove("active")
    progressText [current - 2].classList.remove("active")
    current -= 1;
})

prevBtnThird.addEventListener("click", function(event){
    event.preventDefault();
    slidepage.style.margin-left = "-25%"
    bullet [current - 2]. classList.remove("active")
    progressCheck [current - 2].classList.remove("active")
    progressText [current - 2].classList.remove("active")
    current -= 1;
})

prevBtnFourth.addEventListener("click", function(event){
    event.preventDefault();
    slidepage.style.margin-left = "-50%"
    bullet [current - 2]. classList.remove("active")
    progressCheck [current - 2].classList.remove("active")
    progressText [current - 2].classList.remove("active")
    current -= 1;
})


function sendEmail(){
    const templateParams = {
        name : document.querySelector("#name").value, 
        email : document.querySelector("#email").value, 
        subject : document.querySelector("#subject").value, 
        message : document.querySelector("#message").value, 
    };

    emailjs
    .send("service_ta659gq", "template_05m5cl1", templateParams)
    .then(()=> alert("Email sent succesfully").catch(()=>alert("Email not sent")));
        
