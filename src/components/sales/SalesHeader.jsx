import { Box, Button, Divider, Fab, IconButton, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { config } from '../../utils/config';

const user = JSON.parse(localStorage.getItem('user'));
console.log(user);

const SalesHeader = ({ invoices = [] }) => {

    const total = invoices.reduce((acc, invoice) => acc + Number(invoice.total), 0);

    const [show, setShow] = useState(false);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

        }}>
            {
                user?.roles.find(el => el === config.roles.seller)
                    ? null
                    :
                    <Fab color="default" aria-label="add" size='small'
                        sx={{
                            position: 'absolute',
                            top: '1rem',
                            left: '1rem',
                        }}
                        onClick={() => window.location.href = '/#/settings'}
                    >
                        <IconButton
                            aria-label="show"
                            size="small"
                        >
                            <SettingsIcon />
                        </IconButton>

                    </Fab>
            }


            <Stack spacing={1} direction="row">
                <Typography variant="h6" component="h2" gutterBottom
                    sx={{ color: '#252525' }}
                >
                    Hola {user?.usuario}
                </Typography>
                <IconButton
                    aria-label="show"
                    size="large"
                    sx={{
                        ml: 1,
                        position: 'absolute',
                        top: '0',
                        right: '0',
                    }}
                    onClick={() => {
                        if (confirm('¿Está seguro que desea cerrar sesión?')) {
                            localStorage.removeItem('user');
                            localStorage.removeItem('token');
                            window.location.href = '/#/login';
                        }
                    }}
                >

                    <LogoutIcon />

                </IconButton>

            </Stack>



            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                margin: '1rem 0 1rem 0'
            }}>

                <Typography variant="body2" component="h2" gutterBottom
                    sx={{ color: '#5a68b8d6' }}
                >
                    Ventas
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 0 1rem 0'
                    }}
                >

                    <Typography variant="h4" component="h2" gutterBottom
                        sx={{ color: '#3f51b5' }}
                    >
                        {
                            show ? `$${total.toFixed(2)}` : '****'
                        }
                    </Typography>

                    <IconButton
                        aria-label="show"
                        size="large"
                        sx={{ ml: 1 }}
                        onClick={() => setShow(!show)}
                    >
                        {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                </Box>


            </Box>

        </Box>
    )
}

export default SalesHeader