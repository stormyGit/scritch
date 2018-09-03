import { compose, applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from './reducers';

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
    whitelist: ['sessionToken'],
  },
  reducers
);

export default () => {
  let store = createStore(persistedReducer);
  let persistor = persistStore(store);

  return { store, persistor };
};
