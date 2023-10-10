// exam.js
// Set your countdown time in seconds
const countdownTime = 3600; // 1 hour

let secondsRemaining = countdownTime;

function updateCountdown() {
    const hours = Math.floor(secondsRemaining / 3600);
    const minutes = Math.floor((secondsRemaining % 3600) / 60);
    const seconds = secondsRemaining % 60;

    // Display the remaining time in the HTML elements
    document.getElementById('hours').textContent = hours < 10 ? `0${hours}` : hours;
    document.getElementById('minutes').textContent = minutes < 10 ? `0${minutes}` : minutes;
    document.getElementById('seconds').textContent = seconds < 10 ? `0${seconds}` : seconds;

    // Check if the countdown has reached zero
    if (secondsRemaining === 0) {
        clearInterval(interval);
        alert("Time's up!");
    } else {
        secondsRemaining--;
    }
}

// Initial call to display the full time
updateCountdown();

// Update the countdown every second
const interval = setInterval(updateCountdown, 1000);

// Get the username from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("username");

// Update the "Name" and "Username" sections on the welcome page
const nameElement = document.querySelector(".left-column .student-info p:nth-child(2)");
const usernameElement = document.querySelector(".left-column .student-info p:nth-child(4)");

if (username) {
  nameElement.textContent = `Name: ${username}`;
  usernameElement.textContent = `Username: ${username}`;
} else {
  nameElement.textContent = "Guest";
  usernameElement.textContent = "Guest";
}



function arraysEqual(arr1, arr2) {
    // Check if the arrays have the same length
    if (arr1.length !== arr2.length) {
        return false;
    }
    
    // Check if each element in the arrays is equal
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    
    return true;
}

let currentQuestion = 1;
const questions = document.querySelectorAll('.question');
const navigation = document.getElementById('navigation');
const endExamButton = document.getElementById('endExamButton'); // Reference to the "END EXAM" button

function showQuestion(questionNumber) {
    questions.forEach((question, index) => {
        if (index === questionNumber - 1) {
            question.style.display = 'block';
        } else {
            question.style.display = 'none';
        }
    });

    if (questionNumber === 1) {
        navigation.querySelector('button:first-child').disabled = true;
    } else {
        navigation.querySelector('button:first-child').disabled = false;
    }

    if (questionNumber === questions.length) {
        navigation.querySelector('button:last-child').textContent = 'Next';
        // Disable the "Next" button when on the last question
        navigation.querySelector('button:last-child').disabled = true;
        // Enable the "END EXAM" button
        endExamButton.disabled = false;
    } else {
        navigation.querySelector('button:last-child').textContent = 'Next';
        // Enable the "Next" button when not on the last question
        navigation.querySelector('button:last-child').disabled = false;
        // Disable the "END EXAM" button
        endExamButton.disabled = true;
    }
}

function prevQuestion() {
    if (currentQuestion > 1) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

function nextQuestion() {
    if (currentQuestion < questions.length) {
        currentQuestion++;
        showQuestion(currentQuestion);
    }
}

// Calculate the total number of questions based on the number of question elements
const totalQuestions = questions.length;
function calculateScore() {
    let userScore = 0;
    
    // Define the correct answers array
    const correctAnswers = [
        { question: 1, answer: 'Blue' },
        { question: 2, answer: ['Cats', 'Dogs'] },
        // Add correct answers for other questions
    ];
    
    questions.forEach((question, index) => {
        const questionNumber = index + 1;
        const userAnswerElements = question.querySelectorAll('input:checked');
        const userAnswers = Array.from(userAnswerElements).map(input => input.value);
        
        const correctAnswer = correctAnswers.find(answer => answer.question === questionNumber);
        
        if (correctAnswer) {
            const isCorrect = Array.isArray(correctAnswer.answer)
                ? arraysEqual(userAnswers, correctAnswer.answer)
                : userAnswers[0] === correctAnswer.answer;
            
            if (isCorrect) {
                userScore++; // Increment the score by 1 for each correct answer
            }
        }
    });
    
    return userScore;
}



// Function to handle the submission (when "END EXAM" is clicked)
function submitExam() {
    console.log("Submit button clicked");
    try {
        // Calculate the score
        const userScore = calculateScore();

        // Pass the user score and total questions as query parameters
        const totalQuestions = questions.length;
        window.location.href = `score.html?score=${userScore}&totalQuestions=${totalQuestions}`;
    } catch (error) {
        console.error('Error calculating the score:', error);
    }
}



showQuestion(currentQuestion);

// Attach the submitExam function to the "END EXAM" button click event
endExamButton.addEventListener('click', submitExam);
