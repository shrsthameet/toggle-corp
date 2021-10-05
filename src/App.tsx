import { useState, useEffect, DragEvent } from 'react'
import './App.css'
import { getFromStorage, updateStorage } from 'Utils/localStorage'
import { FunctionWithNoParam, FunctionWithParam } from 'Utils/main'
import { generateUniqueID } from 'Utils/UtilFunctions'
import { Draggable, DragDivision } from 'Components'
import { useForm } from 'CustomHooks/useForm'
export interface IAddedItem {
	id: string
	title: string
	description: string
	status: string
}
export interface IFormFieldValue {
	todoName: string
	description: string
}

const initialValues: IFormFieldValue = {
	todoName: '',
	description: '',
}

function App() {
	const [todoItems, setTodoItems] = useState<IAddedItem[]>([])
	const { data, handleChange, setData } = useForm<IFormFieldValue>({ initialValues })

	const handleSubmit = (title: string, func: FunctionWithNoParam) => {
		let newTodos = [
			...todoItems,
			{
				id: generateUniqueID(),
				title: data.todoName,
				description: data.description,
				status: title,
			},
		]
		setTodoItems(newTodos)
		setData(initialValues)
		updateStorage('listOfTodos', JSON.stringify(newTodos))
		func()
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
				<h2>Task Board</h2>
				<div className='drag-n-drop'>
					<DragDivision
						title={'TODO'}
						dragOver={dragOver}
						onDrop={dropItem}
						currentStatus={'TODO'}
						data={data}
						handleChange={handleChange}
						handleSubmit={handleSubmit}
					>
						{todoItems.map(
							todoItem =>
								todoItem.status === 'TODO' && (
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
						title={'ONGOING'}
						dragOver={dragOver}
						onDrop={dropItem}
						currentStatus={'ONGOING'}
						data={data}
						handleChange={handleChange}
						handleSubmit={handleSubmit}
					>
						{todoItems.map(
							todoItem =>
								todoItem.status === 'ONGOING' && (
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
						title={'DONE'}
						dragOver={dragOver}
						onDrop={dropItem}
						currentStatus={'DONE'}
						data={data}
						handleChange={handleChange}
						handleSubmit={handleSubmit}
					>
						{todoItems.map(
							todoItem =>
								todoItem.status === 'DONE' && (
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
			</div>
		</>
	)
}

export default App
