import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth-reducer'
import BaseDataReducer from './reducers/base-data-reducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        basedata: BaseDataReducer,
    }
  })
  
  
  export default store