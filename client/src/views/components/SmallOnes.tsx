import { Box, Button, MenuItem, TextField, Typography } from "@mui/material"
import {
    DeleteOutlined, AddCircleOutline, HighlightOff, SaveAlt, DepartureBoardOutlined,
} from '@mui/icons-material'
import { Field, useField } from "formik"
import { DockType } from "types"
import { DatePicker, TimePicker } from "@mui/x-date-pickers"
import { theme } from "mui/muiTheme"



type TextButtonProps = {
    whenClicked?: () => void
    buttonType?: "button" | "submit" | "reset" | undefined
    actionType: "add" | "save" | "cancel" | "trash" | "schedule"
    label: string
}
const TextButton = (props: TextButtonProps) => {
    const getClicker = () => {
        if (typeof props.whenClicked === 'function') {
            return props.whenClicked()
        }
        return void (0)
    }
    let sxValues = {
        borderColor: ''
    }

    switch (props.actionType) {
        case 'add':
            // sxValues.borderColor = theme.palette.secondary.dark
            break
        case 'cancel':
            // sxValues.color = theme.palette.error.dark
            break
        case 'save':

            // sxValues.color = theme.palette.success.dark
            break
        case 'trash':
            sxValues.borderColor = theme.palette.error.light
            break
        case 'schedule': break
    }

    return (
        <Button
            variant='outlined'
            type={props.buttonType}
            onClick={getClicker}
            sx={{ ...sxValues, color: theme.palette.primary.dark, paddingX: '4px', paddingY: '0px', fontSize: '1rem' }}>
            {props.label}
        </Button>
    )

}


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
            sxValues.color = theme.palette.primary.dark
            break
        case 'cancel': icon = <HighlightOff fontSize='inherit' />
            sxValues.color = theme.palette.error.dark
            break
        case 'save':
            icon = <SaveAlt fontSize='inherit' />
            sxValues.color = theme.palette.success.dark
            break
        case 'trash': icon = <DeleteOutlined fontSize='inherit' />
            sxValues.color = theme.palette.primary.dark
            break
        case 'schedule': icon = <DepartureBoardOutlined fontSize='inherit' />
    }

    return (
        <Button
            type={props.buttonType}
            onClick={getClicker}
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
        <Box sx={{ border: 1, marginBottom: '10px', padding: '5px', backgroundColor: theme.palette.secondary.light, }}>
            {props.caption &&
                <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} >
                    <Typography fontSize={'1.2rem'}>{props.caption}</Typography>
                </Box>
            }
            {props.children}
        </Box>
    )
}

type FormGroupContainerProps = {
    children: JSX.Element
    caption?: string

}
const FormGroupContainer = (props: FormGroupContainerProps) => {
    return (
        <Box display={'flex'} flexDirection={'column'} sx={{ backgroundColor: 'white', borderWidth: '2px', border: 1, padding: '10px', borderRadius: '5px', margin: '5px' }}>
            {props.caption &&
                <Box display={'flex'} flexDirection={'row'} justifyContent={'start'}>
                    <Typography fontSize={'1rem'}>{props.caption}</Typography>
                </Box>
            }
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
            // fullWidth
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
            sx={{ borderColor: 'darkgrey' }}
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

type SaveAndCancelButtonsPropsType = {
    onCancel: (val: boolean) => void
}

const SaveAndCancelButtons = (props: SaveAndCancelButtonsPropsType) => {

    return (
        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-evenly'}>
            <Button variant='contained' type='submit'>save</Button>
            <Button onClick={() => props.onCancel(false)} variant='contained' type='reset'>cancel</Button>
            {/* <IconButton buttonType='submit' iconType={saveButton} />
            <IconButton buttonType='reset' iconType='cancel' whenClicked={() => props.onCancel(false)} /> */}
        </Box>
    )
}


export { IconButton, FormGroupContainer, FormTextField, FormSelect, FormTimePicker, FormDatePicker, FormMainContainer, SaveAndCancelButtons, TextButton }