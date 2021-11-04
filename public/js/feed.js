const hypeButtonHandler = async (event) => {
    event.preventDefault();

    const postId = event.target.parentNode.dataset.postId;
    console.log(postId);

    //check if user already hyped a post
    // const hyped = await fetch(`/api/hype/users/${req.session.user_id}`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type' : 'application/json'
    //     }
    // });
    // commented out bc forgot user can hype post multiple times

    // if (!hyped) {
        const response = await fetch(`api/hype/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            }
        });

        if (response.ok) {
            const newHypeCount = await fetch(`api/hype/posts/${postId}/hypecount`, {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            document.getElementById('#hypecount').innerHTML = newHypeCount;
        } else {
            console.log(response.statusText);
            alert('Failed to hype up post');
        }
    // }
}

document.querySelector('#hype-btn').addEventListener('click', hypeButtonHandler);