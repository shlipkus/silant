import React from 'react';
import '../styles/main.css'
import BaseMain from '../components/base-main';
import AuthMain from '../components/auth-main';

export default function SMain() {
    const auth = false;
    return (
        auth ? <AuthMain /> : <BaseMain />
    )
}