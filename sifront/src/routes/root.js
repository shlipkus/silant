import React from 'react';
import SHeader from '../components/sHeader';
import { Outlet } from "react-router-dom";
import '../styles/root.css';
import SFooter from '../components/sFooter';


export default function Root() {   

    return (
        <>
            <SHeader />
            <Outlet />
            <SFooter />
        </>
    )
}