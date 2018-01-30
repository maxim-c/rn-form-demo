import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import thunk from 'redux-thunk';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import {
  popup,
  auth,
} from './reducers';

const authConfig = {
  key: 'auth',
  whitelist: ['isLogged'],
  storage,
};

const combinedReducer = combineReducers({
  auth: persistReducer(authConfig, auth),
  popup,
});

const middleware = [
  thunk,
];

const configureStore = compose(
  applyMiddleware(...middleware),
)(createStore);

const store = configureStore(combinedReducer);
const persistor = persistStore(store);

export {
  store,
  persistor,
};