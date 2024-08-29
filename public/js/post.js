
let currentUser = ' ';
const messagesList = document.getElementById('chat-display');
let sender =  ' ';
let receiver = ' ';
let selectedUser = ' ';

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
            if(user.username !== currentUser){
            const memberElement = document.createElement('div');
            memberElement.classList.add('chat-member');
            memberElement.setAttribute('data-username', user.username);
            memberElement.textContent = user.username;
            document.getElementById('members').appendChild(memberElement);
            }
        });
    
    });
}
function logedinuser(){
    return fetch('/users/user').then(response=>response.json()).then(data=>{
        currentUser = data.user ;
        getAllusers();


    }).catch(error=>console.error('erorr'));
}
function getChatHistory(selectedUser) {
    messagesList.innerHTML = '';
    fetch('/posts/chatHistory')
        .then(response => response.json())
        .then(data => {
            
            data.forEach(post => {
                sender = post.fromUser;
                receiver = post.ToUser;
                if (sender === currentUser && receiver === selectedUser) {
                    console.log('my message');
                    const messageElement = document.createElement('div');
                    messageElement.className = ' message my-message';
                    messageElement.innerHTML = post.content;
                    messagesList.appendChild(messageElement);
                }
                if (receiver === currentUser && sender === selectedUser) {
                    console.log('other person message');
                    const messageElement = document.createElement('div');
                    messageElement.className = 'message other-person';
                    messageElement.innerHTML = post.content;
                    messagesList.appendChild(messageElement);
                }
            });
        })
        .catch(error => console.error('Error fetching messages:', error));



};
document.getElementById('members').addEventListener('click', (event) => {
    if (event.target.classList.contains('chat-member')) {
         selectedUser = event.target.getAttribute('data-username');
        getChatHistory(selectedUser);
    }
});
document.querySelector('.chat-input button').addEventListener('click', async () => {
    const messageContent = document.querySelector('.chat-input textarea').value;
    
    if (selectedUser === '' || messageContent === '') return; 

    
    

    try {
        const res = await fetch('/posts/newMessage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: 'Message', // Can be adjusted or made dynamic
                content: messageContent,
                fromUser: currentUser,
                ToUser: selectedUser // Using the selectedUser from your earlier setup
            })
        });

        if (res.ok) {
            // Clear the textarea after the message is sent
            document.querySelector('.chat-input textarea').value = '';

            // Refresh the chat history to include the new message
            getChatHistory(selectedUser);
        } else {
            console.error('Failed to send message');
        }
    } catch (err) {
        console.error('Error sending message:', err);
    }
});


logedinuser();
logoutbutton();


