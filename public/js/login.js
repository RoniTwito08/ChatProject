document.getElementById('login').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })

        });
    const data = await res.json();
    if(res.ok){
        alert('Login Success');
        window.location.href = `/post`;
    }
    else{
        alert(data.msg);
    }
    } catch (err) { 
        console.error(err);
    }

});