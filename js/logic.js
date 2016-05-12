$(document).ready(function() {
    var quote, author, index;
    var quoteStack = [];

    function randomColor(mode) {
        var color = ['#75C9C8', '#C0B9DD', '#0D3B66', '#F4D35E', 
                     '#EE964B', '#646881', '#232621', '#5AD2F4', 
                     '#69B578', '#CE6D8B', '#A44A3F', '#B93848'];

        var hexValues = ['F', 'E', 'D', 'C', 'B', 'A', '9', '8','7', '6', '5', '4', '3', '2', '1', '0'];
        var choice = null;

        if (mode === 'fullRandom') {
            choice = '#';

            for (var i = 0; i < 6; i++) {
                choice += hexValues[Math.floor(Math.random() * 16)];
            }
        } else {
            choice = color[Math.floor(Math.random() * color.length)];
        }

        console.log(choice);
        return choice;
    }

    function changeColor() {
        var backgroundColor = randomColor();
        $('body').css('background-color', backgroundColor);
        $('.fa-twitter-square, #refresh').css('color', backgroundColor);
        $('#quote').css('color', randomColor('fullRandom'));
        $('#author').css('color', randomColor('fullRandom'));

        if (! $('#prev').hasClass('disabled')) {
            $('#prev').css('color', backgroundColor);
        } else {
            $('#prev').css('color', 'darkgrey');
        }

        if (! $('#next').hasClass('disabled'))  {
            $('#next').css('color', backgroundColor);
        } else {
            $('#next').css('color', 'darkgrey');
        }
    }

    function drawText() {
        $('#quote, #author').animate({opacity: 0}, 750, function() {
            $('#quote, #author').animate({opacity: 1}, 750);
            $("#quote").text(quote);
            $("#author").text(author).prepend("&mdash; ");
        });
    }

    function createTweetLink() {
        var encodeQuote ='"' + encodeURIComponent(quote) + '"';
        var encodeAuthor = " " + encodeURIComponent(author);
        var uri = "https://twitter.com/intent/tweet?hashtags=QuoteOfTheDay&text=" + encodeQuote + encodeAuthor;
        $(".tweet").attr('href', uri);
    }

    function requestQuote() {
        $.ajax({
            url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=famous",
            accepts: "application/json",
            contentType: "application/x-www-form-urlencoded",
            
            headers: {
                "X-Mashape-Key": "hRBcyBmiL2mshOdDmGQWisvgGzFjp1aAHkFjsnhqjmOR3lg1PH"
            },
            method: "POST",
            dataType: "json"
        })
        .done(function(response, textStatus, jqXHR) {
            quoteStack.push(response);

            index = quoteStack.length - 1;
            quote = response.quote;
            author = response.author;

            drawText();            
            changeColor();
            createTweetLink();
        })
        .fail(function(jqXHR, textStatus, errorThrown) {

        });
    }

    requestQuote();

    $('#refresh').on('click', function(event) {
        requestQuote();        
        $('#prev').removeClass('disabled');
        $('#next').addClass('disabled');
    });

    $('#prev').on('click', function(event) {
        if (! $('#prev').hasClass('disabled')) {
            index -= 1;

            if (index >= 0) {
                quote = quoteStack[index].quote;
                author = quoteStack[index].author;

                drawText();                        
                createTweetLink();
            }

            $('#prev').toggleClass('disabled', (index) === 0);
            $('#next').toggleClass('disabled', (index) === quoteStack.length - 1);
            changeColor();
        }   
    });

    $('#next').on('click', function(event) {
        if (! $('#next').hasClass('disabled')) {
            index += 1;

            if (index >= 0 && index < quoteStack.length) {
                quote = quoteStack[index].quote;
                author = quoteStack[index].author;
                
                drawText();            
                createTweetLink();
            } 

            $('#prev').toggleClass('disabled', (index) === 0);
            $('#next').toggleClass('disabled', (index) === quoteStack.length - 1);
            changeColor();
        }        
    });
});