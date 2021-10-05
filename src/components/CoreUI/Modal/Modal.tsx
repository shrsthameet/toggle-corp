import { FC, useCallback, useEffect, useRef } from 'react'
import { FunctionWithNoParam } from '../../../utils/main'
import './modal.css'
import { Button } from '../index'

interface ModalProps {
	title: string
	modalVisibility: boolean
	onCancel: FunctionWithNoParam
	disableClose?: boolean
}

export const Modal: FC<ModalProps> = props => {
	const { children, title, onCancel, modalVisibility } = props

	const modalWrapperRef = useRef<HTMLDivElement>(null)

	const windowOnClick = useCallback(event => {
		if (event.target === modalWrapperRef.current) {
			hideModal()
			onCancel()
		}
	}, [])

	const hideModal = useCallback(() => {
		if (modalWrapperRef.current) modalWrapperRef.current.classList.remove('showModal')
		window.removeEventListener('click', windowOnClick)
	}, [windowOnClick])

	const showModal = useCallback(() => {
		if (modalWrapperRef.current) modalWrapperRef.current.classList.add('showModal')
		window.addEventListener('click', windowOnClick)
	}, [windowOnClick])

	useEffect(() => {
		if (modalVisibility) showModal()
		else hideModal()
	}, [modalVisibility, hideModal, showModal])

	return (
		<div className='modalBackground'>
			<div className='modalContainer'>
				<button className='modalCloseBar' onClick={() => console.log('closed')}>
					X
				</button>
				<div className='modalTitle'>{title}</div>
				<div className='modalBody'>{children}</div>
				<div className='modalFooter'>
					<Button>Edit</Button>
				</div>
			</div>
		</div>
	)
}
