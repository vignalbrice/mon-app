// API/TMDBApi.js

const API_TOKEN = "1732b3fa8edd72c5c4fafff4a6eeceec";
export const API_PICTURE = "7d936fbec26e80007b94e365e5c098c749702ed8eaa7040e1db71ce73bbb8d96";
//Récupération des films a partir de la recherche
export function getFilmsFromApiWithSearchedText(text, page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text +
     '&page=' + page
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.error(error))
}
//Récupération des images des films par le nom
export function getImageFromApi(name){
    return 'https://image.tmdb.org/t/p/w300' + name
}
//Récupération du détails des films
 export function getFilmDetails(id){
     const url = 'https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr'
     return fetch(url)
         .then((response) => response.json())
         .catch((error) => console.error(error))
    }
// Récupération des meilleurs films
export function getBestFilmsFromApi (page) {
    return fetch('https://api.themoviedb.org/3/discover/movie?api_key=' + API_TOKEN + '&vote_count.gte=1000&sort_by=release_date.desc&language=fr&page=' + page)
      .then((response) => response.json())
      .catch((error) => console.error(error));
  }
// Récupération des derniers films en salle
export function getLatestFilmsFromApi(page) {
    return fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=' + API_TOKEN + '&language=fr-FR&page=' + page)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}
// Récupération des films à venir
export function getUpComingFilmsFromApi(page) {
    return fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=' + API_TOKEN + '&language=fr-FR&page=' + page)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}
// Récupération des vidéos ou trailer du film
export function getMoviesVideosOrTrailerFromApi(id){
    return fetch('https://api.themoviedb.org/3/movie/'+id+'/videos?api_key='+ API_TOKEN +'&language=en-EN')
    .then((response) => response.json())
    .catch((error) => console.error(error));
}
// Récupération des films par tri 
export const getMoviesDiscoverBySort = (page, sort_by) =>{
    return fetch('https://api.themoviedb.org/3/discover/movie?api_key='+ API_TOKEN +'&language=fr-FR&sort_by='+ sort_by +'&include_adult=false&include_video=true&page='+ page)
    .then(response => response.json())
    .catch(error => console.error(error))
}
// Récupération des genres des films 
export const getMoviesGender = () =>{
    return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_TOKEN}&language=fr`)
    .then(response => response.json())
    .catch(error => console.error(error))
}
//Récupération des films par genres
export const getMoviesByGender = (page, gender) =>{
    return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_TOKEN}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${gender}`)
    .then(response => response.json())
    .catch(error => console.error(error))
}
//Récupération des utilisateurs randoms
export const getRandomApi = (page) =>{
    return fetch(`https://reqres.in/api/users?page=${page}`)
    .then(response => response.json())
    .catch(error => console.error(error))
}
//Récupération des détails des utilisateurs
export const getRandomDetailUserApi = (id) =>{
    return fetch(`https://reqres.in/api/users?id=${id}`)
    .then(response => response.json())
    .catch(error => console.error(error))
}

export const getRandomPostsForUsers = (albumId) =>{
    return fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
    .then(response => response.json())
    .catch(error => console.error(error))
}