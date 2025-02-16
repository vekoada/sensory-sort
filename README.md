# Sensory Sort

## Overview

Sensory Sort is a simple, interactive web-based game where users drag and drop cards representing different sensory experiences (like brightness, loudness, or spiciness) to arrange them in descending order based on their perceived intensity. The game provides a fun and educational way to test your perception and understanding of the scale of various sensory and physical phenomena.

## Features

- **Random Category Selection:** Each game round presents a randomly chosen sensory category, keeping the gameplay fresh and engaging.
- **Drag-and-Drop Interface:** An intuitive drag-and-drop interface allows users to easily arrange the cards in their desired order.
- **Real-time Feedback:** After submitting their arrangement, users receive immediate feedback on their accuracy, including a score and visual indicators of correct/incorrect placements.
- **Dynamic Difficulty:** The game can be easily expanded with more categories and items to increase its complexity and replayability.
- **Responsive Design:** The game is designed to be responsive and playable on various screen sizes and devices.
- **Tailwind CSS styling**: Utilizes the powerful tailwind framework for a nice and modern look.

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone [your-repository-url]
    cd sensory-sorting-game
    ```

2.  **Open `index.html` in your web browser:**

    Simply open the `index.html` file in your preferred web browser (Chrome, Firefox, Safari, etc.). No server setup is required as the game is entirely client-side.

## Game Data (data.js)

The `data.js` file is crucial and contains the data that drives the game:
categories: An array of category objects.

- `name`: The name of the sensory category (e.g., "Brightness", "Loudness").

- `unit`: The unit of measurement for the category (e.g., "lumens", "decibels").

- `items`: An array of item objects within that category.

- `name`: The name of the sensory item (e.g., "Dim Bulb", "Whisper").

- `value`: The numerical value representing the intensity of the item within the category. Crucially used for sorting.

## Contributing

Contributions to the Sensory Sorting Game are welcome! Here are some ways you can contribute:

- Expand the data.js file with more sensory categories and items.

- Enhance the user interface and visual design of the game.

- Implement new features, such as:

  - A timer.

  - Different difficulty levels.

  - A high score leaderboard.

  - More complex evaluation methods.

- Report and fix any bugs or issues you encounter.

- Improve the code's readability, maintainability, and performance.

- Improve the project's documentation.
