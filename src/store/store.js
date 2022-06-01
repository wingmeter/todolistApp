import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "../redux/reducer";

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
}

const store = configureStore({
    reducer: reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware)
})

export default store;