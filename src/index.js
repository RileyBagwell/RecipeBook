import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { 
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Home.js';
import Profile from './Profile.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
    exact: true,
  },
  {
    path: "/profile",
    element: <Profile />,
    exact: true,
  },
  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
