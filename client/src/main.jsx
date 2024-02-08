import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Signup from './components/Signup.jsx'
import All from './components/All.jsx'
import Culture from './components/Culture.jsx'
import People from './components/People.jsx'
import Post from './components/Post.jsx'
import CreatePost from './components/CreatePost.jsx'
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
    path: '/all',
    element: <All />,
  },
  {
    path: '/all/:id',
    element: <Post />,
  },
  {
    path: '/culture',
    element: <Culture />
  },
  {
    path: 'culture/:id',
    element: <Post />
  },
  {
    path: '/technology',
    element: <Technology />
  },
  {
    path: 'technology/:id',
    element: <Post />
  },
  {
    path: '/people',
    element: <People />
  },
  {
    path: 'people/:id',
    element: <Post />
  },
  {
    path: '/lifestyle',
    element: <Lifestyle />
  },
  {
    path: 'lifestyle/:id',
    element: <Post />
  },
  {
    path: '/:id',
    element: <Post />
  },
  {
    path: '/create_post',
    element: <CreatePost />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
