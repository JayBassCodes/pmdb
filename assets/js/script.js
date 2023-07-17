
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
        console.log(data.Year)
        console.log(data.Poster)

        // change to array of objects when available to do so with stringify
        localStorage.setItem("title", data.Title)
        localStorage.setItem("year", data.Year)
        localStorage.setItem("poster", data.Poster)
    })
}

form.on('submit', handleFormSubmit)


let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slideshow");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
  }
  