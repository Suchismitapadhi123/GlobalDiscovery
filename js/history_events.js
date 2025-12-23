document.addEventListener('DOMContentLoaded', function() {
    var searchInput = document.querySelector('.search-input');
    var searchBtn = document.querySelector('.search-btn');
    var background = document.querySelector('.background');
    var eventContainer = document.querySelector('.event-container');
    var textContainer = document.querySelector('.text-container');
    var spinnerContainer = document.querySelector('.spinner-container');
    
    // Hide the spinner initially
    spinnerContainer.style.display = 'none';
  
    searchInput.addEventListener('input', function() {
        if (searchInput.value === '') {
            textContainer.classList.add('visible');
        } else {
            textContainer.classList.remove('visible');
        }
    });


    searchInput.addEventListener("keyup", (e) =>{
        e.preventDefault();
        if(e.key === 'Enter'){
            // console.log(e.target.value)
            // checkWeather(searchBox.value);
            searchBtn.click();
        }
    })


  
    searchBtn.addEventListener('click', function() {
        var searchText = searchInput.value.trim();
  
        if (searchText !== '') {
            showSpinner(); // Show the spinner
            fetchEvents(searchText)
            .then(function(events) {
                hideSpinner(); // Hide the spinner

                if (events && events.length > 0) {
                    eventContainer.innerHTML = ''; // Clear previous events

                    events.forEach(function(event) {
                        var eventElement = createEventElement(event);
                        eventContainer.appendChild(eventElement);
                    });

                    textContainer.style.display = 'none'; // Hide the text container
                } else {
                    console.error('No events found in the response.');
                }
            })
            .catch(function(error) {
                hideSpinner(); // Hide the spinner
                console.error('Error:', error);
            });
        }
    });
  
    function showSpinner() {
        spinnerContainer.style.display = 'block'; // Show the spinner
    }
  
    function hideSpinner() {
        spinnerContainer.style.display = 'none'; // Hide the spinner
    }
    
    function fetchEvents(text) {
        var url = 'https://api.api-ninjas.com/v1/historicalevents?text=' + encodeURIComponent(text);
  
        return fetch(url, {
            method: 'GET',
            headers: {
                'X-Api-Key': 'PoKp4GH5L/UIace9sShpzw==aKEYlrn2oeKRRpTS',
                'Content-Type': 'application/json'
            }
        })
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(function(result) {
            var events = result;

            if (events && events.length > 0) {
                return events;
            } else {
                console.error('No events found in the response.');
                return [];
            }
        })
        .catch(function(error) {
            console.error('Error:', error);
            return [];
        });
    }

    function createEventElement(event) {
        var eventDiv = document.createElement("div");
        eventDiv.classList.add("event");
    
        var eventLeftDiv = document.createElement("div");
        eventLeftDiv.classList.add("event-left");
    
        var eventDateDiv = document.createElement("div");
        eventDateDiv.classList.add("date");
        eventDateDiv.textContent =event.day + '.' + event.month + '.' + event.year;
    
        eventLeftDiv.appendChild(eventDateDiv);
        eventDiv.appendChild(eventLeftDiv);
    
        var eventRightDiv = document.createElement("div");
        eventRightDiv.classList.add("event-right");
    
        var eventDescription = document.createElement("div");
        eventDescription.classList.add("event-description");
        eventDescription.textContent = event.event;
        eventRightDiv.appendChild(eventDescription);
    
        eventDiv.appendChild(eventRightDiv);
    
        return eventDiv;
    }
    
});








var fix = document.querySelector(".me")
 const change = document.querySelector(".navbar")
 const body = document.querySelector("body")
 const mobile_nav = document.querySelector(".button");
 const nav_header = document.querySelector(".header");






 const togglenavbar = () =>{
  nav_header.classList.toggle("active") ;
 

};

mobile_nav.addEventListener("click", ()=> togglenavbar());