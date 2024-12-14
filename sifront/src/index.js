import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import './styles/index.css';
import Root from './routes/root';
import SMain from './routes/main';
import Login from './routes/login';
import Machine from './routes/machine';

// Clear the existing HTML content
document.body.innerHTML = '<div id="root"></div>';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <SMain />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/machine/:num',
                element: <Machine />
            },
            {
                path: '/machine/reclame/:num',
                element: <h1>HI</h1>
            }
        ]
    }
])

const root = createRoot(document.getElementById('root'));
root.render(
   <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
   </StrictMode>
);