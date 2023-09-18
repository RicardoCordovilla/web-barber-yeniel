import { Box, Button, Card, Divider, TextField, Typography } from '@mui/material'
import React, { Fragment, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { config } from '../../utils/config';
import axios from 'axios';

const NewCustomer = ({ setOpenNewCustomer, customers, setCustomers, setNewClient, razonsocial }) => {

    // const [dataNewClient, loadingClient, errorClient, fetchClient] = useFetch();

    const [newCustomer, setNewCustomer] = useState({
        "razonSocial": razonsocial || "",
        "typeId": "05",
        "location": "Quito",
        "email": "maymail@mail.com",
    })

    const handleNewCustomer = () => {
        console.log('Nuevo cliente:', newCustomer);
        const body =
        {
            ...newCustomer,
            location: "Quito",
            phone: newCustomer?.phone || "0999999999",
            email: newCustomer?.email || "",
        }
        console.log('body:', body);

        axios.post(config.db.customers.create.url, body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: config.db.token
                }
            }
        )
            .then((response) => {
                console.log(response.data);
                setCustomers([...customers, response.data])
                setNewClient(response.data)
                setOpenNewCustomer(false)
            })
            .catch((error) => {
                console.log(error);
            });

        // fetchClient(
        //     {
        //         url: config.db.customers.create.url,
        //         method: config.db.customers.create.method,
        //         body: body
        //     }
        // );
        // console.log(dataNewClient);
    };

    return (
        <Fragment>
            <Card
                sx={{
                    width: '80%',
                    height: '90%',
                    bgcolor: 'background.paper',
                    p: 2,
                    overflow: 'auto',
                }}
            >

                <Typography id="modal-modal-label" variant="h6" component="h2" mb={2}>
                    Nuevo cliente
                </Typography>
                <Divider />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} mt={2}
                // component="form"
                // noValidate
                // autoComplete="off"
                // onSubmit={handleNewCustomer}
                // preventDefault
                >
                    <TextField
                        id="outlined-basic"
                        label="Nombre"
                        variant="outlined"
                        size="small"
                        value={newCustomer?.razonSocial}
                        onChange={(e) => setNewCustomer({ ...newCustomer, razonSocial: e.target.value })}
                        required
                        type="text"
                    />

                    <TextField
                        id="outlined-basic"
                        label="CI/RUC"
                        variant="outlined"
                        size="small"
                        value={newCustomer?.idClient}
                        onChange={(e) => setNewCustomer({ ...newCustomer, idClient: e.target.value })}
                        required
                        type="tel"
                    />

                    <TextField
                        id="outlined-basic"
                        label="Teléfono"
                        variant="outlined"
                        size="small"
                        value={newCustomer?.phone}
                        onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                        required
                        type="tel"
                    />

                    <TextField
                        id="outlined-basic"
                        label="Correo electrónico"
                        variant="outlined"
                        size="small"
                        value={newCustomer?.email}
                        onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                        type='email'
                    />

                    <TextField
                        id="outlined-basic"
                        label="Dirección"
                        variant="outlined"
                        size="small"
                        value={newCustomer?.location}
                        onChange={(e) => setNewCustomer({ ...newCustomer, location: e.target.value })}
                    />

                    <Button
                        variant="contained"
                        type="submit"
                        sx={{ width: 'fit-content' }}
                        onClick={handleNewCustomer}
                    >Guardar</Button>
                </Box>

            </Card>
        </Fragment>

    )
}

export default NewCustomer