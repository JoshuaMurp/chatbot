const questions = [
    { key: 'name', question: "What's your name?" },
    { key: 'dob', question: "What's your date of birth? (DD/MM/YYYY)" },
    { key: 'email', question: "What's your email address?" },
    { key: 'phone', question: "What's your phone number?" },
    { key: 'occupation', question: "What's your occupation?" }
];

let currentQuestion = 0;
let userData = {};

function addMessage(message, isBot = false) {
    const chatbox = document.getElementById('chatbox');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isBot ? 'bot' : 'user'}`;
    messageDiv.textContent = message;
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function enableInput() {
    document.getElementById('userInput').disabled = false;
    document.getElementById('sendButton').disabled = false;
    document.getElementById('userInput').focus();
}

function askQuestion() {
    if (currentQuestion < questions.length) {
        addMessage(questions[currentQuestion].question, true);
        enableInput();
    } else {
        addMessage("Thanks! Generating your PDF profile...", true);
        generatePDF();
    }
}

async function sendMessage() {
    const input = document.getElementById('userInput');
    const answer = input.value.trim();
    
    if (!answer) return;

    addMessage(answer);
    userData[questions[currentQuestion].key] = answer;
    
    input.value = '';
    document.getElementById('userInput').disabled = true;
    document.getElementById('sendButton').disabled = true;
    
    currentQuestion++;
    setTimeout(askQuestion, 500);
}

async function generatePDF() {
    try {
        const response = await fetch('/generate-pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userData })
        });
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `user_profile_${Date.now()}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        addMessage("Your PDF profile has been generated and downloaded!", true);
    } catch (error) {
        addMessage("There was an error generating your PDF.", true);
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('userInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    askQuestion();
});
