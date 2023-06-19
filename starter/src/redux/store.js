import { configureStore } from '@reduxjs/toolkit';
import generateActions from './generateActions';


export default configureStore({
	reducer: {
        todos: generateActions
    },
});