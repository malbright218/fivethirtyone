
var queryURL = "https://api.nasa.gov/planetary/apod?api_key=oo9MZev2sYzPBqEPfHiUeoA4Q8XIKsOS7FRDKB3J&count=10"
$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      var img = response[0].hdurl;
      console.log(img);
    $("body").css("background-image", "url(" + img + ")");
  });


  //background-image: url("../images/trainstation2.jpg");