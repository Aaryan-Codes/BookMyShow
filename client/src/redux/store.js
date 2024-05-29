import {configureStore} from '@reduxjs/toolkit'
import loaderReducer from './Slices/loaderSlice';
import userReducer from './Slices/userSlice';

const store = configureStore({
    reducer : {
        loader : loaderReducer,
        user : userReducer
    }
})

export default store;