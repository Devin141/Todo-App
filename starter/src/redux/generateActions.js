import { createSlice } from '@reduxjs/toolkit';

export const generateActions = createSlice({
	name: 'todos',

	initialState: [
		{ id: 1, 
          title: 'item1', 
          completed: false },

		{ id: 2, 
          title: 'item2',
          completed: false },

		{ id: 3, 
          title: 'item3', 
          completed: true },

		{ id: 4, 
          title: 'item4',
          completed: false },

		{ id: 5, 
          title: 'item5', 
          completed: false },
	],
	reducers: {
		createTodo: (state, action) => {
            console.log(state)
			const todo = {
				id: new Date(),
				title: action.payload.title,
				completed: false,
			};
            console.log(todo)
			state.push(todo);
		},

		toggleComplete: (state, action) => {
			const index = state.findIndex((todo) => todo.id === action.payload.id)
			state[index].completed = action.payload.completed
		},

		deleteTodo: (state, action) => {
			return state.filter((todo) => todo.id !== action.payload.id)
		}
	},
});


export const { createTodo, toggleComplete, deleteTodo } = generateActions.actions

export default generateActions.reducer