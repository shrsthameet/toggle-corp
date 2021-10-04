import { useState, useEffect, ChangeEventHandler, FormEventHandler } from 'react'
import './App.css'
import { Button, Input } from './components/CoreUI'
import { Draggable } from './components/Draggable'
import { useForm } from './customHooks/useForm'
import { getFromStorage, updateStorage } from './utils/localStorage'
import { generateUniqueID } from './utils/UtilFunctions'

export interface IAddedItem {
	id: string
	name: string
}

interface IFormFields {
	itemName: string
}

const initialValues = {
	itemName: '',
}

function App() {
	const [todoItems, setTodoItems] = useState<IAddedItem[]>([])
	const [todoName, setTodoName] = useState('')
	const [inProgressItems, setInProgressItems] = useState<IAddedItem[] | []>([])
	const [doneItems, setDoneItems] = useState<IAddedItem[] | []>([])

	const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
		const { value } = event.target
		setTodoName(value)
	}

	const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
		event.preventDefault()
		let newTodos = [...todoItems, { name: todoName, id: generateUniqueID() }]
		setTodoItems(newTodos)
		setTodoName('')
		updateStorage('listOfTodos', JSON.stringify(newTodos))
	}
	return (
		<div className='App'>
			<h2>Add Item</h2>
			<form onSubmit={handleSubmit}>
				<Input autoComplete='off' type='text' name='todoName' value={todoName} onChange={handleChange} />
				<Button disabled={!todoName}>Add +</Button>
			</form>
			<div className='drag-n-drop'>
				<div className='dnd-group'>
					<h4>TODO</h4>
					{todoItems.map(todoItem => (
						<Draggable key={todoItem.id} todoItem={todoItem} />
					))}
				</div>
				<div className='dnd-group'>
					<h4>IN PROGRESS</h4>
					{inProgressItems.map(todoItem => (
						<Draggable key={todoItem.id} todoItem={todoItem} />
					))}
				</div>
				<div className='dnd-group'>
					<h4>DONE</h4>
					{doneItems.map(todoItem => (
						<Draggable key={todoItem.id} todoItem={todoItem} />
					))}
				</div>
			</div>
		</div>
	)
}

export default App
