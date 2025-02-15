// drag-drop.js - Drag and Drop handling

// Function to handle the dragstart event
function handleDragStart(event) {
  // Add dragging class for visual feedback
  event.target.classList.add("dragging");

  // Debug log before setting data
  console.log("Dragging element with ID:", event.target.id);

  // Store the card's ID and content for transfer
  event.dataTransfer.setData("text/plain", event.target.id);
  // Also store it as a backup
  event.dataTransfer.setData("application/x-drag-id", event.target.id);

  // Set drag effect
  event.dataTransfer.effectAllowed = "move";

  // Add a ghost image effect
  const dragIcon = event.target.cloneNode(true);
  dragIcon.style.opacity = "0.5";
  dragIcon.style.position = "absolute";
  dragIcon.style.top = "-1000px";
  document.body.appendChild(dragIcon);
  event.dataTransfer.setDragImage(dragIcon, 0, 0);

  // Remove the ghost element after it's no longer needed
  setTimeout(() => {
    document.body.removeChild(dragIcon);
  }, 0);
}

// Function to handle the dragover event
function handleDragOver(event) {
  event.preventDefault(); // Allow dropping

  // Accept drops on both the container and its children
  const container =
    event.target.closest(".card-container") ||
    (event.target.classList.contains("card-container") ? event.target : null);

  if (container) {
    event.dataTransfer.dropEffect = "move";
  }
}

// Function to handle the dragenter event
function handleDragEnter(event) {
  const container = event.target.closest(".card-container");
  if (container) {
    container.classList.add("drag-over");
  }
}

// Function to handle the dragleave event
function handleDragLeave(event) {
  const container = event.target.closest(".card-container");
  if (container) {
    container.classList.remove("drag-over");
  }
}

// Function to handle the drop event
function handleDrop(event) {
  event.preventDefault();

  // Try both ways to get the dragged element ID
  let draggedId = event.dataTransfer.getData("text/plain");
  if (!draggedId) {
    draggedId = event.dataTransfer.getData("application/x-drag-id");
  }

  // Debug logging for data transfer
  console.log("Retrieved dragged ID:", draggedId);
  console.log("Available types:", event.dataTransfer.types);

  const draggedElement = document.getElementById(draggedId);

  // Debug logging
  console.log("Dragged element found:", draggedElement);

  // Find the closest container to the drop point
  let container = event.target.closest(".card-container");

  // If the target itself is the container, use it directly
  if (event.target.classList.contains("card-container")) {
    container = event.target;
  }

  // Debug logging
  console.log("Drop target:", event.target);
  console.log("Container found:", container);
  console.log("Dragged element:", draggedElement);

  // If we don't have both a valid container and dragged element, exit
  if (!container || !draggedElement) {
    console.log("Invalid drop target or dragged element");
    console.log("Container:", container);
    console.log("Dragged element:", draggedElement);
    return;
  }

  // Find the card being dropped on (if any)
  const dropTargetCard = event.target.closest(".draggable-card");

  if (dropTargetCard && dropTargetCard !== draggedElement) {
    // Dropping on another card
    const rect = dropTargetCard.getBoundingClientRect();
    const dropPosition = event.clientY < rect.top + rect.height / 2;

    if (dropPosition) {
      container.insertBefore(draggedElement, dropTargetCard);
    } else {
      container.insertBefore(draggedElement, dropTargetCard.nextSibling);
    }
  } else if (!dropTargetCard) {
    // Dropping directly in the container
    container.appendChild(draggedElement);
  }

  // Clean up
  container.classList.remove("drag-over");
}

// Function to handle the dragend event
function handleDragEnd(event) {
  event.target.classList.remove("dragging");
  // Remove drag-over class from all containers
  document.querySelectorAll(".card-container").forEach((container) => {
    container.classList.remove("drag-over");
  });
}

// Modify the setupDragDrop function
function setupDragDrop() {
  // Remove any existing event listeners first
  const existingDraggables = document.querySelectorAll(".draggable-card");
  existingDraggables.forEach((item) => {
    item.removeAttribute("draggable");
    item.removeEventListener("dragstart", handleDragStart);
    item.removeEventListener("dragend", handleDragEnd);
  });

  // Set up new event listeners
  const draggableItems = document.querySelectorAll(".draggable-card");
  const dropContainers = document.querySelectorAll(".card-container");

  console.log("Found containers:", dropContainers.length);

  // Ensure all draggable items have IDs
  draggableItems.forEach((item, index) => {
    if (!item.id) {
      item.id = `draggable-card-${index}`;
    }
    console.log("Setting up draggable item:", item.id);
    item.setAttribute("draggable", "true");
    item.addEventListener("dragstart", handleDragStart);
    item.addEventListener("dragend", handleDragEnd);
  });

  dropContainers.forEach((container) => {
    // Make sure container is visible
    container.classList.remove("hidden");

    container.addEventListener("dragover", handleDragOver);
    container.addEventListener("dragenter", handleDragEnter);
    container.addEventListener("dragleave", handleDragLeave);
    container.addEventListener("drop", handleDrop);

    // Debug log
    console.log("Container setup:", container);
  });
}

export {
  handleDragStart,
  handleDragOver,
  handleDragEnter,
  handleDragLeave,
  handleDrop,
  handleDragEnd,
  setupDragDrop,
};
