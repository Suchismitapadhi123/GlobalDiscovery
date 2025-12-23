var fix = document.querySelector(".me")
const change = document.querySelector(".navbar")
const body = document.querySelector("body")
const mobile_nav = document.querySelector(".button");
const nav_header = document.querySelector(".header");
const foot = document.querySelector(".footer")

const togglenavbar = () =>{
    nav_header.classList.toggle("active") ;
    // if(fix.style.position === 'relative'){
    //     fix.style.position === 'fixed' ; 
    // } else{
    //     fix.style.position=== 'relative'
    // } 
    fix.style.overflow == "hidden" ;
     
    // html.style.position = "fixed";
  
};

mobile_nav.addEventListener("click", ()=> togglenavbar());



