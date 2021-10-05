import { useState, useEffect, DragEvent } from 'react'
import './App.css'
import { Button, Input } from 'Components/CoreUI'
import { getFromStorage, updateStorage } from 'Utils/localStorage'
import { FunctionWithParam } from 'Utils/main'
import { generateUniqueID } from 'Utils/UtilFunctions'
import { Draggable, DragDivision } from 'Components'
import { useForm } from 'CustomHooks/useForm'
export interface IAddedItem {
	id: string
	name: string
	status: string
}
interface IFormFieldValue {
	todoName: string
}

const initialValues = {
	todoName: '',
}

function App() {
	const [todoItems, setTodoItems] = useState<IAddedItem[]>([])
	const { data, handleChange, handleSubmit, setData } = useForm<IFormFieldValue>({
		initialValues,
		onSubmit: () => {
			let newTodos = [...todoItems, { id: generateUniqueID(), name: data.todoName, status: 'todo' }]
			setTodoItems(newTodos)
			setData(initialValues)
			updateStorage('listOfTodos', JSON.stringify(newTodos))
		},
	})

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

	const dropItem = (e: DragEvent<HTMLDivElement>, currentStatus: string) => {
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
					<Input
						autoComplete='off'
						type='text'
						name='todoName'
						value={data.todoName}
						onChange={handleChange}
					/>
					<Button disabled={!data.todoName}>Add +</Button>
				</form>
				{todoItems.length ? (
					<div className='drag-n-drop'>
						<DragDivision title={'TODO'} dragOver={dragOver} onDrop={dropItem} currentStatus={'todo'}>
							{todoItems.map(
								todoItem =>
									todoItem.status === 'todo' && (
										<Draggable
											dragStart={onDragStart}
											key={todoItem.id}
											todoItem={todoItem}
											deleteTodo={deleteTodo}
										/>
									)
							)}
						</DragDivision>
						<DragDivision
							title={'IN PROGRESS'}
							dragOver={dragOver}
							onDrop={dropItem}
							currentStatus={'inProgress'}
						>
							{todoItems.map(
								todoItem =>
									todoItem.status === 'inProgress' && (
										<Draggable
											dragStart={onDragStart}
											key={todoItem.id}
											todoItem={todoItem}
											deleteTodo={deleteTodo}
										/>
									)
							)}
						</DragDivision>
						<DragDivision title={'DONE'} dragOver={dragOver} onDrop={dropItem} currentStatus={'done'}>
							{todoItems.map(
								todoItem =>
									todoItem.status === 'done' && (
										<Draggable
											dragStart={onDragStart}
											key={todoItem.id}
											todoItem={todoItem}
											deleteTodo={deleteTodo}
										/>
									)
							)}
						</DragDivision>
					</div>
				) : (
					<h5>Board is empty. Add Items to get started.</h5>
				)}
			</div>
		</>
	)
}

export default App
