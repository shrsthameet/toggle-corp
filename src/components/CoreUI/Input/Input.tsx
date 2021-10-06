import { ComponentPropsWithoutRef, FC, forwardRef, Ref } from 'react'
import './input.css'

interface InputProps extends ComponentPropsWithoutRef<'input'> {
	type?: 'text' | 'email' | 'number'
	inputStyle?: string
	ref?: Ref<HTMLInputElement>
}

export const Input: FC<InputProps> = forwardRef((props, ref) => {
	const { type = 'text', inputStyle, className, ...remainingProps } = props

	return <input ref={ref} type={type} className='input-style' {...remainingProps} />
})
