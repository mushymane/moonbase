async function newFormHandler(event) {
    event.preventDefault();
    console.log("NEW POST JS HIT");
    const title = document.getElementById('title').value.trim();
    const ticker = document.getElementById('ticker').value.trim().toUpperCase();
    const description = document.getElementById('description').value.trim();
    var bear = 0;
    var bull = 0;

    if (document.getElementById('bear-btn').checked) {
        bear = 1;
    } else if (document.getElementById('bull-btn').checked) {
        bull = 1;
    }

    // Creates new post
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            ticker: ticker,
            description: description,
            hype_count: 1,
            bear_count: bear,
            bull_count: bull
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        // console.log(response);
        document.location.replace('/');
    } else {
        alert('Failed to add post :(');
    }

    // Updates Poster's hype count
    const hypeResponse = await fetch(`/api/hype/postcredit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (hypeResponse.ok) {
        // console.log(hypeResponse);
        document.location.replace('/');
    } else {
        alert('Failed to PUT hype :(');
    }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);