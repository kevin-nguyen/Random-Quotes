$(document).ready(function() {
    var quote, author, index;
    var quoteStack = [];

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

            $("#quote").text(quote);
            $("#author").text(author).prepend("&mdash; ");

            var encodeQuote ='"' + encodeURIComponent(quote) + '"';
            var encodeAuthor = " " + encodeURIComponent(author);
            var uri = "https://twitter.com/intent/tweet?hashtags=QuoteOfTheDay&text=" + encodeQuote + encodeAuthor;
            $(".tweet").attr('href', uri);
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
        if (!$('#prev').hasClass('disabled')) {
            index -= 1;

            if (index >= 0) {
                quote = quoteStack[index].quote;
                author = quoteStack[index].author;

                $("#quote").text(quote);
                $("#author").text(author).prepend("&mdash; ");

                var encodeQuote ='"' + encodeURIComponent(quote) + '"';
                var encodeAuthor = " " + encodeURIComponent(author);
                var uri = "https://twitter.com/intent/tweet?hashtags=QuoteOfTheDay&text=" + encodeQuote + encodeAuthor;
                $(".tweet").attr('href', uri);
            }

            $('#prev').toggleClass('disabled', (index) === 0);
            $('#next').toggleClass('disabled', (index) === quoteStack.length - 1);
        }   
    });

    $('#next').on('click', function(event) {
        if (!$('#next').hasClass('disabled')) {
            index += 1;

            if (index >= 0 && index < quoteStack.length) {
                quote = quoteStack[index].quote;
                author = quoteStack[index].author;
                
                $("#quote").text(quote);
                $("#author").text(author).prepend("&mdash; ");

                var encodeQuote ='"' + encodeURIComponent(quote) + '"';
                var encodeAuthor = " " + encodeURIComponent(author);
                var uri = "https://twitter.com/intent/tweet?hashtags=QuoteOfTheDay&text=" + encodeQuote + encodeAuthor;
                $(".tweet").attr('href', uri);
            } 

            $('#prev').toggleClass('disabled', (index) === 0);
            $('#next').toggleClass('disabled', (index) === quoteStack.length - 1);
        }        
    });
});