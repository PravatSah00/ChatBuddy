import React, { useState } from 'react';

import Title from './components/Title';
import NavBar from './components/NavBar';

import { Outlet } from "react-router-dom";


/**
 * Main layout component
 */
const Layout = () => {

    return (
        <div className='container'>
            {/* Main title components */}
            <Title/>

            {/* Main navbar component */}
            <NavBar />

            <Outlet />
        </div>
    )
}

export default Layout;
