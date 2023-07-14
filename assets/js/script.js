
var containerEl = $('.container')
var title = $('#title')
var form = $('#add-movie-form')

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

    })
    function movieStorageFunction(data) {

        var titleStorage = localStorage.getItem("movies")
    
        if (titleStorage === null) {
            titleStorage = [];
        } else {
            titleStorage = JSON.parse(titleStorage)
           
        }
        titleStorage.push(data.Title)
        


        var newTitle = JSON.stringify(titleStorage)
      

        localStorage.setItem("title", newTitle)
       
    }

}


form.on('submit', handleFormSubmit)
