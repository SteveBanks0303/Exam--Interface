document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the user's score and total questions from the query parameters (URL)
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userScore = parseInt(urlParams.get('score') || 0);
    const totalQuestions = parseInt(urlParams.get('totalQuestions') || 0); // Retrieve total questions

    // Calculate the percentage
    const percentage = ((userScore / totalQuestions) * 100).toFixed(2);

    // Display the user's score and percentage on the page
    const userScoreElement = document.getElementById('userScore');
    const totalQuestionsElement = document.getElementById('totalQuestions');
    const percentageElement = document.getElementById('percentage');

    // Calculate the user's score in the "X/Y" format
    const scoreText = `${userScore}/${totalQuestions}`;

    userScoreElement.textContent = scoreText;
    totalQuestionsElement.textContent = totalQuestions; // Display total questions
    percentageElement.textContent = percentage + '%';
});
