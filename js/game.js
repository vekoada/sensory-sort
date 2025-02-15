// game.js - Main game logic (start, category selection, evaluation)

import { gameData } from "./data.js"; // Or require('./data.js') if using CommonJS
// Function to start a new game
function startGame() {
  // Get container for cards
  const container = document.getElementById("card-container");
  container.innerHTML = ""; // Clear any existing cards
  container.classList.remove("hidden"); // Show the container

  // Get category and items, store correct order
  const selectedCategory = selectRandomCategory();
  const items = shuffleItems(selectedCategory);
  const correctOrder = items.map((item) => item.name);

  // Update category and unit display
  const categorySpan = document.getElementById("currentCategory");
  const unitSpan = document.getElementById("categoryUnit");
  const reminderText = document.getElementById("sortingReminder");

  categorySpan.textContent = selectedCategory.name;
  unitSpan.textContent = selectedCategory.unit;
  reminderText.textContent = `Sort from highest to lowest ${selectedCategory.unit}`;

  // Create and inject cards
  createCards(items);

  return correctOrder; // This will be useful later for checking answers
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

// Function to create and inject 7 cards with the items
function createCards(items) {
  const container = document.getElementById("card-container");

  items.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("draggable-card");
    card.setAttribute("draggable", true);
    card.textContent = item.name;
    container.appendChild(card);
  });
}

// Function to evaluate the user's order of items
function evaluateOrder(userOrder, correctOrder) {
  // Compare the user's order with the correct order
  // Calculate the score (number of correct placements)
  // Return the score
  let score = 0;
  for (let i = 0; i < userOrder.length; i++) {
    if (userOrder[i] === correctOrder[i]) {
      score++;
    }
  }
  return score;
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
  evaluateOrder,
  handleRoundEnd,
};
