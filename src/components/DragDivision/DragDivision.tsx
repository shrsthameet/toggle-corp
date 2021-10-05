import { DragEvent, FC } from 'react'
import { FunctionWithParam } from 'Utils/main'
import './dragDivision.css'

interface IDragDivision {
	title: string
	dragOver: FunctionWithParam<DragEvent<HTMLDivElement>>
	onDrop: (e: DragEvent<HTMLDivElement>, currentStatus: string) => void
	currentStatus: string
}

export const DragDivision: FC<IDragDivision> = props => {
	const { title, children, dragOver, onDrop, currentStatus } = props
	return (
		<div className='dnd-group' onDragOver={dragOver} onDrop={e => onDrop(e, currentStatus)}>
			<h4>{title}</h4>
			{children}
		</div>
	)
}
