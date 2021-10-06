import { IFormFieldValue } from 'App'
import { Button, Input } from 'Components/CoreUI'
import { ModalBox } from 'Components/ModalBox/ModalBox'
import { useModal } from 'CustomHooks/useModal'
import { ChangeEventHandler, DragEvent, FC, useRef, useEffect } from 'react'
import { FunctionWithNoParam, FunctionWithParam } from 'Utils/main'
import './dragDivision.css'

interface IDragDivision {
	title: string
	dragOver: FunctionWithParam<DragEvent<HTMLDivElement>>
	onDrop: (e: DragEvent<HTMLDivElement>, currentStatus: string) => void
	data: IFormFieldValue
	handleChange: ChangeEventHandler
	handleSubmit: (title: string, func: FunctionWithNoParam) => void
}

export const DragDivision: FC<IDragDivision> = props => {
	const { show, handleClose, handleShow } = useModal()

	const { title, children, dragOver, onDrop, data, handleChange, handleSubmit } = props

	const todoName = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (todoName && todoName.current) todoName.current.focus()
	})

	return (
		<div className='dnd-group' onDragOver={dragOver} onDrop={e => onDrop(e, title)}>
			<div className='titleSection'>
				<h4>{title}</h4>
				<Button onClick={handleShow}>Add Task +</Button>
			</div>
			{children}

			<ModalBox
				title={title}
				closeButtonTitle={'Cancel'}
				confirmButtonTitle={'Add'}
				show={show}
				handleClose={handleClose}
				handleClick={handleSubmit}
				data={data}
			>
				<label>Title</label>
				<Input
					ref={todoName}
					autoFocus={true}
					autoComplete='off'
					type='text'
					name='todoName'
					value={data.todoName}
					onChange={handleChange}
				/>
				<label>Description</label>
				<div>
					<textarea
						maxLength={200}
						name='description'
						rows={5}
						value={data.description}
						onChange={handleChange}
					/>
				</div>
			</ModalBox>
		</div>
	)
}
