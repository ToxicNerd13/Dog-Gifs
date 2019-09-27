$(document).ready(function () {

    // Provide some dog breeds to start with
    let topics = ["St. Bernard", "Bulldog", "Dalmatian", "Husky", "Cocker Spaniel", "Pomeranian", "Golden Retriever", "Pug", "Shiba Inu", "Chihuahua"];

    // Function to create a button
    function makeButton(breed) {
        let button = $("<button>").text(breed);
        button.attr("data-breed", breed);
        button.attr("class", "btn btn-outline-dark m-1 dog-button");
        $("#dog-buttons").append(button);
    };

    // Populate the page with a button for each dog
    for (let i = 0; i < topics.length; i++) {
        makeButton(topics[i]);
    };

    // Add new button based on user input
    $("#submit-button").on("click", function (event) {
        event.preventDefault();

        let userInput = $("#add-button").val().trim();
        topics.push(userInput);
        makeButton(userInput);
        $(".form-control").val("");
    });

    // When button is clicked, make API call to get gifs
    $(document).on("click", ".dog-button", function () {
        // Clear whatever gifs were displayed from last category
        $("#gif-container").empty();

        let dogBreed = $(this).attr("data-breed");
        let queryURL = `https://api.giphy.com/v1/gifs/search?api_key=PXPeoxwY4DfSuEuFjEYoP6c44E0Ny00Z&q=${dogBreed}&limit=10&offset=0&lang=en`;

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                let gifs = response.data;
                // Only return gifs that are not R-rated
                for (let i = 0; i < gifs.length; i++) {
                    if (gifs[i].rating !== "r") {
                        let gifDiv = $("<div>");
                        // Change rating to uppercase
                        let rating = gifs[i].rating.toUpperCase();
                        let p = $("<p>").text(`Rating: ${rating}`);
                        // Display still image of gif
                        let dogGif = $("<img>").attr({
                            "src": gifs[i].images.fixed_height_still.url,
                            "data-still": gifs[i].images.fixed_height_still.url,
                            "data-animate": gifs[i].images.fixed_height.url,
                            "data-state": "still",
                            "class": "gif"
                        });
                        // Add gif and rating to page display
                        gifDiv.append(dogGif);
                        gifDiv.append(p);
                        $("#gif-container").append(gifDiv);
                    }
                };
                $(".gif").on("click", function () {
                    let state = $(this).attr("data-state");

                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate")
                    }
                    else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                });
            })
    });

})