async function newFormHandler(event) {
    event.preventDefault();
    console.log("HIT ADD COMMENT JS");

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const text_body = document.getElementById('#text_body').value;
    // var bear = 0;
    // var bull = 0;

    // if (document.getElementById('#bear-btn').checked) {
    //     bear = 1;
    // }
    // else if (document.getElementById('#bull-btn').checked) {
    //     bull = 1;
    // }

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            text_body: text_body,
            post_id: post_id,
            // bear_count: bear,
            // bull_count: bull,
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
        alert('Failed to add comment :(');
    }
}

document.getElementById('.new-comment-form').addEventListener('submit', newFormHandler);