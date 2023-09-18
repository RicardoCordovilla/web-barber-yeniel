import { Box, Button, Checkbox, Container, FormControlLabel, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { config } from '../../utils/config';

const LoginForm = () => {

    const [values, setValues] = React.useState({
        username: '',
        password: '',
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        axios.post(config.db.login, values)
            .then((response) => {
                console.log(response.data);
                localStorage.setItem('token', response.data.token);
                let user = {
                    username: values.username,
                }
                user = { ...user, ...response.data }

                localStorage.setItem('user', JSON.stringify(user));
                window.location.href = '/';
            })
            .catch((error) => {
                const response = error.response.data.error;
                console.log(response);
                if (response) {
                    alert('Usuario o contraseña incorrectos');
                }
            });

        console.log('Formulario enviado');
    }


    return (
        <React.Fragment>
            <Container component="main" maxWidth="xs"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // height: '100%',
                    // width: '100vw',
                    // backgroundColor: '#f5f5f5',
                    paddingTop: '8rem',
                }}
            >
                <Typography component="h1" variant="h5">
                    Iniciar sesión
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}
                    onSubmit={handleSubmit}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="usuario"
                        label="Usuario"
                        name="usuario"
                        autoComplete="usuario"
                        autoFocus
                        type="text"
                        onChange={(e) => setValues({ ...values, username: e.target.value })}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="contraseña"
                        label="Contraseña"
                        type="password"
                        id="contraseña"
                        autoComplete="current-password"
                        onChange={(e) => setValues({ ...values, password: e.target.value })}
                    />
                    {/* <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Recordarme"
                /> */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Iniciar sesión
                    </Button>

                </Box>
            </Container>


        </React.Fragment>

    )
}

export default LoginForm