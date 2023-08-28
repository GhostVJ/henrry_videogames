import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Si utilizas middleware como redux-thunk
import rootReducer from '../reducer'; // Importa tu reducer combinado aquí

const store = createStore(rootReducer, applyMiddleware(thunk)); // Crea el store con el reducer y el middleware

export default store;