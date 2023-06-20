const socket = io()

let username;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    username = prompt('Please enter your username: ')
} while(!username)

// // let xnas=
// let xdiv=document.createElement('div')
// xdiv.innerHTML=username+" joined the chat "
//     console.log(xdiv)
//     messageArea.appendChild(xdiv)

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: username,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

//     // Send to server 
    socket.emit('message', msg)
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let classusername = type
    mainDiv.classList.add(classusername, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}


