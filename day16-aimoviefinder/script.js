const buttons=document.querySelectorAll("button")
//here buttons is an array since there r 5 buttons
const moviecontainer=document.getElementById("movie-container")
//how u will access each tag
buttons.forEach(btn=>{
  btn.addEventListener('click',()=>{
    const mood=btn.dataset.mood
    fetchmovie(mood)
  });
});

//task 2 is search movies based on mood
async function fetchmovie(moviename){
  moviecontainer.innerHTML="<h2>Loading....</h2>"
  let url=`http://www.omdbapi.com/?t={moviename}&apikey=7e753fd7`
  const response=await fetch(url)
  const data=await response.json()
  displaymovie(data.Search)
}

//task 3 display movie details on webpage
function displaymovie(movies){
  moviecontainer.innerHTML="";
  movies.forEach(movie=>{
    const card=document.createElement("div")
    card.classList.add("movie-card")
    card.innerHTML=`
    <img src="${movie.Poster}">
    <div class="movie-info">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    </div>
    `
    moviecontainer.appendChild(card)

  })
}