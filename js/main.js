var sW = window.innerWidth,
	sH = window.innerHeight,
	maxChar = 20,
	maxLine;
window.addEventListener('load', onLoad, false);
window.addEventListener('resize', onResize, false);

function onLoad() {
	$('#content').css({
		top: sH/2 - 40
	});
}

// when resize
function onResize() {
	sW = window.innerWidth;
	sH = window.innerHeight;
	maxChar = parseInt(sW/20);
	$('#content').css({
		top: sH/2 - 40
	});
	$('#source').css({
		top: sH/2 + 30,
		right: 20
	});
	// wait for a second
		getQuote();
}

function getQuote() {
	$.ajax({
    url: "http://query.yahooapis.com/v1/public/yql",

    // the name of the callback parameter, as specified by the YQL service
    jsonp: "callback",

    // tell jQuery we're expecting JSONP
    dataType: "jsonp",

    // tell YQL what we want and that we want JSON
    data: {
        q: "select * from json where url=\"http://www.iheartquotes.com/api/v1/random?format=json&max_characters=" + maxChar + "&min_characters=" + maxChar + "\"",
        format: "json"
    },

    // work with the response
    success: function( response ) {
        $('#content').html(response.query.results.json.quote);
        $('#source').html('[source: ' + response.query.results.json.source + ']');
    }
});
}