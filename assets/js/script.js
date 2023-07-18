
var containerEl = $('.container')
var title = $('#title')
var form = $('#add-movie-form')

var apiKey = 'YEBouhN5RukCyERPNcZSdTGb6K5fRKkf1rR0QbE8';
var endpoint = 'https://api.watchmode.com/endpoint';

function checkStream(id) {
    $.get(`https://api.watchmode.com/v1/title/${id}/sources/?apiKey=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        console.log(data);
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
    
}


function handleFormSubmit(event) {

    event.preventDefault();
    var titleInput = title.val()
    // this will be the title of the movie searched
    console.log(titleInput)
    $.get('http://www.omdbapi.com/?apikey=84baf138&t=' + titleInput, function (data) {
        console.log(data);
        console.log(data.Title)
        console.log(data.Year)
        console.log(data.Poster)
        // change to one array being saved with objects with title, year, and poster values inside
        movieStorageFunction(data)
        checkStream(data.imdbID)

    })
    function movieStorageFunction(data) {

        var titleStorage = JSON.parse(localStorage.getItem("movie")) || [];
        var newMovie = {
            title:data.Title,
            year:data.Year,
            poster:data.Poster,
            id:data.imdbID
        }

        titleStorage.push(newMovie)





        localStorage.setItem("movie", JSON.stringify(titleStorage))

    }

}


form.on('submit', handleFormSubmit)