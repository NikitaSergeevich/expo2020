import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { createLogger } from "redux-logger";
import rootReducer from '../redux-state';
//import { isProduction } from '../constants';
import { IS_IOS } from './normalize';

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['chatReducer', 'walkReducer', 'productReducer']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [promise, thunkMiddleware];

//middlewares.push(loggerMiddleware);


function configureStore() {
  //   const enhancer = compose(applyMiddleware(...middlewares));
  //   console.log(enhancer);

  const enhancer = compose(applyMiddleware(thunkMiddleware, promise, loggerMiddleware))
  let store = createStore(persistedReducer, enhancer);
  return store;
}

export const store = configureStore({});

// function persistedStore(store) {
//   let persistor = persistStore(store, null, () => {});
//   return persistor;
// }

//const newPersistedStore = persistedStore(store);
