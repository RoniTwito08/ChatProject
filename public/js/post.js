
let user = ' ';

function logoutbutton(){
    document.getElementById('logout').addEventListener('click', async () => {
        try {
            const res = await fetch('/users/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            if (res.ok) {
                window.location.href = '/'; // Redirect to the login page after logout
            } else {
                alert('Logout failed');
            }
        } catch (err) {
            console.error(err);
        }
    });
}

function getAllusers(){
    fetch('/users/allUsers')
    .then(res => res.json())
    .then(data => {
        document.getElementById('members').innerHTML = '';
        data.forEach(user => {
            
            const memberElement = document.createElement('div');
            memberElement.classList.add('chat-member');
            memberElement.setAttribute('data-username', user.username);
            memberElement.textContent = user.username;
            document.getElementById('members').appendChild(memberElement);
        });
    });
}
function logedinuser(){
    return fetch('/users/user').then(response=>response.json()).then(data=>{
        user = data.user ;

    }).catch(error=>console.error('erorr'));
}
function getChatHistory(username) {
    fetch('/posts/chatHistory')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(post => {
                if (post.fromUser === user && post.ToUser === username) {
                    console.log(user);
                    const messageElement = document.createElement('div');
                    messageElement.className = 'my-message';
                    messageElement.innerHTML = post.content;
                    messagesList.appendChild(messageElement);
                }
                if (post.ToUser === user && post.fromUser === username) {
                    const messageElement = document.createElement('div');
                    messageElement.className = 'other-person';
                    messageElement.innerHTML = post.content;
                    messagesList.appendChild(messageElement);
                }
            });
        })
        .catch(error => console.error('Error fetching messages:', error));


document.getElementById('members').addEventListener('click', (event) => {
    if (event.target.classList.contains('chat-member')) {
        const selectedUser = event.target.getAttribute('data-username');
        getChatHistory(selectedUser);
    }
});
};
document.getElementById('members').addEventListener('click', (event) => {
    username = event.target.getAttribute('data-username');
    console.log(username);
    getChatHistory(username);
});

logedinuser();
getAllusers();
logoutbutton();


