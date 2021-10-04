import { ChangeEventHandler, FormEventHandler, useState } from 'react'

export const useForm = <T extends Record<keyof T, any> = {}>(options?: {
	initialValues?: Partial<T>
	onSubmit?: () => void
}) => {
	const [data, setData] = useState<T>((options?.initialValues || {}) as T)

	const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
		const { name, value } = event.target
		setData({
			...data,
			[name]: value,
		})
	}

	const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
		event.preventDefault()
		if (options?.onSubmit) {
			options.onSubmit()
		}
	}

	return { data, handleChange, handleSubmit }
}
