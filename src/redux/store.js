import { combineReducers, configureStore } from '@reduxjs/toolkit';
import questionReducer from './question_reducer';
import resultReducer from './result_reducer';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    questions: questionReducer,
    result: resultReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer:persistedReducer,
    // reducer:rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});
export const persistor = persistStore(store)