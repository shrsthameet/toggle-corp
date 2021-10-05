import { FC, DragEvent } from 'react'
import { IAddedItem } from '../App'
import { FunctionWithNoParam, FunctionWithParam } from '../utils/main'
interface IDraggableProps {
	todoItem: IAddedItem
	deleteTodo: FunctionWithParam<string>
	handleEdit: FunctionWithNoParam
	dragStart: (e: DragEvent<HTMLDivElement>, id: string) => void
}

export const Draggable: FC<IDraggableProps> = props => {
	const { todoItem, deleteTodo, handleEdit, dragStart } = props

	return (
		<>
			<div className='dnd-item' draggable onDragStart={e => dragStart(e, todoItem.id)}>
				<div>
					<p>{todoItem.name}</p>
				</div>
				<div>
					<span className='edit-button' onClick={handleEdit}>
						Edit
					</span>
					<span className='delete-button' onClick={() => deleteTodo(todoItem.id)}>
						Delete
					</span>
				</div>
			</div>
		</>
	)
}
