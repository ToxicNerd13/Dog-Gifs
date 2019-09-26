$(document).ready(function () {

    // Provide some dog breeds to start with
    let topics = ["St. Bernard", "Bulldog", "Dalmatian", "Husky", "Cocker Spaniel", "Pomeranian", "Golden Retriever", "Pug", "Shiba Inu", "Chihuahua"];

    // Function to create a button
    function makeButton(breed) {
        let button = $("<button>").text(breed);
        button.attr("data-breed", breed);
        $("#dog-buttons").append(button);
    };

    // Populate the page with a button for each dog
    for (let i = 0; i < topics.length; i++) {
        makeButton(topics[i]);
    };

    // When button is clicked, make API call to get gifs
    $("button").on("click", function () {
        $("#gif-container").empty();
        let dogBreed = $(this).attr("data-breed");
        let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=PXPeoxwY4DfSuEuFjEYoP6c44E0Ny00Z&q=${dogBreed}&limit=10&offset=0&lang=en`;

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            let gifs = response.data;
            // Only return gifs that are not R-rated
            for (let i = 0; i < gifs.length; i++) {
                if (gifs[i].rating !== "r") {
                    let gifDiv = $("<div>");
                    // Change rating to uppercase
                    let rating = gifs[i].rating.toUpperCase();
                    let p = $("<p>").text(`Rating: ${rating}`);
                    // Display still image of gif
                    let dogGif = $("<img>").attr("src", gifs[i].images.fixed_height_still.url);
                    gifDiv.append(dogGif);
                    gifDiv.append(p);
                    $("#gif-container").append(gifDiv);
                } 
            }
        })
    });

})