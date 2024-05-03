import { Typography } from "@mui/material"

const company = 'WB-LINE'

const CompanyNameMd = () => {
    return (
        <Typography
            variant='h6'
            noWrap
            component='a'
            href='#app-bar-with-responsive-menu'
            sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
            }}>
            {company}
        </Typography>)
}

const CompanyNameXs = () => {
    return (
        <Typography
            variant='h5'
            noWrap
            component='a'
            sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
            }}
        >
            {company}
        </Typography>)
}

export { CompanyNameMd, CompanyNameXs }