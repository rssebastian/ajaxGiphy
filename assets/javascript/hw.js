$(document).ready(function() {
	
	var dogTypes = ["golden retriever", "poodle", "beagle", "collie", "labrador", "german shepherd", "corgi", "maltese", "yorkshire terrier", "french bulldog"];
	var gifRunning = false;
	
	function renderButtons() {
		$("#dogButtons").empty();
		for (i=0; i<dogTypes.length; i++) {
			var a = $("<button type='button' class='btn btn-info'>")
			a.addClass("dog");
			a.attr("data-name", dogTypes[i]);
			a.text(dogTypes[i]);
			$("#dogButtons").append(a);
		}
	};

	function displayDogs() {
		
		$("#dogGIFS").empty();
		var dog = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q="+dog+"&limit=10&api_key=dc6zaTOxFJmzC";

			$.ajax({
				url:queryURL,
				method:'GET'
			}).done(function(response){
				console.log(response);
				for(var j=0; j<response.data.length; j++){
					$("#dogGIFS").append("Rating: "+response.data[j].rating+"<br>");
					$("#dogGIFS").append("<img src='"+response.data[j].images.original_still.url+"' style='width:300px;height:300px;''><br>");
				}
			});
	};

	$("#addDog").on("click", function(event) {
        event.preventDefault();
        var newDog = $("#dog-input").val().trim();
        dogTypes.push(newDog);
        renderButtons();
    });


	function controlGif() {
		console.log(this);
		var stillGif = this.src;
		var loopingGif = stillGif.replace('_s', '');
		

		if (gifRunning === false) {
			this.src = loopingGif;
			gifRunning = true;
		} else {
			this.src = loopingGif.replace(".gif", '_s.gif');
			gifRunning = false;
		};
		console.log(stillGif);
		console.log(loopingGif);

	};

	$(document).on("click", ".dog", displayDogs);
	$(document).on("click", "img", controlGif);
	renderButtons();

});