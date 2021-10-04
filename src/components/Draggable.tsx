import { FC } from 'react'
import { IAddedItem } from '../App'

interface IDraggableProps {
	todoItem: IAddedItem
}

export const Draggable: FC<IDraggableProps> = props => {
	const { todoItem } = props
	return (
		<div className='dnd-item' draggable>
			<div>
				<p>{todoItem.name}</p>
			</div>
			<div>
				<span className='edit-button'>Edit</span>
				<span className='delete-button'>Delete</span>
			</div>
		</div>
	)
}
