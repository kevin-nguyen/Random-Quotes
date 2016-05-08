$(document).ready(function() {
    var quote, author;
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
            quote = response.quote;
            author = response.author;

            $("#quote").text(quote);
            $("#author").text(author);
        })
        .fail(function(jqXHR, textStatus, errorThrown) {

        });
    }

    requestQuote();
    
});