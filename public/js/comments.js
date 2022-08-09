const newComment = () => {
    $('#new-comment').removeClass('invis')
}

const postComment = async () => {
    const param = location.href.split('/').pop()

    const content = $('#new-comment-content').val()
    const post_id = param

    if (content && post_id) {
        const response = await fetch('/api/post/comment', {
            method: 'POST', 
            body: JSON.stringify({content, post_id}),
            headers: {'Content-Type': 'application/json'}
        })

        if(response.ok) {
            document.location.replace(`/comments/${post_id}`)
        } else {
            console.log(response.statusText)
        }
    }
}