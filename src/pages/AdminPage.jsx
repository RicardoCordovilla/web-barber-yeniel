import { Container, Fab, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { config } from '../utils/config'
import ProductsContainer from '../components/admin/ProductsContainer'
import HomeIcon from '@mui/icons-material/Home';




const AdminPage = () => {

    return (
        <React.Fragment>

            <Fab color="default" aria-label="add" size='small' sx={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
            }}
                onClick={() => window.location.href = '/'}
            >
                <IconButton aria-label="show" size="small">
                    <HomeIcon />
                </IconButton>
            </Fab>


            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    width: '100%',
                    mt: 5,
                }}
            >
                <Typography variant="h5" component="h2" gutterBottom>
                    Configuraciones
                </Typography>

                <ProductsContainer />

            </Container>




        </React.Fragment>

    )
}

export default AdminPage