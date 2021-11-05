const quotePrice = require('./utils/axios-quote');
// utils\axios-quote.js

async function newFormHandler(event) {
    event.preventDefault();
    console.log("NEW POST JS HIT");
    const title = document.getElementById('#title').value;
    const ticker = document.getElementById('#ticker').value;
    const description = document.getElementById('#description').value;
    var bear = 0;
    var bull = 0;

    if (document.getElementById('#bear-btn').checked) {
        bear = 1;
    }
    else if (document.getElementById('#bull-btn').checked) {
        bull = 1;
    }

    const quote = await quotePrice(ticker);

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            ticker: ticker,
            price: quote.c,
            change: quote.d,
            percent_change: quote.dp,
            description: description,
            hype_count: 1,
            // stock_id: ticker,
            bear_count: bear,
            bull_count: bull,
            user_id: req.session.user_id
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        console.log(response);
        document.location.replace('/');
    } else {
        alert('Failed to add post :(');
    }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);