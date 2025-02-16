# Sensory Sort

## Overview

Sensory Sort is a simple, interactive web-based game where users drag and drop cards representing different sensory experiences (like brightness, loudness, or spiciness) to arrange them in descending order based on their perceived intensity. The game provides a fun and educational way to test your perception and understanding of the scale of various sensory and physical phenomena.

## Features

- **Random Category Selection**
- **Drag-and-Drop Interface**
- **Real-time Feedback**
- **Tailwind CSS styling**

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone git@github.com:vekoada/sensory-sort.git
    cd sensory-sorting-game
    ```

2.  **Open `index.html` in your web browser:**

    Simply open the `index.html` file in your preferred web browser (Chrome, Firefox, Safari, etc.). No server setup is required as the game is entirely client-side. You can also play at [sensorysort.netlify.app](https://sensorysort.netlify.app)

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
