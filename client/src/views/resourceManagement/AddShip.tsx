import { Form, Formik, useFormik } from 'formik'
import { useContext } from 'react'
import * as Yup from 'yup'

import { ShipNoIdType } from 'types'
import { WebSocketContext } from 'WebSocket'
import { FormGroupContainer, FormMainContainer, FormTextField, SaveAndCancelButtons } from 'views/components/SmallOnes'

export const AddShip = ({
	setShowAddShip,
}: {
	setShowAddShip: (val: boolean) => void
}) => {
	const ws = useContext(WebSocketContext)

	const handleSubmit = async (values: ShipNoIdType) => {
		setShowAddShip(false)
		ws?.sendAddShip(values)
		formik.resetForm()
	}

	const shipSchema = Yup.object().shape({
		name: Yup.string()
			.min(2, 'Name must be 2-32 charecters!')
			.max(32, 'Name must be 2-32 charecters!')
			.required('Name is required!'),
	})

	const initialValues = {
		name: ''
	}

	const formik = useFormik({
		initialValues: {
			name: '',
		},
		validationSchema: shipSchema,
		onSubmit: handleSubmit,
		enableReinitialize: true,
	})

	return (
		<FormMainContainer>
			<Formik
				initialValues={initialValues}
				validationSchema={shipSchema}
				onSubmit={async (values) => {
					handleSubmit(values)
				}}
				enableReinitialize={true}>
				<Form>
					<FormGroupContainer >
						<FormTextField label='name' name='name' />
					</FormGroupContainer>
					<SaveAndCancelButtons submitLabel='create' onCancel={() => setShowAddShip(false)} />
				</Form>
			</Formik>
		</FormMainContainer>
	)
}
