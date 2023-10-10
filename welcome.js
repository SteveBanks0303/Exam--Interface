

// Get the username from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("username");

// Update the "Name" and "Username" sections on the welcome page
const nameElement = document.querySelector(".center-column p:nth-child(1)");
const usernameElement = document.querySelector(".center-column p:nth-child(2)");

if (username) {
  nameElement.textContent = `Name: ${username}`;
  usernameElement.textContent = `Username: ${username}`;
} else {
  // Handle the case when no username is provided
  nameElement.textContent = "Name: Guest";
  usernameElement.textContent = "Username: Guest";
}

// Start exam button
document.addEventListener("DOMContentLoaded", function () {
    // Find the "Start Exam" button by its ID
    var startExamButton = document.getElementById("startExamButton");
  
    // Add a click event listener to the button
    startExamButton.addEventListener("click", function () {
      // Redirect to the exam.html page when the button is clicked
      window.location.href = "exam.html";
    });
  });
  