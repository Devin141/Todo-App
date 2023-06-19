import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleComplete, deleteTodo, editTodo } from '../redux/todoSlice'

const TodoItem = ({ id, title, completed }) => {
	const dispatch = useDispatch();
	const [updatedValue, setUpdatedValue] = useState('')
	const [editing, setEditing] = useState(false)

	const handleCheckbox = () => {
		dispatch(toggleComplete({ id, completed: !completed }))
	}

	const handleDelete = () => {
		dispatch(deleteTodo({ id }))
	}

	const handleEdit = () => {
		setEditing(true)
	}

	const handleSubmitEdit = (event) => {
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

		<button onClick={handleSubmitEdit} className='btn btn-danger'>
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
						onClick={handleCheckbox}
					></input>
					{title}
				</span>
				<button onClick={handleEdit} className='btn btn-danger'>
					Edit
				</button>
				<button onClick={handleDelete} className='btn btn-danger'>
					Delete
				</button>
			</div>
		</li>
	)
}

export default TodoItem;
