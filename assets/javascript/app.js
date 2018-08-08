var athletes = ["Darrell Green", "Jerry Rice", "Joe Montana", "Tom Brady", "Deion Sanders", "Barry Sanders"];
 
 
function pauseAnimate(){
  $('img').on('click', function(){
var state = $(this).attr('data-state'); 
if (state == 'still'){
$(this).attr('src', $(this).data('animate'));
$(this).attr('data-state', 'animate');
}else{
$(this).attr('src', $(this).data('still'));
$(this).attr('data-state', 'still');
}

  });
}; 
 
function displayGif(){

var gif = $(this).attr('data-name');
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=Y5629Z6gX2pYj8IIsreLeaMMm5ZOjUvi&rating=pg";

 $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
     console.log(response);

    $("#gifView").empty();
   
    for (var i = 0; i < response.data.length; i++){

        var rating = response.data[i].rating;
        var imageAnimate = response.data[i].images.fixed_height.url;
         var imagePaused = response.data[i].images.fixed_height_still.url;

       
        var rating = $("<p id='rating'>" + "Rating: " + rating + "</p>");
        var gifImage = $("<img>")

        
        image.attr('src', imagePaused);
        image.attr('alt', 'gif');
        image.attr('data-state', 'still');
        image.attr('data-still', imagePaused);
        image.attr('data-animate', imageAnimate);


        $('#gifView').prepend(image, rating);
        pauseAnimate ();
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


    
      $("#addGif").on("click", function(event) {
        event.preventDefault();
        var athlete = $("#gifInput").val().trim();
      athletes.push(athlete);
        renderButtons();
      });

      $(document).on("click", ".gifs", displayGif);

      renderButtons();