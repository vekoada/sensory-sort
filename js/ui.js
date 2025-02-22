// ui.js

// Function to display feedback to the user (correct/incorrect)
function showFeedback(isCorrect, message, correctPositions = [], items = []) {
  const feedbackEl = document.getElementById("feedback");

  feedbackEl.textContent = message;
  feedbackEl.className = `mt-4 p-4 rounded-lg text-center ${
    isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
  }`;
  feedbackEl.classList.remove("hidden");

  // Add visual feedback for correct positions
  const cards = document.querySelectorAll(".draggable-card");
  cards.forEach((card, index) => {
    // Remove any existing value displays first
    const existingValueDisplay = card.querySelector(".text-sm");
    if (existingValueDisplay) {
      existingValueDisplay.remove();
    }

    if (correctPositions[index]) {
      card.classList.add("correct");
      // If all correct, show the values
      if (isCorrect) {
        const value = items.find(
          (item) => item.name === card.dataset.itemName
        )?.value;
        const unit = items[0]?.unit;
        const valueDisplay = document.createElement("div");
        valueDisplay.className = "text-sm text-gray-600 mt-2";
        valueDisplay.textContent = `${value} ${unit}`;
        card.appendChild(valueDisplay);
      }
    } else {
      card.classList.remove("correct");
    }
  });
}

// Function to update the score display
function updateScoreDisplay(score, total) {
  const scoreEl = document.getElementById("score");
  scoreEl.textContent = `Score: ${score}/${total}`;
  scoreEl.classList.remove("hidden");
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

// Add this new function
function createSubmitButton(onSubmit) {
  const submitButton = document.createElement("button");
  submitButton.textContent = "Check Order";
  submitButton.className =
    "mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200";
  submitButton.addEventListener("click", onSubmit);
  return submitButton;
}

export {
  showFeedback,
  updateScoreDisplay,
  initializePopup,
  hideInstructionPopup,
  createSubmitButton,
};
