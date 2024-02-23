import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import Menu1 from '../pages/Menu1';
import Menu2 from '../pages/Menu2';
import Menu3 from '../pages/Menu3';
import Home from '../pages/Home';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: "/menu1", element: <Menu1 /> },
            { path: "/menu2", element: <Menu2 /> },
            { path: "/menu3", element: <Menu3 /> },
        ]
    },
]);

function AppRouter() {
    return <RouterProvider router={router}/>
}

export default AppRouter;