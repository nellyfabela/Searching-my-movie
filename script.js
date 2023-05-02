var myFavoritesEl = document.getElementById("my-favorites");


//Making my home button go to the initial page
home.addEventListener("click", function(){
    //console.log("hello")
    window.location.replace("index.html")
})

//Making my favorites button go to the favorites page
myfav.addEventListener("click", function(){
    //console.log("hello")
    window.location.replace("myfav.html")
})

//API

const APIKey = "1ca424337ae743a72e4e288f45215245";

async function searchMovies(query) {

  try {

    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&query=${query}`);
    const data = await response.json();
    const movieContainer = document.getElementById("movie-container");

    // Clear any previous results
    movieContainer.innerHTML = "";

    // Display up to 10 results
    const results = data.results.slice(0, 10);
    results.forEach((movie, index) => {

      // Create elements to display movie info
      const movieDiv = document.createElement("div");
      movieDiv.classList.add(
        "flex",
        "items-center",
        "p-14",
        "my-10",
        "mx-48"
      );

      const moviePoster = document.createElement("div");
      moviePoster.classList.add(
        "w-32",
        "h-48",
        "bg-cover",
        "mr-4",
        "flex-none"
      );
      moviePoster.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`;

      const movieText = document.createElement("div");
      movieText.classList.add(
        "flex",
        "flex-col",
        "flex-grow",
        "ml-10"
        );

      const movieTitle = document.createElement("div");
      movieTitle.classList.add(
        "mb-6",
        "flex",
        "flex-start",
        "font-sans",
        "text-2xl",
        "text-white"
      );
      movieTitle.innerHTML = `<h1>${movie.title}</h1>`;

      const movieSynopsis = document.createElement("div");
      movieSynopsis.classList.add(
        "my-4",
        "text-left",
        "font-sans",
        "text-lg",
        "text-white"
      );
      movieSynopsis.innerHTML = `<p>${movie.overview}</p>`;

      const movieFavorite = document.createElement("button");
      movieFavorite.classList.add(
      "bg-transparent",
      "border-0",
      "heart",
      "text-red-500",
      "ml-2",
      "outline-none"
      );
      movieFavorite.innerHTML = '<i class="fa fa-heart-o" aria-hidden="true"></i>';

      movieFavorite.addEventListener("click", function() {

        addToFavorites(movie.title, movie.poster_path, movie.overview);

      });

      // Append elements to movie container
      movieText.appendChild(movieTitle);
      movieText.appendChild(movieSynopsis);

      movieDiv.appendChild(moviePoster);
      movieDiv.appendChild(movieText);
      movieDiv.appendChild(movieFavorite);

      // Change flex direction to row
      movieContainer.appendChild(movieDiv);
      movieContainer.style.display = "flex";
      movieContainer.style.flexWrap = "wrap";
      movieContainer.style.flexDirection = "row";
      movieContainer.style.justifyContent = "flex-start";

    });

  } catch (error) {

    console.error(error);
    
  }
}

function addToFavorites(title, posterPath, synopsis) {

  // Retrive favorites from local storage or create an empty array
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Check if the movie is already in favorites
  const movieInFavorites = favorites.find(

    (movie) => movie.title === title && movie.posterPath === posterPath && movie.synopsis === synopsis

  );

  // If the movie is not in favorites, add it
  if (!movieInFavorites) {

    favorites.push({ title, posterPath, synopsis });
    localStorage.setItem("favorites", JSON.stringify(favorites));

  }

};

function removeFromFavorites(event) {

  const movieDiv = event.target.closest(".movie");
  const title = movieDiv.dataset.title;

  // Remove movie from favorites array in local storage
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const updatedFavorites = favorites.filter((favorite) => favorite.title !== title);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

  // Remove movie from favorites section
  movieDiv.remove();

}

function displayFavorites() {

  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const favoritesContainer = document.getElementById("favorites-container");

  // Clear any previous favorites
  favoritesContainer.innerHTML = "";

  favorites.forEach((favorite) => {

    // Create elements to display favorite movie info
    const favoriteDiv = document.createElement("div");
    favoriteDiv.classList.add(
      "flex",
      "items-center",
      "p-14",
      "my-10",
      "mx-48"
    );

    const favoritePoster = document.createElement("div");
    favoritePoster.classList.add(
      "w-32",
      "h-48",
      "bg-cover",
      "mr-4",
      "flex-none"
    );
    favoritePoster.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${favorite.posterPath})`;

    const favoriteText = document.createElement("div");
    favoriteText.classList.add(
      "flex",
      "flex-col",
      "flex-grow",
      "ml-10"
      );

    const favoriteTitle = document.createElement("div");
    favoriteTitle.classList.add(
      "mb-6",
      "flex",
      "flex-start",
      "font-sans",
      "text-2xl",
      "text-white"
    );
    favoriteTitle.innerHTML = `<h1>${favorite.title}</h1>`;

    const favoriteSynopsis = document.createElement("div");
    favoriteSynopsis.classList.add(
      "my-4",
      "text-left",
      "font-sans",
      "text-lg",
      "text-white"
    );
    favoriteSynopsis.innerHTML = `<p>${favorite.synopsis}</p>`;

    const removeButton = document.createElement("button");
    removeButton.classList.add(
      "bg-transparent",
      "border-0",
      "text-gray-200",
      "ml-2",
      "outline-none"
      );
    removeButton.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';

    removeButton.addEventListener("click", removeFromFavorites);

    // Append elements to favorites container
    favoriteText.appendChild(favoriteTitle);
    favoriteText.appendChild(favoriteSynopsis);

    favoriteDiv.appendChild(favoritePoster);
    favoriteDiv.appendChild(favoriteText);
    favoriteDiv.appendChild(removeButton);
    favoriteDiv.classList.add("movie");

    // Set movie title as a date attribute on the movie element
    favoriteDiv.dataset.title = favorite.title;

    // Append elements to favorites container
    favoritesContainer.appendChild(favoriteDiv);

    // Change flex direction to row
    favoritesContainer.appendChild(favoriteDiv);
    favoritesContainer.style.display = "flex";
    favoritesContainer.style.flexWrap = "wrap";
    favoritesContainer.style.flexDirection = "row";
    favoritesContainer.style.justifyContent = "flex-start";

  });

};

var input = document.querySelector("#movie-input");
var search = document.querySelector("#searchButton");

search.addEventListener("click", function () {

  searchMovies(input.value);

});