import { FC, DragEvent } from 'react'
import { IAddedItem } from 'App'
import { FunctionWithParam } from 'Utils/main'
import './draggable.css'
import classNames from 'classnames'

interface IDraggableProps {
	todoItem: IAddedItem
	deleteTodo: FunctionWithParam<string>
	dragStart: (e: DragEvent<HTMLDivElement>, id: string) => void
}

export const Draggable: FC<IDraggableProps> = props => {
	const { todoItem, deleteTodo, dragStart } = props

	return (
		<>
			<div
				className={classNames('mainStyle', `dnd-item-${todoItem.status}`)}
				id={todoItem.id}
				draggable
				onDragStart={e => dragStart(e, todoItem.id)}
			>
				<div>
					<p>{todoItem.name}</p>
				</div>
				<div>
					<span className='delete-button' onClick={() => deleteTodo(todoItem.id)}>
						Delete
					</span>
				</div>
			</div>
		</>
	)
}
