import React from 'react'
import SalesContainer from '../components/sales/SalesContainer'



const SalesPage = () => {
    if (!localStorage.getItem('token')) {
        window.location.href = "/#/login"
    }       
    return (
        <>
            <SalesContainer />
        </>
    )
}

export default SalesPage