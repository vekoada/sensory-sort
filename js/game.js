// game.js - Main game logic (start, category selection, evaluation)

import { gameData } from "./data.js"; // Or require('./data.js') if using CommonJS
import { setupDragDrop } from "./drag-drop.js";
import { showFeedback, updateScoreDisplay, createSubmitButton } from "./ui.js";
import { startTimer, stopTimer, formatTime } from "./timer.js";

/**
 * Starts a new game.  This function:
 *   - Clears the card container.
 *   - Selects a random category and shuffles its items.
 *   - Updates the category and unit display.
 *   - Creates and injects cards into the container.
 *   - Sets up drag and drop functionality.
 *   - Starts the timer.
 */
function startGame() {
  // Get container for cards.
  const container = document.getElementById("card-container");
  container.innerHTML = ""; // Clear any existing cards.
  container.classList.remove("hidden"); // Show the container.

  // Get category and items, store correct order.
  const selectedCategory = selectRandomCategory();
  const items = shuffleItems(selectedCategory);

  // Update category and unit display.
  const categorySpan = document.getElementById("currentCategory");
  const unitSpan = document.getElementById("categoryUnit");
  const reminderText = document.getElementById("sortingReminder");

  categorySpan.textContent = selectedCategory.name;
  unitSpan.textContent = selectedCategory.unit;
  reminderText.textContent = `Sort from highest to lowest ${selectedCategory.unit}`;

  // Create and inject cards.
  createCards(items);

  setupDragDrop();

  // Start the timer.
  startTimer();
}

// Function to select a random category from the gameData
function selectRandomCategory() {
  const categories = gameData.categories;
  const randomIndex = Math.floor(Math.random() * categories.length);
  return categories[randomIndex]; // Return the entire category object instead of just the name
}

// Function to return 7 random items from a category
function shuffleItems(category) {
  const items = gameData.categories.find((c) => c.name === category.name).items;
  const shuffledItems = items.sort(() => Math.random() - 0.5);
  return shuffledItems.slice(0, 7).map((item) => ({
    ...item,
    category: category.name,
    unit: category.unit,
  }));
}

function createCorrectOrder(items) {
  // Sort items by value in descending order (highest to lowest)
  const sortedItems = [...items].sort((a, b) => b.value - a.value);
  return sortedItems.map((item) => item.name);
}

// Function to create and inject 7 cards with the items
function createCards(items) {
  const container = document.getElementById("card-container");
  container.innerHTML = ""; // Clear existing content

  // Store the full item data in the card's dataset
  items.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("draggable-card");
    card.setAttribute("draggable", true);
    card.textContent = item.name;
    card.dataset.itemName = item.name;
    card.dataset.value = item.value; // Add the value to the dataset
    container.appendChild(card);
  });

  // Add submit button and evaluation logic
  const handleSubmit = () => {
    const cards = container.querySelectorAll(".draggable-card");
    const userOrder = Array.from(cards).map((card) => card.dataset.itemName);
    const correctOrder = createCorrectOrder(items);
    const { score, correctPositions } = evaluateOrder(userOrder, correctOrder);

    // Only stop timer if all items are correct
    const isCorrect = score === userOrder.length;
    const totalTime = isCorrect ? stopTimer() : null;

    const message = isCorrect
      ? `Perfect! You got them all correct! Now you can see the actual values.`
      : `You got ${score} out of ${userOrder.length} correct. Try again!`;

    showFeedback(isCorrect, message, correctPositions, items);
    updateScoreDisplay(score, userOrder.length);
  };

  const submitButton = createSubmitButton(handleSubmit);
  container.appendChild(submitButton);
}

// Function to evaluate the user's order of items
function evaluateOrder(userOrder, correctOrder) {
  let score = 0;
  const correctPositions = userOrder.map((item, index) => {
    const isCorrect = item === correctOrder[index];
    if (isCorrect) score++;
    return isCorrect;
  });

  return { score, correctPositions };
}

export {
  startGame,
  selectRandomCategory,
  shuffleItems,
  createCorrectOrder,
  evaluateOrder,
};
