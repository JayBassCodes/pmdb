
var containerEl = $('.container')
var title = $('#title')
var form = $('#add-movie-form')

function handleFormSubmit(event) {

    event.preventDefault();
    var titleInput = title.val()
    // this will be the title of the movie searched
    console.log(titleInput)
    $.get('http://www.omdbapi.com/?apikey=84baf138&t=' + titleInput, function(data){
        console.log(data);
        console.log(data.Title)       
    })
}

form.on('submit', handleFormSubmit)
