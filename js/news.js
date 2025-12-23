
    
const API_KEY = "3b9db194935241365ccd6d3bb7119877";
const url = "https://gnews.io/api/v4/search?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    try {
        const res = await fetch(`${url}${query}&token=${API_KEY}`);
        const data = await res.json();
        bindData(data.articles);
    } catch (error) {
        console.log('Error fetching news:', error);
    }
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.image) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.image;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    // newsSource.innerHTML = `${article.source} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.querySelector(".search-btn")
const searchText = document.querySelector(".search-input")





searchText.addEventListener("keyup", (e) =>{
    e.preventDefault();
    if(e.key === 'Enter'){
        // console.log(e.target.value)
      
        searchButton.click();
    }
})

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});



const mobile_nav = document.querySelector(".button");
const nav_header = document.querySelector(".header");




const togglenavbar = () =>{
    nav_header.classList.toggle("active") ;
    // if(fix.style.position === 'relative'){
    //     fix.style.position === 'fixed' ; 
    // } else{
    //     fix.style.position=== 'relative'
    // } 
    // fix.style.overflow == "hidden" ;
     
    // html.style.position = "fixed";
  
};

mobile_nav.addEventListener("click", ()=> togglenavbar());

window.alert("If the website is not working then don't worry.API limit reach for the day.Try again tomorrow.")
