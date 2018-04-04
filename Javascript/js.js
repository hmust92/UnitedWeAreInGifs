var gifChoices = ["Ryan Giggs","Ronaldo","Sir Alex","Cleverley","ibrahimovic","Fellaini","Paul Scholes",
				  "Old Trafford","Vidic","Ferdinand","Patrice Evra","De Gea","Carrick","Rooney"];

				  //storing my own gif choices in an array to display at the beginning

console.log(gifChoices); //conole logging my array


function createButtons () { //this function will create the buttons in javascript to activate the gif and rating

	$("#buttonsMan").empty(); //if I don't do this, the buttons will just keep appending. this empties out the div first then regenerates the button



	for (i=0; i<gifChoices.length; i++) { //this will generate the buttons using the strings from the array

		var buttonCreator = $('<button>' + gifChoices[i] + '</button>'); //creating button tag in javascript
		buttonCreator.addClass("buttonCreatorClass"); //created class for editing in css
		buttonCreator.attr("data-array-for-gif", gifChoices[i]); //creating an attribute that holds all my choices. using the class "buttonCreatorClass", this attribute can be used to access gifchoices in another function
		buttonCreator.text(gifChoices[i]);
		$("#buttonsMan").append(buttonCreator); //div appended with buttons created

	}


          const rollSound = new Audio("sound/pep.mp3");
          $(".buttonCreatorClass").click(e => rollSound.play());

}

createButtons(); //function call to create buttons

$(".inputButton").on("click", function(event) { //function to create new buttons by user
  event.preventDefault();

  

  var userInputGif = $("#addtheGiff").val().trim();

  console.log(userInputGif);

  gifChoices.push(userInputGif); //whatever user inputs, the value is pushed into the array i created above

  createButtons(); //now that the array is updated, the createButtons function will have the new value and create the new button

  });

function displayGIFS() { 

		
		$("#theGifsMan").empty(); //empying the div everytime this function is called


        var gifSearch = $(this).attr("data-array-for-gif"); //uses attribute from function above to get value of string in array
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifSearch + "&api_key=gbymoeOW8iGtf8EK1utWS1lEjBkvpUnv&limit=10";
        console.log(queryURL);
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

        	//above is the entire ajax call. 

        	var dataWithArray = response.data; //don't feel like writing response.data every time so put it in variable

        	
        	console.log(dataWithArray[0].images.fixed_width.url); //testing to see if it works

        	for (i=0; i < dataWithArray.length; i++) {

				var divToContain = $('<div>'); //created new div 
				divToContain.addClass("theDivOfContainer");     		

        		var ratingsMan = $('<div>'); //created the ratings div
				ratingsMan.addClass("ratingsManClass");
				ratingsMan.attr("data-ratings-man", dataWithArray[i].rating);
				ratingsMan.text("Rating: " + dataWithArray[i].rating);
				$(divToContain).append(ratingsMan); //appended ratings div to div that i created myself
				
        		
        		var gifsHomie = $('<img>'); //created image tag
				gifsHomie.addClass("gifsHomiee");
				gifsHomie.attr("src", dataWithArray[i].images.fixed_width.url);
				gifsHomie.attr("pause" , dataWithArray[i].images.fixed_height_still.url); //the pause attribute holds stopped gif
				gifsHomie.attr("play" , dataWithArray[i].images.fixed_width.url); //the play attribute holds animated gif
				$(divToContain).append(gifsHomie);//appended image to div i created

				$("#theGifsMan").append(divToContain); //appended the div i created which holds both ratings and the image to div that was created in html. now i can style it easily.

				

				
        		
        	}

          

        	// var testImageURL = response.images.fixed_width.url;

        	
        	
        	

        	

        	// console.log(testImageURL);
          
         
        });
      }

  //     function animate() { //function to animate it

  //     	console.log("hello");
      	

  //     	var pause = $(this).attr("pause"); //storing paused gif in variable
  //     	var play = $(this).attr("play"); //storing played gif in variable

  //     	console.log(pause);
  //     	console.log(play);

  //     	if ($(this).attr("src") === $(this).attr("pause")) { //if the image source is the paused url, 

  //     	$('img[src="' + pause + '"]').attr('src', play); //access image tag, and change the attribute source from pause to play

  //     }

  //     else { //if the image source is not the paused url

  //     	$('img[src="' + play + '"]').attr('src', pause); //access image tag, and change the attribute source from play to pause

  //     }


      	

  // }






  $(document).on("click", ".buttonCreatorClass", displayGIFS); //the function call for clicking the buttonCreatorClass
  // $(document).on("click touchstart", ".gifsHomiee", animate); //the function call from clicking the .gifsHomiee class.








