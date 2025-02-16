// game.js - Main game logic (start, category selection, evaluation)

import { gameData } from "./data.js"; // Or require('./data.js') if using CommonJS
import { setupDragDrop } from "./drag-drop.js";
import { showFeedback, updateScoreDisplay, createSubmitButton } from "./ui.js";

// Function to start a new game
function startGame() {
  // Get container for cards
  const container = document.getElementById("card-container");
  container.innerHTML = ""; // Clear any existing cards
  container.classList.remove("hidden"); // Show the container

  // Get category and items, store correct order
  const selectedCategory = selectRandomCategory();
  const items = shuffleItems(selectedCategory);

  // Update category and unit display
  const categorySpan = document.getElementById("currentCategory");
  const unitSpan = document.getElementById("categoryUnit");
  const reminderText = document.getElementById("sortingReminder");

  categorySpan.textContent = selectedCategory.name;
  unitSpan.textContent = selectedCategory.unit;
  reminderText.textContent = `Sort from highest to lowest ${selectedCategory.unit}`;

  // Create and inject cards
  createCards(items);

  setupDragDrop();
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

    // Show feedback
    const isCorrect = score === userOrder.length;
    const message = isCorrect
      ? "Perfect! You got them all correct! Now you can see the actual values."
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

// Function to handle the end of a round or game
function handleRoundEnd() {
  // Logic to:
  // 1. Update the game state (e.g., increment the round counter)
  // 2. Display the results of the round
  // 3. Determine if the game is over
  // 4. If the game is over, display the final score and options to play again
  // 5. If the game is not over, select a new category and start the next round
}

export {
  startGame,
  selectRandomCategory,
  shuffleItems,
  createCorrectOrder,
  evaluateOrder,
  handleRoundEnd,
};
