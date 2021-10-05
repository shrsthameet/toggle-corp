import { useState, useEffect, ChangeEventHandler, FormEventHandler, DragEvent } from 'react'
import './App.css'
import { Button, Input } from './components/CoreUI'
import { Draggable } from './components/Draggable'
import { getFromStorage, updateStorage } from './utils/localStorage'
import { FunctionWithParam } from './utils/main'
import { generateUniqueID } from './utils/UtilFunctions'
import Modal from 'react-modal'
export interface IAddedItem {
	id: string
	name: string
	status: string
}

function App() {
	const [todoItems, setTodoItems] = useState<IAddedItem[]>([])
	const [todoName, setTodoName] = useState('')
	const [modalIsOpen, setIsOpen] = useState(false)

	const toggleModal = () => {
		setIsOpen(!modalIsOpen)
	}

	const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
		const { value } = event.target
		setTodoName(value)
	}

	const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
		event.preventDefault()
		let newTodos = [...todoItems, { id: generateUniqueID(), name: todoName, status: 'todo' }]
		setTodoItems(newTodos)
		setTodoName('')
		updateStorage('listOfTodos', JSON.stringify(newTodos))
	}

	const deleteTodo: FunctionWithParam<string> = todoID => {
		let filteredTodos = todoItems.filter(todo => todo.id !== todoID)
		setTodoItems(filteredTodos)
		updateStorage('listOfTodos', JSON.stringify(filteredTodos))
	}

	const dragOver: FunctionWithParam<DragEvent<HTMLDivElement>> = e => {
		e.preventDefault()
	}

	const onDragStart = (e: DragEvent<HTMLDivElement>, id: string) => {
		e.dataTransfer.setData('id', id)
	}

	const onDrop = (e: DragEvent<HTMLDivElement>, currentStatus: string) => {
		let id = e.dataTransfer.getData('id')
		const updatedTodoItem: IAddedItem[] = todoItems.filter(item => {
			if (item.id === id) {
				item.status = currentStatus
			}
			return item
		})
		setTodoItems(updatedTodoItem)
		updateStorage('listOfTodos', JSON.stringify(updatedTodoItem))
	}

	useEffect(() => {
		// Load todos from storage if available
		const values = getFromStorage('listOfTodos') as IAddedItem[]
		if (values) {
			setTodoItems(values)
		}
	}, [])
	return (
		<>
			<div className='App'>
				<h2>Add Item</h2>
				<form onSubmit={handleSubmit}>
					<Input autoComplete='off' type='text' name='todoName' value={todoName} onChange={handleChange} />
					<Button disabled={!todoName}>Add +</Button>
				</form>
				<div className='drag-n-drop'>
					<div className='dnd-group' onDragOver={dragOver} onDrop={e => onDrop(e, 'todo')}>
						<h4>TODO</h4>
						{todoItems.map(
							todoItem =>
								todoItem.status === 'todo' && (
									<Draggable
										dragStart={onDragStart}
										key={todoItem.id}
										todoItem={todoItem}
										deleteTodo={deleteTodo}
										handleEdit={toggleModal}
									/>
								)
						)}
					</div>
					<div className='dnd-group' onDragOver={dragOver} onDrop={e => onDrop(e, 'inProgress')}>
						<h4>IN PROGRESS</h4>
						{todoItems.map(
							todoItem =>
								todoItem.status === 'inProgress' && (
									<Draggable
										dragStart={onDragStart}
										key={todoItem.id}
										todoItem={todoItem}
										deleteTodo={deleteTodo}
										handleEdit={toggleModal}
									/>
								)
						)}
					</div>
					<div className='dnd-group' onDragOver={dragOver} onDrop={e => onDrop(e, 'done')}>
						<h4>DONE</h4>
						{todoItems.map(
							todoItem =>
								todoItem.status === 'done' && (
									<Draggable
										dragStart={onDragStart}
										key={todoItem.id}
										todoItem={todoItem}
										deleteTodo={deleteTodo}
										handleEdit={toggleModal}
									/>
								)
						)}
					</div>
				</div>
			</div>
			<Modal isOpen={modalIsOpen} onRequestClose={toggleModal} contentLabel='Example Modal'>
				<h2>Edit TODO</h2>
				<form>
					<Input />
					<button>Edit</button>
				</form>
			</Modal>
		</>
	)
}

export default App
