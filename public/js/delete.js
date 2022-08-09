const destroy = async (e) => {
    e.preventDefault()
    const response = await fetch(`/api/delete/${e.target.dataset.id}`, {
        method: 'DELETE',
    })

    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        console.log(response.statusText)
    }
}

$('.delete-btn').click(destroy)