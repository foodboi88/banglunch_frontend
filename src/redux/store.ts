/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AnyAction, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';
import rootReducer, { rootEpic, RootState } from './root.reducer';
import { persistStore,persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, RootState>();

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['app']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [
        ...getDefaultMiddleware({
            //Turn-off warning immutableCheck, serializableCheck
            immutableCheck: false,
            serializableCheck: false
        }),
        epicMiddleware
    ]
});

epicMiddleware.run(rootEpic);
type AppDispatch = typeof store.dispatch;
export const useDispatchRoot = () => {
    const dispatch = useDispatch<AppDispatch>();
    const funcMemo = useCallback((event: AnyAction) => {
        dispatch(event);
    }, [dispatch])
    return funcMemo;
}

export function useSelectorRoot<T>(fn: (store: RootState) => T): T {
    return useSelector(fn);
}

export const persistor = persistStore(store);

export default store;