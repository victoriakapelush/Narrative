/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";

// Lazy load components for performance optimization
const Signup = lazy(() => import('./components/Signup.jsx'));
const All = lazy(() => import('./components/All.jsx'));
const Post = lazy(() => import('./components/Post.jsx'));
const Culture = lazy(() => import('./components/Culture.jsx'));
const People = lazy(() => import('./components/People.jsx'));
const Lifestyle = lazy(() => import('./components/Lifestyle.jsx'));
const Technology = lazy(() => import('./components/Technology.jsx'));
const CreatePost = lazy(() => import('./components/CreatePost.jsx'));
const NotFound = lazy(() => import('./components/NotFound.jsx'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "addpost",
        element: <CreatePost />,
      },
      {
        path: "all",
        children: [
          {
            path: "",
            element: <All />,
          },
          {
            path: ":id",
            element: <Post />,
          },
        ],
      },
      {
        path: "culture",
        children: [
          {
            path: "",
            element: <Culture />,
          },
          {
            path: ":id",
            element: <Post />,
          },
        ],
      },
      {
        path: "technology",
        children: [
          {
            path: "",
            element: <Technology />,
          },
          {
            path: ":id",
            element: <Post />,
          },
        ],
      },
      {
        path: "people",
        children: [
          {
            path: "",
            element: <People />,
          },
          {
            path: ":id",
            element: <Post />,
          },
        ],
      },
      {
        path: "lifestyle",
        children: [
          {
            path: "",
            element: <Lifestyle />,
          },
          {
            path: ":id",
            element: <Post />,
          },
        ],
      },
      {
        path: ":id",
        element: <Post />,
      },
      {
        path: "*",
        element: <NotFound />,  // NotFound component for invalid routes
      },
    ],
  },
]);

export default router;