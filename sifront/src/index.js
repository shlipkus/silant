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
import TService from './routes/tech-service';
import Reclamation from './routes/reclamation';
import Handbooks from './routes/handbooks';
import Handbook from './routes/handbook'

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
                path: '/machine/:id',
                element: <Machine />
            },
            {
                path: '/ts/:id',
                element: <TService />
            },
            {
                path: '/reclame/:id',
                element: <Reclamation />
            },
            {
                path: '/handbooks/',
                element: <Handbooks />
            },
            {
                path: '/handbooks/:id',
                element: <Handbook />
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