const createStore = (initialState = {}) => {
  let STATE = initialState;
  let subscribedComponents = [];
  const customEvent = new CustomEvent('StateUpdated');

  const getState = () => STATE;

  const updateState = (newState) => {
    STATE = { ...STATE, ...newState };

    subscribedComponents.forEach((component) => component.dispatchEvent(customEvent));

    return STATE;
  }

  const subscribe = (component) => {
    subscribedComponents.push(component);
  }

  return {
    getState,
    updateState,
    subscribe,
  };
}

export default createStore;
