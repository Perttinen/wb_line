import { Box, Button } from "@mui/material"
import { DateTimePicker } from "@mui/x-date-pickers"
import dayjs, { Dayjs } from "dayjs"
import { Field, Form, Formik } from "formik"
import scheduleService from '../../services/schedules'
import { AppDispatch } from '../../store'
import { DepartureType, initDepartureType } from "../../../../types"
import { useDispatch } from "react-redux"
import {
    appendDeparture,
} from '../../reducers/departureReducer'

export const AddOneForm = ({
    setAddOneForm, routeId
}: {
    setAddOneForm: (val: boolean) => void, routeId: number
}) => {


    const scheduleDispatch: (
        ...args: unknown[]
    ) => Promise<DepartureType> | number = useDispatch<AppDispatch>()

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
        const valuesToDisp = await scheduleService.create(valuesArr)
        console.log(valuesToDisp);

        scheduleDispatch(appendDeparture(valuesToDisp))
    }

    return (
        <Box sx={{ marginTop: '1rem' }}>
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                    handleSubmit(values)
                    setAddOneForm(false)
                }}
            >
                {({
                    submitForm,
                    isSubmitting,
                    setFieldValue,
                    values,
                }) => (
                    <Form>
                        <Field name='startTime'>
                            {() => (
                                <DateTimePicker
                                    label='Departure Time'
                                    value={values.startTime}
                                    onChange=
                                    {(newValue): void => {
                                        setFieldValue('startTime', newValue)
                                    }}
                                />
                            )}
                        </Field>
                        <Button
                            sx={{ height: 55 }}
                            variant='contained'
                            color='primary'
                            disabled={isSubmitting}
                            onClick={submitForm}
                        >
                            Submit
                        </Button>
                        <Button
                            sx={{ height: 55, bgcolor: '#B03A2E' }}
                            variant='contained'
                            disabled={isSubmitting}
                            onClick={() => setAddOneForm(false)}
                        >
                            Cancel
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>)
}