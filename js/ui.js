// ui.js - UI manipulation functions (rendering items, feedback)

// Function to render the items in a draggable format
function renderItems(items, containerElement) {
  // Clear the container element
  // Loop through the items array
  // Create HTML elements (e.g., divs) for each item
  // Add the necessary attributes for drag-and-drop (draggable="true", etc.)
  // Append the item elements to the container
}

// Function to display feedback to the user (correct/incorrect)
function showFeedback(isCorrect, message) {
  // Update the UI to show whether the user's answer was correct or incorrect
  // Display a message to the user
  // (Could use color changes, animations, etc.)
}

// Function to update the score display
function updateScoreDisplay(score) {
  // Update the HTML element that displays the score
}

// Function to display the final results
function showResults(score) {
  // Show the final score
  // Display options to play again, share results, etc.
}

// Function to display the category and unit of measurement
function displayCategoryInfo(categoryName, unit) {
  // Update the HTML element with the category name
  // Update the HTML element with the unit of measurement
}

// Function to show the instruction popup
function showInstructionPopup() {
  const popup = document.getElementById("instruction-popup");
  popup.classList.remove("hidden");
  popup.classList.add("visible");
}

function hideInstructionPopup() {
  const popup = document.getElementById("instruction-popup");
  popup.classList.add("hidden");

  // Remove the visible class if it exists
  popup.classList.remove("visible");
}

// Initialize the popup with delay
function initializePopup() {
  const popup = document.getElementById("instruction-popup");
  // Start with popup hidden
  popup.classList.add("hidden");

  // Show after delay
  setTimeout(() => {
    popup.classList.remove("hidden");
    popup.classList.add("visible");
  }, 750);
}

export {
  renderItems,
  showFeedback,
  updateScoreDisplay,
  showResults,
  displayCategoryInfo,
  initializePopup,
  hideInstructionPopup,
};
