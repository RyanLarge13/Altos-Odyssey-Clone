# Altos Odyssey Clone-ish

Endless Dunes is a 2D side-scrolling game inspired by the popular **Alto's Odyssey** for Android, built entirely with **vanilla JavaScript** and **HTML5 Canvas**. This project features dynamically generated sand dunes, smooth animations, and hand-drawn artwork created using **Inkscape**.

This game is still in progress as me and my oldest son try to work problems out together

## Table of contents

- [Features](#features)
- [Game Art and Animations](#game-art-and-animation)
- [How It Works](#how-it-works)
- [Tools And Tech](#tools--technologies)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

<img src="/assets/Altos-Odyssey-Game.png" alt="game-play" />

## Features

- **Dynamic Sand Dunes Generation:**

  - The sand dunes are generated at runtime using a custom height map generator.
  - A cubic Bezier curve function transforms the heightmap into smooth, continuous dunes that smoothly change in amplitude and frequency randomly as the game progresses.
  - The current dune is 50,000 points long, with new dunes generated seamlessly as the player approaches the edge of the screen.
  - Dunes are spliced and combined to optimize performance as they move out of the viewport.

- **Hand-drawn Game Art:**
  - All images, characters, and animations were created by hand using **Inkscape**.
- **Custom Game Mechanics:**
  - The gameplay is focused on smooth scrolling and a relaxing environment akin to Alto's Odyssey.
  - Dynamic sand dunes give the illusion of infinite terrain while maintaining performance.

## Game Art and Animation

- Every sprite, background, and animation frame was designed using **Inkscape**, an open-source vector graphics editor. Inkscape allowed for precise, scalable artwork that gives the game its unique visual style.

[Check out Inkscape](https://inkscape.org/)

## How It Works

1. **Height Map Generator:**

   - The height map function produces random values that define the shape and structure of the sand dunes.

2. **Bezier Curve Generation:**

   - Using cubic Bezier curves, the game transforms heightmap data into smooth, flowing dunes.
   - This curve ensures the dunes are smooth and visually appealing.

3. **Seamless Dune Transition:**
   - As the player progresses, new dunes are generated on the right side of the screen and are combined with the existing dunes.
   - Once the dunes leave the screen on the left, their points are spliced to free memory and improve performance.

[Quick Video Of GamePlay](/assets/Game-Play.webm)

## Tools & Technologies

- **JavaScript**: No external libraries, entirely built with vanilla JavaScript.
- **HTML5 Canvas**: Used for rendering the dynamic dunes and character animations.
- **Inkscape**: The design tool of choice for all game assets and animations.

## Getting Started

To run the game locally:

1. Clone the repository:

   ```
   git clone https://github.com/RyanLarge13/Altos-Odyssey-Clone.git
   cd Altos-Odyssey-Clone
   ```

2. Open `index.html` in your browser:

   ```
   open index.html
   ```

## Contributing

Feel free to contribute by submitting issues, pull requests, or suggestions to improve the game!

## License

This project is licensed under the [MIT License](LICENSE).
