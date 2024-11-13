import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductDetails from './Component/ProductDetails/ProductDetails';
import Layout from './Component/Layout/Layout';

const router =createBrowserRouter([
    {
       
        path:'/',
        element:<Layout />,
        children:[
            {
                path:'',
                element:<App/>
            },
            {
                path:'ProductDetails/:product_id',
                element:<ProductDetails/>
            }

        ]
    },  
   
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router}/>
 
    
  
);

