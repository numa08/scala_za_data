/* custom behavior *//* custom behavior */
(function  () {
	window.addEventListener("load", function() {
		var script = document.getElementsByTagName('head')[0].getElementsByTagName('script')[0];
		script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js");
	}, false);		
})();

$(function(){
	//Add Footer
	$('.content').each(function(index, elem){
		var link = $("<div>", {
			"class" : "left",
		}).append($("<a>", {
					href 	: "htts://twitter.com/numa08",
					text    : "@numa08"
				}));

		var hashtag = $("<a>", {
			"class" : "right",
			text    : "#新宿Scala座",
			href    : "http://scala.numa08.net"
		});

		var footer = $("<div>", {
			"class" : "footer",
 		}).append(link)
 		  .append(hashtag);

 		$(elem).append(footer);  
	});

	//Add Header
	var slideTitle = $("<div>", {
		"class" : "left"
	}).append($("<a>", {
		 	"class" : "topbar_link",
			text : "Scala on Android",
			href : "http://scala.numa08.net"
		}));
	var eventTitle = $("<a>", {
		"class" : "topbar_link right",
		text : "新宿Scala座 '14年２月号",
		href : "http://scala.numa08.net"
	});
	var topbar = $("<div>", {
		"class" : "topbar"
	}).append(slideTitle)
	  .append(eventTitle);
	$("#slides").prepend(topbar);
});