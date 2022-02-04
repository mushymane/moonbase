async function newFormHandler(event) {
    event.preventDefault();
    console.log('HIT ADD COMMENT JS');

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const text_body = document.getElementById('text_body').value.trim();
    var bear = 0;
    var bull = 0;

    if (document.getElementById('bear-btn').checked) {
        bear = 1;
    } else if (document.getElementById('bull-btn').checked) {
        bull = 1;
    }

    const response = await fetch(`/api/posts/${post_id}/comment`, {
        method: 'POST',
        body: JSON.stringify({
            text_body: text_body,
            bear_count: bear,
            bull_count: bull,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        console.log(response);
        document.location.replace(`/post/${post_id}`);
    } else {
        alert('Failed to add comment :(');
    }

    // Updates commenter's hype count
    const hypeResponse = await fetch('/api/hype/commentcredit', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (hypeResponse.ok) {
        // console.log(hypeResponse);
        document.location.replace('/');
    } else {
        alert('Failed to PUT hype for you post :(');
    }
}

document.querySelector('.add-comment-form').addEventListener('submit', newFormHandler);
