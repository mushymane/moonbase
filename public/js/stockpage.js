var hypeCounts = document.querySelectorAll('#hypecount');

hypeCounts.forEach((post) => {
    console.log(post)
    var postId = post.parentNode.parentNode.parentNode.dataset.postId
    fetch(`api/hype/posts/${postId}/hypecount`)
    .then((response) => response.json()) 
    .then((hype) => {
        post.innerHTML = hype.count;
        // document.getElementById('hypecount').innerHTML = hype.count;

    });
})

const hypeButtonHandler = async (event) => {
    event.preventDefault();

    try {
        const postId = event.target.parentNode.parentNode.dataset.postId;

        //check if user already hyped a post
        // const hyped = await fetch(`/api/hype/users/${req.session.user_id}`, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type' : 'application/json'
        //     }
        // });
        // commented out bc forgot user can hype post multiple times

        // if (!hyped) {
        const response = await fetch(`api/hype`, {
            method: 'POST',
            body: JSON.stringify({
                // post_id: req.body.post_id,
                post_id: postId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // const response = await fetch(`api/hype/posts/`)
        //console.log(response);
        if (response.ok) {
            //console.log('response okk');
            // const newHypeCount = await fetch(`api/hype/posts/${postId}/hypecount`, {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // })



            fetch(`api/hype/posts/${postId}/hypecount`)
                .then((response) => response.json()) 
                .then((hype) => {
                    console.log(event.target.parentNode.parentNode.querySelector('#hypecount'));
                    event.target.parentNode.parentNode.querySelector('#hypecount').innerHTML = hype.count;

                })
            
            

            // if (newHypeCount.ok) {
            //     console.log('AW HEcK', newHypeCount.json())
            //     document.getElementById('hypecount').innerHTML = newHypeCount;
            // }
            // console.log(newHypeCount.body)
            // 
            // document.location.replace('/');
        } else {
            console.log(response.statusText);
            alert('Failed to hype up post');
        }
        // }
    } catch (err) {
        console.log(err)
    }
}

let hypeButtons = document.querySelectorAll('#hype-btn')

hypeButtons.forEach((btn) => {
    btn.addEventListener('click', hypeButtonHandler);
})