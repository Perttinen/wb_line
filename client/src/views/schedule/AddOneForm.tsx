import { DateTimePicker } from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"
import { Field, Form, Formik } from "formik"

import { initDepartureType } from "types"
import { FormGroupContainer, FormMainContainer, SaveAndCancelButtons } from "views/components/SmallOnes"
import { useContext } from "react"
import { WebSocketContext } from "WebSocket"

export const AddOneForm = ({
    setAddOneForm, routeId
}: {
    setAddOneForm: (val: boolean) => void, routeId: number
}) => {

    const ws = useContext(WebSocketContext)

    interface FormValues {
        startTime: Dayjs
        routeId: number | ''
    }

    const initialValues: FormValues = {
        startTime: dayjs(),
        routeId: routeId,
    }

    const handleSubmit = async (values: FormValues) => {
        let valuesArr: initDepartureType[] = []
        valuesArr.push(values)
        ws?.sendAddDepartures(valuesArr)
    }

    return (
        <FormMainContainer >
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                    handleSubmit(values)
                    setAddOneForm(false)
                }}>
                {({

                    setFieldValue,
                    values,
                }) => (
                    <Form>
                        <FormGroupContainer >
                            <Field name='startTime'>
                                {() => (
                                    <DateTimePicker
                                        label='Departure Time'
                                        value={values.startTime}
                                        onChange=
                                        {(newValue): void => {
                                            setFieldValue('startTime', newValue)
                                        }} />
                                )}
                            </Field>
                        </FormGroupContainer>
                        <SaveAndCancelButtons submitLabel="create" onCancel={() => setAddOneForm(false)} />
                    </Form>
                )}
            </Formik>
        </FormMainContainer>)
}