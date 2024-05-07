import { Box, Button, MenuItem, TextField, Typography } from "@mui/material"
import {
    DeleteOutlined, AddCircleOutline, HighlightOff, SaveAlt, DepartureBoardOutlined
} from '@mui/icons-material'
import { Field, useField } from "formik"
import { DockType } from "types"
import { DatePicker, TimePicker } from "@mui/x-date-pickers"


type IconButtonProps = {
    whenClicked?: () => void
    buttonType?: "button" | "submit" | "reset" | undefined
    iconType: "add" | "save" | "cancel" | "trash" | "schedule"
}

const IconButton = (props: IconButtonProps) => {
    const getClicker = () => {
        if (typeof props.whenClicked === 'function') {
            return props.whenClicked()
        }
        return void (0)
    }

    let icon = <></>
    let sxValues = {
        fontSize: '2rem', color: '',
    }

    switch (props.iconType) {
        case 'add': icon = <AddCircleOutline fontSize='inherit' />
            break
        case 'cancel': icon = <HighlightOff fontSize='inherit' />
            sxValues.color = '#B03A2E'
            break
        case 'save':
            icon = <SaveAlt fontSize='inherit' />
            sxValues.color = '#1E8449'
            break
        case 'trash': icon = <DeleteOutlined fontSize='inherit' />
            sxValues.color = 'black'
            break
        case 'schedule': icon = <DepartureBoardOutlined fontSize='inherit' />
    }

    return (
        <Button
            type={props.buttonType}
            onClick={getClicker}
            fullWidth
            sx={{ ...sxValues }}>
            {icon}
        </Button>
    )
}

type FormMainContainerProps = {
    children: JSX.Element
    caption?: string
}

const FormMainContainer = (props: FormMainContainerProps) => {
    return (
        <Box sx={{ backgroundColor: '#f5f5f5', border: 1, borderRadius: '5px', marginY: '10px', padding: '5px' }}>
            {props.caption &&
                <Box display={'flex'} flexDirection={'row'} justifyContent={'center'}>
                    <Typography fontSize={'1.2rem'}>{props.caption}</Typography>
                </Box>
            }
            {props.children}
        </Box>
    )
}

type FormGroupContainerProps = {
    children: JSX.Element
    caption: string
}
const FormGroupContainer = (props: FormGroupContainerProps) => {
    return (
        <Box display={'flex'} flexDirection={'column'} sx={{ backgroundColor: 'white', borderBlockColor: 'black', borderWidth: '2px', border: 1, padding: '10px', borderRadius: '5px', margin: '5px' }}>
            <Box display={'flex'} flexDirection={'row'} justifyContent={'center'}>
                <Typography fontSize={'1rem'}>{props.caption}</Typography>
            </Box>
            {props.children}
        </Box>

    )
}

type FormTextFieldProps = {
    name: string
    label: string
    type: string
}
const FormTextField = (props: FormTextFieldProps) => {
    const [field, meta] = useField(props);
    return (
        <TextField {...field} {...props}
            margin='normal'
            name={props.name}
            label={props.label}
            type={props.type}
            fullWidth
            required
            variant='outlined'
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={
                meta.touched && Boolean(meta.error)
            }
            helperText={
                meta.touched && meta.error
            }
        />
    )
}

type FormSelectProps = {
    options: DockType[]
    name: string
    label: string
}
const FormSelect = (props: FormSelectProps) => {
    const [field, meta] = useField(props)
    console.log('dockid: ');
    return (
        <TextField
            fullWidth
            required
            select
            margin='normal'
            variant='outlined'
            name={props.name}
            label={props.label}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
        >
            {props.options.map((dock: DockType) => (
                <MenuItem key={dock.id} value={dock.id}>
                    {dock.name}
                </MenuItem>
            ))}
        </TextField>
    )
}

type FormTimeOrDatePickerProps = {
    name: string
    label: string
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

const FormTimePicker = (props: FormTimeOrDatePickerProps) => {
    const [field, _meta] = useField(props)
    return (
        <Field name={props.name}>
            {() => (
                <TimePicker
                    label={props.label}
                    value={field.value}
                    onChange=
                    {(newValue): void => {
                        props.setFieldValue(props.name, newValue)
                    }}
                />
            )}
        </Field>
    )
}

const FormDatePicker = (props: FormTimeOrDatePickerProps) => {
    const [field, _meta] = useField(props)
    return (
        <Field name={props.name}>
            {() => (
                <DatePicker
                    label={props.label}
                    value={field.value}
                    onChange=
                    {(newValue): void => {
                        props.setFieldValue(props.name, newValue)
                    }}
                />
            )}
        </Field>
    )
}


export { IconButton, FormGroupContainer, FormTextField, FormSelect, FormTimePicker, FormDatePicker, FormMainContainer }