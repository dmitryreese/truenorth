const RestartButton = (onClickHandler) => {
  const container = document.createElement('button');

  container.innerHTML = 'Play Again';
  container.classList.add('restart-button');
  container.addEventListener('click', onClickHandler);

  return container;
}

export default RestartButton;
