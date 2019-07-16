const GameState = (gameState) => {
  const container = document.createElement('div');

  container.innerHTML = gameState;
  container.classList.add('game-state', 'mb40', `game-state_${gameState.toLowerCase()}`);

  return container;
}

export default GameState;
