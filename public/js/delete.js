const destroy = async () => {
    const response = await fetch(`/api/delete/${$('#delete-btn').data('id')}`, {
        method: 'DELETE',
    })

    if (response.ok) {
        document.location.replace('/dashboard')
    } else {
        console.log(response.statusText)
    }
}