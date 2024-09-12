
# To-Do List App

## Overview

This To-Do List app is a dynamic and responsive project created using pure HTML, CSS, and JavaScript. It showcases my skills in building interactive web applications with features such as theme switching, animations, and dynamic messaging.

## Key Features

- **Light and Dark Modes**: Toggle between light and dark themes.
- **Responsive Design**: Fully responsive layout for different devices.
- **Custom Animations**: Dynamic animations for To-Do items.
- **Dynamic Popup Messaging**: Real-time feedback with customizable popups.

## Animation Handling

The app includes a flexible animation system managed through JavaScript and CSS. Here’s a detailed breakdown of how animations are handled:

### JavaScript Animation Function

The `animationStatus` function allows you to apply CSS animations to specific To-Do items dynamically.
## Live Demo

You can view the live demo of the landing page [here](https://omar-ra7al.github.io/JS-todo-List-/).
##live demo link[]
```javascript
function animationStatus(className, index) {
  // Select the To-Do item at the specified index
  const todo = document.querySelectorAll(".todos-container .todos")[index];
  
  // Add the specified animation class to the To-Do item
  todo.classList.add(className);
}
