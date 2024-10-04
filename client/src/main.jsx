import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Signup from "./components/signup.jsx";
import All from "./components/All.jsx";
import Category from "./components/Category.jsx";
import Post from "./components/Post.jsx";
import CreatePost from "./components/CreatePost.jsx";
import NotFound from "./components/NotFound.jsx";
import "./styles/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/all",
    element: <All />,
  },
  {
    path: "/all/:id",
    element: <Post />,
  },
  {
    path: "/:category",
    element: <Category />,
  },
  {
    path: "/:category/:id",
    element: <Post />,
  },
  {
    path: "/addpost",
    element: <CreatePost />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
