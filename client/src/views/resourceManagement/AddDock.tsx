import { Form, Formik } from 'formik'
import { useContext } from 'react'
import * as Yup from 'yup'

import { DockNoIdType } from 'types'
import { WebSocketContext } from 'WebSocket'
import { FormGroupContainer, FormMainContainer, FormTextField, SaveAndCancelButtons } from 'views/components/SmallOnes'

export const AddDock = ({
	setShowAddDock,
}: {
	setShowAddDock: (val: boolean) => void
}) => {
	const ws = useContext(WebSocketContext)

	const handleSubmit = async (values: DockNoIdType) => {
		setShowAddDock(false)
		ws?.sendAddDock(values)
	}

	const dockSchema = Yup.object().shape({
		name: Yup.string()
			.min(2, 'Name must be 2-32 charecters!')
			.max(32, 'Name must be 2-32 charecters!')
			.required('Name is required!'),
	})

	const initialValues = {
		name: ''
	}

	return (
		<FormMainContainer>
			<Formik
				initialValues={initialValues}
				validationSchema={dockSchema}
				onSubmit={async (values) => {
					handleSubmit(values)
				}}
				enableReinitialize={true}>
				<Form>
					<FormGroupContainer >
						<FormTextField label='name' name='name' />
					</FormGroupContainer>
					<SaveAndCancelButtons submitLabel='create' onCancel={() => setShowAddDock(false)} />
				</Form>
			</Formik>
		</FormMainContainer>
	)
}
