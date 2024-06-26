import { Alert, Box, Button, Snackbar, Typography } from "@mui/material"
import dayjs, { Dayjs } from "dayjs"
import { Field, FieldArray, Form, Formik } from "formik"
import { useContext, useState } from "react"

import { initDepartureType } from "types"
import { FormDatePicker, FormMainContainer, FormTimePicker, FormGroupContainer, SaveAndCancelButtons } from "views/components/SmallOnes"
import { WebSocketContext } from "WebSocket"

export const AddManyForm = ({
    setAddManyForm, routeId
}: {
    setAddManyForm: (val: boolean) => void, routeId: number
}) => {

    const ws = useContext(WebSocketContext)

    const [successMsg, setSuccessMsg] = useState('')

    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

    interface FormValues {
        fromDate: Dayjs
        toDate: Dayjs
        times: Dayjs[]
        weekdays: [
            boolean,
            boolean,
            boolean,
            boolean,
            boolean,
            boolean,
            boolean,
        ],
        routeId: number | ''
    }

    const initialValues: FormValues = {
        fromDate: dayjs(),
        toDate: dayjs(),
        times: [dayjs()],
        weekdays: [
            false,
            false,
            false,
            false,
            false,
            false,
            false,
        ],
        routeId: routeId,
    }

    const createStartList = (values: FormValues) => {
        const startArray = []
        for (let start = values.fromDate; start.isBefore(values.toDate.add(1, 'day')); start = start.add(1, 'day')) {
            if (values.weekdays[start.subtract(1, 'day').day()]) {
                for (let i in values.times) {
                    const dateTime = start.set('hour', values.times[i].hour()).set('minute', values.times[i].minute()).set('second', 0)
                    startArray.push({ startTime: dateTime, routeId: values.routeId })
                }
            }
        }
        return startArray
    }

    const handleSubmit = async (values: FormValues) => {
        const starts: initDepartureType[] = createStartList(values)
        ws?.sendAddDepartures(starts)
        setSuccessMsg(`${starts.length} starts successfully added!`)
    }

    return (
        <>
            <FormMainContainer >
                <Formik
                    initialValues={initialValues}
                    onSubmit={async (values) => {
                        handleSubmit(values)
                    }}>
                    {props => (
                        <Form>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <FormGroupContainer >
                                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                        {days.map((d, i) =>
                                            <Box key={i} sx={{ display: 'flex', flexDirection: 'column' }}>
                                                <Typography >{d}</Typography>
                                                <Field type='checkbox' name={`weekdays[${i}]`} />
                                            </Box>
                                        )}
                                    </Box>
                                </FormGroupContainer>
                                <FormGroupContainer >
                                    <Box display={'flex'} flexDirection={'row'} >
                                        <FormDatePicker name="fromDate" label="from date" setFieldValue={props.setFieldValue} />
                                        <FormDatePicker name="toDate" label="to date" setFieldValue={props.setFieldValue} />
                                    </Box>
                                </FormGroupContainer>
                                <FormGroupContainer >
                                    <FieldArray name='times'>
                                        {({ push, remove }) => (
                                            <div>
                                                <Box display={'flex'} flexDirection={'column'} >
                                                    {props.values.times.length > 0 &&
                                                        props.values.times.map((_p, index) => {
                                                            const time = `times[${index}]`
                                                            const fieldLabel = `start ${index + 1}`
                                                            return (
                                                                <Box key={index} display={'flex'} flexDirection={'row'} justifyContent={'start'} alignItems={'start'} marginY={'10px'}>
                                                                    <Box display={'flex'} flexDirection={'column'} alignItems={"center"}>
                                                                        <FormTimePicker name={time} label={fieldLabel} setFieldValue={props.setFieldValue} />
                                                                        {index === props.values.times.length - 1 &&
                                                                            <Button onClick={() => push(dayjs())} variant="text">add more starts</Button>
                                                                        }
                                                                    </Box>
                                                                    {index > 0 && <Button onClick={() => remove(index)}>delete</Button>}
                                                                </Box>
                                                            )
                                                        })}
                                                    <Box display={'flex'} flexDirection={'row'} justifyContent={'center'}>
                                                    </Box>
                                                </Box>
                                            </div>
                                        )}
                                    </FieldArray>
                                </FormGroupContainer>
                                <SaveAndCancelButtons submitLabel="create" onCancel={() => setAddManyForm(false)} />
                            </Box>
                        </Form>
                    )}
                </Formik>
            </FormMainContainer>
            <Snackbar
                open={successMsg !== ''}
                autoHideDuration={4000}
                onClose={() => {
                    setSuccessMsg('')
                }}>
                <Alert severity='success'>{successMsg}</Alert>
            </Snackbar>
        </>
    )
}