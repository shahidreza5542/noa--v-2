const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
const nametexts = document.querySelector('.nameText');

let users = JSON.parse(localStorage.getItem('users') || "[]");
let firstUser = users[0] || { name: "Guest" };
let name = firstUser.name;

nametexts.innerHTML = `Welcome, ${name}! Noa is ready to assist you.`;

let qaData = [];
fetch("data.json")
    .then(res => res.json())
    .then(data => {
        qaData = data;
    })
    .catch(err => console.error(err));

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) speak("Good Morning Boss...");
    else if (hour >= 12 && hour < 17) speak("Good Afternoon Master...");
    else speak("Good Evening Sir...");
}

window.addEventListener('load', () => {
    speak("Initializing NOA...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;

recognition.onresult = (event) => {
    const transcript = event.results[event.resultIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

recognition.onend = () => {
    btn.disabled = false;
};

btn.addEventListener('click', () => {
    content.textContent = "Listening....";
    recognition.start();
    btn.disabled = true;
});

function takeCommand(message) {
    const match = qaData.find(item => message.includes(item.question.toLowerCase()));
    if (match) {
        speak(match.answer);
        return;
    }

    if (message.includes('hey') || message.includes('hello')) speak("Hello Sir, How May I Help You?");
    else if (message.includes("open google")) { window.open("https://google.com", "_blank"); speak("Opening Google..."); }
    else if (message.includes("open youtube")) { window.open("https://youtube.com", "_blank"); speak("Opening Youtube..."); }
    else if (message.includes("open facebook")) { window.open("https://facebook.com", "_blank"); speak("Opening Facebook..."); }
    else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) { 
        window.open(`https://www.google.com/search?q=${message.replace(/ /g, "+")}`, "_blank"); 
        speak("This is what I found on internet regarding " + message); 
    }
    else if (message.includes('wikipedia')) { 
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank"); 
        speak("This is what I found on wikipedia regarding " + message); 
    }
    else if (message.includes('time')) speak(new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" }));
    else if (message.includes('date')) speak(new Date().toLocaleString(undefined, { month: "short", day: "numeric" }));
    else if (message.includes('calculator')) { window.open('Calculator:///'); speak("Opening Calculator"); }
    else { 
        window.open(`https://www.google.com/search?q=${message.replace(/ /g, "+")}`, "_blank"); 
        speak("I found some information for " + message + " on google"); 
    }
}
