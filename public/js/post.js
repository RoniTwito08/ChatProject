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
function getChatHistory(toUser) {
    
    fetch(`/posts/chatHistory?toUser=${toUser}`)
        .then(res => {
            console.log('Response status:', res.status); 
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            
            const chatDisplay = document.getElementById('chat-display');
            chatDisplay.innerHTML = '';  

            if (data.length === 0) {
                chatDisplay.textContent = 'No chat history available';
            } else {
                data.forEach(chat => {
                    const chatElement = document.createElement('div');
                    chatElement.classList.add('chat-message');
                    chatElement.textContent = `${chat.fromUser}: ${chat.content} (${new Date(chat.date).toLocaleString()})`;
                    chatDisplay.appendChild(chatElement);
                });
            }
        })
        .catch(error => {
            console.error('Failed to load chat history:', error); 
            const chatDisplay = document.getElementById('chat-display');
            chatDisplay.textContent = 'Failed to load chat history';
        });
}

document.getElementById('members').addEventListener('click', (event) => {
    if (event.target.classList.contains('chat-member')) {
        const selectedUser = event.target.getAttribute('data-username');
        getChatHistory(selectedUser);
    }
});

logedinuser();
getAllusers();
logoutbutton();


