let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let listHTML = document.querySelector('.carousel .list');
let seeMoreButtons = document.querySelectorAll('.seeMore');
let backButton = document.getElementById('back');

// Function to move the carousel
nextButton.onclick = function() {
    showSlider('next');
}
prevButton.onclick = function() {
    showSlider('prev');
}

// Variable to hold timeout for blocking click
let unAcceppClick;

// Function to show slider with transitions
const showSlider = (type) => {
    // Disable pointer events only for the slider navigation buttons
    nextButton.style.pointerEvents = 'none';
    prevButton.style.pointerEvents = 'none';

    carousel.classList.remove('next', 'prev');
    let items = document.querySelectorAll('.carousel .list .item');
    
    if
    
    (type === 'next') {
        listHTML.appendChild(items[0]);
        carousel.classList.add('next');
    } else {
        listHTML.prepend(items[items.length - 1]);
        carousel.classList.add('prev');
    }

    // Re-enable pointer events after 2 seconds (transition time)
    clearTimeout(unAcceppClick);
    unAcceppClick = setTimeout(() => {
        nextButton.style.pointerEvents = 'auto';
        prevButton.style.pointerEvents = 'auto';
    }, 2000);
}

// Handle the "See More" button
seeMoreButtons.forEach((button) => {
    button.onclick = function() {
        carousel.classList.remove('next', 'prev');
        carousel.classList.add('showDetail');
    }
});

// Back button to hide details view
backButton.onclick = function() {
    carousel.classList.remove('showDetail');
}
// Voice-to-Text functionality (existing code)
let startButton = document.getElementById('start-button');
let textOutput = document.getElementById('text-output');

// Check if the browser supports Speech Recognition
if ('webkitSpeechRecognition' in window) {
    const recognition = new webkitSpeechRecognition();

    recognition.continuous = true; // Keep recognition going until stopped
    recognition.interimResults = true; // Get results as user speaks
    recognition.lang = 'en-US'; // Language for speech recognition

    recognition.onstart = function () {
        console.log('Speech recognition started.');
    };

    recognition.onresult = function (event) {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }
        textOutput.value = transcript; // Update the textarea with the recognized speech
    };

    recognition.onerror = function (event) {
        console.error('Speech recognition error:', event.error);
    };

    recognition.onend = function () {
        console.log('Speech recognition ended.');
    };

    startButton.onclick = function () {
        if (textOutput.value === "") {
            recognition.start(); // Start speech recognition if textarea is empty
            startButton.textContent = 'Stop Listening';
            // Add transition to make the section appear
            document.getElementById('voice-to-text').classList.add('visible');
        } else {
            recognition.stop(); // Stop speech recognition
            startButton.textContent = 'Start Listening';
            document.getElementById('voice-to-text').classList.remove('visible');
        }
    };
} else {
    alert("Speech recognition is not supported in this browser.");
}


// Text-to-Voice functionality (new code)
let speakButton = document.getElementById('speak-button');
let textInput = document.getElementById('text-input');

// Check if the SpeechSynthesis API is available
if ('speechSynthesis' in window) {
    speakButton.onclick = function () {
        let text = textInput.value.trim();

        if (text !== "") {
            let utterance = new SpeechSynthesisUtterance(text); // Create the speech utterance
            speechSynthesis.speak(utterance); // Speak the text
            // Add transition to make the text-to-voice section appear
            document.getElementById('text-to-voice').classList.add('visible');
        } else {
            alert("Please enter some text to speak.");
        }
    };
} else {
    alert("Text-to-speech is not supported in this browser.");
}
