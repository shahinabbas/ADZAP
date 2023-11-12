import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: [thunk],
// });

// export default store;
