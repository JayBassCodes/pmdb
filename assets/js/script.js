
var containerEl = $('.container')
var title = $('#title')
var form = $('#add-movie-form')

var apiKey = 'YEBouhN5RukCyERPNcZSdTGb6K5fRKkf1rR0QbE8';
var endpoint = 'https://api.watchmode.com/endpoint';

function checkStream(id) {
    fetch(`https://api.watchmode.com/v1/title/${id}/sources/?apiKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            // Handle the response data
            var uniqueData = removeDuplicates(data);
            console.log(uniqueData);
        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });

    function removeDuplicates(data) {
        let unique = [];
        data.forEach(element => {
            let found = unique.find(uniqueElement => {
                if (element.source_id == uniqueElement.source_id) {
                    return true;
                } else {
                    return false;
                }
            })
            if (found == undefined) {
                unique.push(element)
            }

        });
        return unique;
    }
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
            title: data.Title,
            year: data.Year,
            poster: data.Poster,
            id: data.imdbID
        }

        titleStorage.push(newMovie)





        localStorage.setItem("movie", JSON.stringify(titleStorage))

    }

}


form.on('submit', handleFormSubmit)


let slideIndex = 0;
showSlides(slideIndex);

function plusSlides(n) {
    ``
    showSlides(slideIndex += n);
}

// // variable for pulling data from local storage
var movieStorage = JSON.parse(localStorage.getItem("movie")) || [];


function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slideshow");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";

  }
  


function createSlides(data) {
    console.log("create slides fired")
    console.log(data)
    var slideshowContainer = document.querySelector(".slideshow")
    console.log(slideshowContainer)
    data.forEach((movieStorage) => {

        var slide = document.createElement('div');
        slide.classList.add('slide');

        var slideHeader = document.createElement('h2');
        slideHeader.textContent = movieStorage.title

        var slideImage = document.createElement('img');
        slideImage.setAttribute('src', movieStorage.poster);
        console.log(slideImage)

        slide.appendChild(slideHeader)
        slide.appendChild(slideImage)
        slideshowContainer.appendChild(slide)

    });
}

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';
    });
}

function nextSlide() {
    var currentSlideIndex = (currentSlideIndex + 1) % movieStorage.length;
    showSlide(currentSlideIndex);
}

function previousSlide() {
    var currentSlideIndex = (currentSlideIndex - 1 + movieStorage.length) % movieStorage.length;
    showSlide(currentSlideIndex);
}


document.addEventListener('DOMContentLoaded', async () => {
    const data = JSON.parse(localStorage.getItem("movie")) || []
    await createSlides(data);
    await showSlide(0);
    //setInterval(nextSlide, 5000);
});

