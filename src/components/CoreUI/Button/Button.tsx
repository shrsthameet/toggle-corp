import { ComponentPropsWithoutRef, forwardRef, Ref } from 'react'
import './button.css'

type Props = ComponentPropsWithoutRef<'button'> & {
	index?: number
}

export const Button = forwardRef(
	({ index, disabled, children, ...props }: Props, ref: Ref<HTMLButtonElement>): JSX.Element => {
		return (
			<button disabled={disabled} ref={ref} className='button' {...props}>
				{children}
			</button>
		)
	}
)
