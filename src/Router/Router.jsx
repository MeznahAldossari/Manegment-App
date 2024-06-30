import React from 'react'
import * as ReactDOM from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Homes from '../component/Homes';
import Signup from '../component/Signup';
import Login from '../component/Login';
import Dashboard from '../component/Dashboard';
import AddIdea from '../component/AddIdea';
import Ideadetails from '../component/Ideadetails';
import Accepted from '../component/Accepted';
import AllStudents from '../component/AllStudents';
import StudentDetails from '../component/StudentDetails';


function Router() {

    const router = createBrowserRouter([
        {
          path: "/",
          element: <Signup />,
        },
        // {
        //     path: "/signup",
        //     element: <Signup />,
        // },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/dashboard",
            element: <Dashboard />,

        },
        {
            path: "/addIdea",
            element: <AddIdea />,

        },
        {
          path: "/ideaDetails/:ideaId/:userId",
          element: <Ideadetails />,

      },
      {
        path: "/accepted",
        element: <Accepted />,

    }, {
      path: "/students",
      element: <AllStudents />,

  },
  {
    path: "/studentInfo/:id",
    element: <StudentDetails />,

}

      ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default Router
