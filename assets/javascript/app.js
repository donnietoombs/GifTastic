var athletes = ["Darrell Green", "Jerry Rice", "Joe Montana", "Tom Brady", "Deion Sanders", "Barry Sanders"];

function displayGif() {

  var player = $(this).attr('data-name');
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + player + "&api_key=Y5629Z6gX2pYj8IIsreLeaMMm5ZOjUvi&rating=pg";

  $.ajax({ url: queryURL, method: 'GET' }).done(function (response) {
    console.log(response);

    $("#gifView").empty();

    for (var i = 0; i < response.data.length; i++) {

      var rating = response.data[i].rating;
      var imageAnimate = response.data[i].images.fixed_height.url;
      var imagePaused = response.data[i].images.fixed_height_still.url;


      var rating = $("<p id='rating'>" + "Rating: " + rating + "</p>");
      var gifImage = $("<img>")


      gifImage.attr('src', imagePaused);
      gifImage.attr('alt', 'gif');
      gifImage.attr('data-state', 'still');
      gifImage.attr('data-still', imagePaused);
      gifImage.attr('data-animate', imageAnimate);


      $("#gifView").append(gifImage, rating);
      pauseAnimate();
    }
  });
}

function renderButtons() {

  $("#buttonsView").empty();
  for (var i = 0; i < athletes.length; i++) {
    var newBtns = $("<button>");
    newBtns.addClass("gifs");
    newBtns.attr("data-name", athletes[i]);
    newBtns.text(athletes[i]);
    $("#buttonsView").append(newBtns);
  }
}



$("#addGif").on("click", function (event) {
  event.preventDefault();
  var athlete = $("#gifInput").val().trim();
  athletes.push(athlete);
  renderButtons();
});

$(document).on("click", ".gifs", displayGif);

renderButtons();

function pauseAnimate() {
  $('img').on('click', function () {
    var state = $(this).attr('data-state');
    if (state == 'still') {
      $(this).attr('src', $(this).data('animate'));
      $(this).attr('data-state', 'animate');
    } else {
      $(this).attr('src', $(this).data('still'));
      $(this).attr('data-state', 'still');
    }

  });
}; 