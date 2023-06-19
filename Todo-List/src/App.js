import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddTodoForm from './components/createTodo';
import TodoList from './components/displayTodoList';
import TotalCompleteItems from './components/TotalCompleteItems';

const App = () => {
	return (
		<div className='container bg-white p-4 mt-5'>
			<h1>Todo List</h1>
			<AddTodoForm />
			<TodoList />
			<TotalCompleteItems />
		</div>
	);
};

export default App;
