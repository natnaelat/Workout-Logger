// Import AWS Amplify
import { Auth } from "aws-amplify";

// Import your Amplify configuration
import awsconfig from "./aws-exports"; // Adjust path as needed

// Configure AWS Amplify
Auth.configure(awsconfig);

// Function to handle user signup
async function signUp(event) {
  event.preventDefault(); // Prevent default form submission

  const email = document.getElementById("email").value; // Get email from input field
  const password = document.getElementById("password").value; // Get password from input field
  const confirmPassword = document.getElementById("confirmPassword").value; // Get confirm password from input field

  // Check if password and confirm password match
  if (password !== confirmPassword) {
    alert("Passwords do not match. Please check and try again.");
    return; // Stop the signup process if passwords don't match
  }

  try {
    const { user } = await Auth.signUp({
      username: email, // Use email as the username (Cognito requires a unique username)
      password,
      attributes: { email }, // Specify email attribute
    });

    console.log(user); // Log user details for debugging
    alert("Signup successful! Please check your email for verification.");

    // Redirect to exercise page after successful signup
    window.location.href = "exercisepage.html"; // Redirect to the exercise page
  } catch (error) {
    console.error(error);
    alert("Error signing up: " + error.message);
  }
}

// Event listener for the signup button click
document.getElementById("signupButton").addEventListener("click", signUp);
