document.getElementById('register').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    
    try{
        const res = await fetch('/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, email })
        });
        const data = await res.json();
        if(res.ok){
            alert('Register Success');
            window.location.href = '/login';
        }
        else{
            alert(data.msg);
        }
    } catch (err) {
        console.error(err);
    }
} );