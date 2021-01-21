import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./redux/rootReducer";

const initialState = {};

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

const store = createStore(
  rootReducer,
 // persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

  export let persistor = persistStore(store);


export default store;

