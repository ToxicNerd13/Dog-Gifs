$(document).ready(function () {

    // Provide some dog breeds to start with
    let topics = ["St. Bernard", "Bulldog", "Dalmatian", "Husky", "Cocker Spaniel", "Pomeranian", "Golden Retriever", "Pug", "Shiba Inu", "Chihuahua"];

    // Function to create a button
    function makeButton(breed) {
        let button = $("<button>").text(breed);
        button.attr("data-breed", breed);
        $("body").append(button);
    }

    // Populate the page with a button for each dog
    for (i = 0; i < topics.length; i++) {
        makeButton(topics[i]);
    };

    // When button is clicked, make API call to get gifs
    $("button").on("click", function () {
        let dogBreed = $(this).attr("data-breed");
        let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=PXPeoxwY4DfSuEuFjEYoP6c44E0Ny00Z&q=${dogBreed}&limit=10&offset=0&lang=en`;

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            
        })
    })

})