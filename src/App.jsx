import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import useFetch from './hooks/useFetch';
import { config } from './utils/config';
import useFetch from './hooks/useFetch';
import axios from 'axios';
import SalesPage from './pages/SalesPage';
import CssBaseline from "@mui/material/CssBaseline";
import LoginForm from './components/forms/LoginForm';
import { Route, Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPage';

function App() {


  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<SalesPage />} />
        <Route path="/settings" element={<AdminPage />} />
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>

      {/* <h1>Customers</h1>
      {
        customers.map((customer) => (
          <h1 key={customer.id} >{customer.razonSocial}</h1>
        ))
      } */}

      {/* <SalesPage props={customers} /> */}
      {/* <LoginForm /> */}

    </>
  )
}

export default App
