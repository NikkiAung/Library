import {
    createBrowserRouter
  } from "react-router-dom";
import Layout from "../pages/layouts/Layout";
import Home from "../pages/Home";
import Search from "../pages/Search";
import BookDetail from "../pages/BookDetail";
import BookForm from "../pages/BookForm"
const router = createBrowserRouter([
{
    path: "/",
    element: <Layout/>,
    children : [
        {
            path: '',
            element: <Home/>
        },
        {
            path: '/create',
            element: <BookForm/>
        },
        {
            path: '/edit/:id',
            element: <BookForm/>
        },
        {
            path: '/search',
            element: <Search/>
        },
        {
            path: '/books/:id',
            element: <BookDetail/>
        }

    ]

},
]);

export default router
