// my API is api.openweathermap.org/data/2.5/weather?id=524901&appid=e693f7e6d53d2c2a268a75d18a56171d
const buttonEl = document.getElementById("searchButton")
const inputEl = document.getElementById("city-input")

const date = new Date();

const yearOfDate = date.getFullYear();
const monthOfDate = date.getMonth() + 1;
const dayOfMonth = date.getDate();

const together = "  on today's forecast " + [dayOfMonth, monthOfDate, yearOfDate].join('/');
console.log(together);

function weatherInfo() {
    const cityName = inputEl.value; 
    //const key = `2451dabb039e62438aa41e0f80395638`;
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=2451dabb039e62438aa41e0f80395638&language=en-US&query=Pikachu&page=1&include_adult=false`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.getElementById("temp").textContent =  data.results.title + "Title";
            document.getElementById("wind").textContent =  data.results.overview + "OVERVIEW";
            document.getElementById("icon").src = data.results[0].poster_path+".jpg";
            
            fetch(`https://api.themoviedb.org/3/search/movie?api_key=2451dabb039e62438aa41e0f80395638&language=en-US&query=Pikachu&page=1&include_adult=false`)
                .then(response => response.json())
                .then(data => {
                    for(i=0;i<10;i++){
                        document.getElementById("day"+(i+1)+"temp").innerHTML="Temperature: " + data.results[i].title; 
                    }
                    for(i=0;i<10;i++){
                        document.getElementById("day"+(i+1)+"wind").innerHTML="Wind: " + data.results[i].overview;
                    }

/*                         for(i=0;i<5;i++){
                            document.getElementById("img" +(i+1)).src = "http://openweathermap.org/img/wn/"+ data.list[i].weather[0].icon+".png";
                    
                    } */
                })
        })
}



buttonEl.addEventListener("click", weatherInfo);
