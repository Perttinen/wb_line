import { Box, Typography } from "@mui/material"
import dayjs, { Dayjs } from "dayjs"
import { Field, FieldArray, Form, Formik } from "formik"

import { AppDispatch } from '../../store'
import { DepartureType } from "../../../../types"
import { useDispatch } from "react-redux"
import {
    createDeparture,
} from '../../reducers/departureReducer'
import { FormDatePicker, FormMainContainer, FormTimePicker, IconButton, FormGroupContainer } from "views/components/SmallOnes"

export const AddManyForm = ({
    setAddManyForm, routeId
}: {
    setAddManyForm: (val: boolean) => void, routeId: number
}) => {


    const scheduleDispatch: (
        ...args: unknown[]
    ) => Promise<DepartureType>[] | number = useDispatch<AppDispatch>()

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
        console.log(createStartList(values));

        const starts = createStartList(values)
        scheduleDispatch(createDeparture(starts))
    }

    return (
        <FormMainContainer caption="ADD MANY" >
            <Formik
                initialValues={initialValues}
                onSubmit={async (values) => {
                    handleSubmit(values)
                }}>
                {props => (
                    <Form>
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <FormGroupContainer caption="select weekdays">
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                    {days.map((d, i) =>
                                        <Box key={i} sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <Typography >{d}</Typography>
                                            <Field type='checkbox' name={`weekdays[${i}]`} />
                                        </Box>
                                    )}
                                </Box>
                            </FormGroupContainer>
                            <FormGroupContainer caption="pick from & to dates">
                                <Box display={'flex'} flexDirection={'row'} >
                                    <FormDatePicker name="fromDate" label="from" setFieldValue={props.setFieldValue} />
                                    <FormDatePicker name="toDate" label="to" setFieldValue={props.setFieldValue} />
                                </Box>
                            </FormGroupContainer>
                            <FormGroupContainer caption="give departure times">
                                <FieldArray name='times'>
                                    {({ push, remove }) => (
                                        <div>

                                            <Box display={'flex'} flexDirection={'column'} >
                                                {props.values.times.length > 0 &&
                                                    props.values.times.map((_p, index) => {
                                                        const time = `times[${index}]`
                                                        const fieldLabel = `time ${index + 1}`
                                                        return (
                                                            <Box key={index} display={'flex'} flexDirection={'row'} justifyContent={'center'} marginY={'10px'}>
                                                                <FormTimePicker name={time} label={fieldLabel} setFieldValue={props.setFieldValue} />
                                                                <IconButton iconType='trash' whenClicked={() => remove(index)} />
                                                            </Box>

                                                        )
                                                    })}
                                                <Box display={'flex'} flexDirection={'row'} justifyContent={'center'}>
                                                    <IconButton
                                                        whenClicked={() => push(dayjs())}
                                                        iconType='add' />
                                                </Box>

                                            </Box>
                                        </div>
                                    )}
                                </FieldArray>
                            </FormGroupContainer>
                            <Box display={'flex'} flexDirection={'row'} justifyContent={'center'}>
                                <IconButton iconType="save" buttonType="submit" />
                                <IconButton iconType="cancel" whenClicked={() => setAddManyForm(false)} />
                            </Box>
                        </Box>
                    </Form>
                )}
            </Formik>
        </FormMainContainer>
    )
}