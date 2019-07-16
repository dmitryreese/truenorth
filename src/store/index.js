import createStore from './store';
import INITIAL_STATE from './initialState';

const STORE = createStore(INITIAL_STATE);

export const {
  getState,
  updateState,
  subscribe,
} = STORE;

export default STORE;
