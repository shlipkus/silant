import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth-reducer'
import BaseDataReducer from './reducers/base-data-reducer';
import MainDataReducer from './reducers/maindata-reducer';
import TechReducer from './reducers/tech-reducer';
import ListReducer from './reducers/machine-list'

const store = configureStore({
    reducer: {
        auth: authReducer,
        basedata: BaseDataReducer,
        maindata: MainDataReducer,
        tech: TechReducer,
        machines: ListReducer
    }
  })
  
  
  export default store