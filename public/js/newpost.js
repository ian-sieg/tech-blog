const post = async () => {
    const title = $('#update-title').val().trim()
    const content = $('#update-content').val().trim()

    if(title && content) {
        const response = await fetch(`/api/post`, {
            method: 'POST',
            body: JSON.stringify({title, content}),
            headers: {'Content-Type': 'application/json'},
        })

        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            console.log(response.statusText)
        }
    }
}