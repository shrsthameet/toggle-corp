import { IFormFieldValue } from 'App'
import { FC } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { FunctionWithNoParam } from 'Utils/main'

interface IModalBoxProps {
	title: string
	show: boolean
	handleClose: FunctionWithNoParam
	closeButtonTitle: string
	confirmButtonTitle: string
	handleClick: (title: string, func: FunctionWithNoParam) => void
	data?: IFormFieldValue
}

export const ModalBox: FC<IModalBoxProps> = props => {
	const { data, title, children, show, handleClose, closeButtonTitle, confirmButtonTitle, handleClick } = props
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{children}</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={handleClose}>
					{closeButtonTitle}
				</Button>
				<Button disabled={!data?.todoName} variant='primary' onClick={() => handleClick(title, handleClose)}>
					{confirmButtonTitle}
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
