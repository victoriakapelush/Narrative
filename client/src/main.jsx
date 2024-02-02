import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Signup from './components/Signup.jsx'
import Culture from './components/Culture.jsx'
import People from './components/People.jsx'
import Lifestyle from './components/Lifestyle.jsx'
import Technology from './components/Technology.jsx'
import './styles/index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/culture',
    element: <Culture />
  },
  {
    path: '/technology',
    element: <Technology />
  },
  {
    path: '/people',
    element: <People />
  },
  {
    path: '/lifestyle',
    element: <Lifestyle />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
