const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        alert("You've been logged out")
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};