import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { removeLoggedUser } from "reducers/loggedUserReducer"
import { AppDispatch } from "store"
import { UserWithTokenType } from "types"

type PropsType = {
    setUserCard: (val: boolean) => void
    loggedUser: UserWithTokenType
}

export const UserMenu = (props: PropsType) => {
    const dispatch: (...args: unknown[]) => Promise<string> =
        useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }
    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }
    const handleLogout = () => {
        window.localStorage.clear()
        dispatch(removeLoggedUser())
        navigate('/login')
    }

    const handleOpenUserCard = () => {
        props.setUserCard(true)
    }
    const userMenu = [
        { label: 'LOGOUT', handleFunction: handleLogout },
        { label: 'USER DATA', handleFunction: handleOpenUserCard }
    ]
    return (

        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open user settings'>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg'>
                        {props.loggedUser.name.charAt(0)}
                    </Avatar>
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id='menu-applist'
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {userMenu.map((u, i) => {
                    return (
                        <MenuItem
                            key={`${i}`}
                            onClick={() => {
                                handleCloseUserMenu()
                                u.handleFunction()
                            }}
                        >
                            <Typography textAlign='center'>{u.label}</Typography>
                        </MenuItem>)
                })}
            </Menu>
        </Box>
    )
}