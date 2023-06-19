import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleCompleteAsync, deleteTodoAsync, editTodo } from '../redux/todoSlice';

const TodoItem = ({ id, title, completed }) => {
	const dispatch = useDispatch();
	const [updatedValue, setUpdatedValue] = useState('')
	const [editing, setEditing] = useState(false)

	const handleCheckboxClick = () => {
		dispatch(toggleCompleteAsync({ id, completed: !completed }));
	}

	const handleDeleteClick = () => {
		dispatch(deleteTodoAsync({ id }));
	}

	const handleEdit = () => {
		setEditing(true)
	}

	const handleEditSubmit = (event) => {
		event.preventDefault()
		dispatch(editTodo({ id, title: updatedValue }))
		setEditing(false)
	}

    if (editing) {
		return (
	<div className='d-flex justify-content-between'>
		<input
			type='text'
			className='form-control mb-2 mr-sm-2'
			placeholder='Edit Todo'
			value={updatedValue}
			onChange={(event) => setUpdatedValue(event.target.value)}
		></input>
         {title}

		<button onClick={handleEditSubmit} className='btn btn-danger'>
		    Submit
		</button>
	</div>
		)
	}
	return (
		<li className={`list-group-item ${completed && 'list-group-item-success'}`}>
			<div className='d-flex justify-content-between'>
				<span className='d-flex align-items-center'>
					<input
						type='checkbox'
						className='mr-3'
						checked={completed}
						onClick={handleCheckboxClick}
					></input>
					{title}
				</span>
				<button onClick={handleEdit} className='btn btn-danger'>
					Edit
				</button>
				<button onClick={handleDeleteClick} className='btn btn-danger'>
					Delete
				</button>
			</div>
		</li>
	);
};

export default TodoItem;
