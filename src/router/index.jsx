import {
    createBrowserRouter,
    Navigate,
    RouterProvider
  } from "react-router-dom";
import Layout from "../pages/layouts/Layout";
import Home from "../pages/Home";
import Search from "../pages/Search";
import BookDetail from "../pages/BookDetail";
import BookForm from "../pages/BookForm"
import Register from "../pages/Register";
import Login from "../pages/Login";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContextProvider";


export default function index() {
    let {authReady, user} = useContext(AuthContext);
    const isAuthenticated = Boolean(user);
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout/>,
            children : [
                {
                    path: '',
                    element: isAuthenticated ? <Home/> : <Navigate to='/login'/>
                },
                {
                    path: '/create',
                    element: isAuthenticated ? <BookForm/> : <Navigate to='/login'/>
                },
                {
                    path: '/edit/:id',
                    element: isAuthenticated ? <BookForm /> : <Navigate to="/login"/>
                },
                {
                    path: '/search',
                    element: isAuthenticated ? <Search /> : <Navigate to="/login" />
                },
                {
                    path: '/books/:id',
                    element: isAuthenticated ? <BookDetail /> : <Navigate to="/login"/>
                },
                {
                    path: '/register',
                    element: !isAuthenticated ? <Register /> : <Navigate to="/"/>
                },
                {
                    path: '/login',
                    element: !isAuthenticated ? <Login /> : <Navigate to="/"/>
                }
            ]
        },
        ]);
 
  return (
    authReady && <RouterProvider router={router} />
  )
}


