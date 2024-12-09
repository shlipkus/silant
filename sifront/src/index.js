import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import './styles/index.css';
import Root from './routes/root';
import SMain from './routes/main';

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