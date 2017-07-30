//declare global variables
var buttonNum = 0;

//What to do after an animal is submitted
$('#animalFinder').submit(function () {
var animal = document.getElementsByName("animal")[0].value;

	//create the button tag and append it to #button holder
	$('#buttonHolder').append('<button id="animalButton"' + buttonNum + 'class="button" name="' + animal + '"onclick="gifDisplay(this.name)">' + animal + '</button>');
	buttonNum++;
	//wedo not want to reload the page
     return false;
});

//what to do if an animal name button is clicked
function gifDisplay(clickedName){
	$("#gifDisplay").html("Click the picture to animate, click again to stop, enjoy!");
	//set up our api
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        clickedName + "&api_key=dc6zaTOxFJmzC&limit=12";
      $.ajax({
          url: queryURL,
          method: "GET"
        })
      //when the api is finished, run this function
        .done(function(response) {
        	console.log(response);
          var results = response.data;
          //loop through 12 gifs
          for (var i = 0; i < 12; i++) {
          	//for every 3 gifs start a new row
          	if(i % 3 === 0){
          		var rowNum = i;
          		var rowDiv = $("<div class='row' id='row" + rowNum + "'>");
          		$("#gifDisplay").append(rowDiv)
          	}
          	//create our gifs, give them attributes, and append them to the correct row
            var gifDiv = $("<div class='gifs col-xs-4'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var animalImage = $("<img>");
            animalImage.attr("class", "img-thumbnail img-responsive gif");
            animalImage.attr("src", results[i].images.fixed_width_still.url);
            animalImage.attr("onclick", "animation(this)")
            animalImage.attr("data-state", "still");
            animalImage.attr("data-still", results[i].images.fixed_width_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_width.url);
            gifDiv.append(p);
            gifDiv.append(animalImage);
            $("#row" + rowNum).append(gifDiv);
        	}
        });
}

//begin the function that will change the url from a still image to animating our gif and vice versa
function animation(theGif){
	var state = $(theGif).attr("data-state")

	if(state === "still"){
		var animate = $(theGif).attr("data-animate");
		$(theGif).attr("data-state", "animate");
		$(theGif).attr("src", animate);
	}else{
		var deanimate = $(theGif).attr("data-still");
		$(theGif).attr("data-state", "still");
		$(theGif).attr("src", deanimate);
	}
}

// $(".gif").on("click", function() {
// 	alert("worked");
// 	console.log("image clicked");
// 	var state = $(this).attr("data-state")

// 	if(state === "still"){
// 		var animate = $(this).attr("data-animate");
// 		$(this).attr("data-state", "animate");
// 		$(this).attr("src", animate);
// 	}else{
// 		var deanimate = $(this).attr("data-still");
// 		$(this).attr("data-state", "still");
// 		$(this).attr("src", deanimate);
// 	}
// });
