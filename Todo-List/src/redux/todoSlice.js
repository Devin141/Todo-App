import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const getTodos = createAsyncThunk(
	'todos/getTodosAsync',
	async () => {
		const res = await fetch('http://localhost:7000/todos')
		if (res.ok) {
			const todos = await res.json()
			return { todos }
		}
	}
);

export const createTodo = createAsyncThunk(
	'todos/addTodoAsync',
	async (payload) => {
		const res = await fetch('http://localhost:7000/todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title: payload.title }),
		});

		if (res.ok) {
			const todo = await res.json()
			return { todo }
		}
	}
);

export const toggleComplete = createAsyncThunk(
	'todos/toggleComplete',
	async (payload) => {
		const res = await fetch(`http://localhost:7000/todos/${payload.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ completed: payload.completed }),
		})

		if (res.ok) {
			const todo = await res.json()
			return { todo }
		}
	}
)

export const deleteTodo = createAsyncThunk(
	'todos/deleteTodoAsync',
	async (payload) => {
		const res = await fetch(`http://localhost:7000/todos/${payload.id}`, {
			method: 'DELETE',
		});

		if (res.ok) {
			return { id: payload.id }
		}
	}
);

export const todoSlice = createSlice({
	name: 'todos',
	initialState: [],
	reducers: {
		editTodo: (state, action) => {
			return state.map((todo) => {
				if (todo.id === action.payload.id) {
				  return {
					...todo,
					title: action.payload.title }}
				return todo
			  })}},

	extraReducers: {
		[getTodos.fulfilled]: (state, action) => {
			return action.payload.todos
		},
		[createTodo.fulfilled]: (state, action) => {
			state.push(action.payload.todo)
		},
		[toggleComplete.fulfilled]: (state, action) => {
			const index = state.findIndex((todo) => todo.id === action.payload.todo.id)
			state[index].completed = action.payload.todo.completed
		},
		[deleteTodo.fulfilled]: (state, action) => {
			return state.filter((todo) => todo.id !== action.payload.id)
		},
	}
})

export const { editTodo } = todoSlice.actions

export default todoSlice.reducer
