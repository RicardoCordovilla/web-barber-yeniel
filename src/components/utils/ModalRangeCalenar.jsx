import { Box, Button, Divider, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

const ModalRangeCalenar = ({ setDateFrom, setDateTo,
    setOpenCalendar, setOpenNewInvoice, setOpenModal, openCalendar
}) => {

    const [from, setFrom] = useState()
    const [to, setTo] = useState()

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                // alignItems: 'center',
                // justifyContent: 'start',
                // textAlign: 'center',
                height: '100%',
                width: '100%',
                mt: 5,
            }}
        >
            <Typography variant="body1" component="h2" gutterBottom>
                Seleccione una fecha de inicio y Fin
            </Typography>

            <Divider />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    margin: '1rem 0 1rem 0'
                }}
            >

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        margin: '1rem 0 1rem 0',
                        gap: '2rem'
                    }}
                >

                    <Stack spacing={1} direction="column">
                        <Typography variant="body2" component="h2" gutterBottom>
                            Fecha de inicio
                        </Typography>

                        <TextField id="fechaInicio"
                            type="date"
                            name="fechaInicio"
                            sx={{ width: '100%' }}
                            onChange={(e) => setFrom(e.target.value)}
                        />
                    </Stack>

                    <Stack spacing={1} direction="column">

                        <Typography variant="body2" component="h2" gutterBottom>
                            Fecha de fin
                        </Typography>

                        <TextField id="fechaInicio"
                            type="date"
                            name="fechaInicio"
                            sx={{ width: '100%' }}
                            onChange={(e) => setTo(e.target.value)}
                        />
                    </Stack>

                    <Button variant="contained" color="primary" sx={{ mt: 2 }}
                        disabled={!from || !to}
                        onClick={() => {
                            setOpenCalendar(!openCalendar)
                            setOpenNewInvoice(false)
                            setOpenModal(false)
                            setDateFrom(from)
                            setDateTo(to)
                        }}
                    >
                        Filtrar
                    </Button>

                </Box>


            </Box>

        </Box>

    )
}

export default ModalRangeCalenar