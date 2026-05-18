import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthLayout from "./modules/Shared/Components/AuthLayout/AuthLayout";
import NotFound from "./modules/Shared/Components/NotFound/NotFound";

import Login from "./modules/Authentication/components/Login/Login";
import Register from "./modules/Authentication/components/Register/Register";
import ForgetPass from "./modules/Authentication/components/ForgetPass/ForgetPass";
import Verfiy from "./modules/Authentication/components/Verfiy/Verfiy";
import ResetPass from "./modules/Authentication/components/ResetPass/ResetPass";
import ChangePass from "./modules/Authentication/components/ChangePass/ChangePass";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./modules/Shared/Components/ProtectedRoute/ProtectedRoute";
import MasterLayout from "./modules/Shared/Components/MasterLayout/MasterLayout";
import Dashboard from "./modules/Dashboard/component/Dashboard/Dashboard";
import ProjectData from "./modules/Projects/components/ProjectData/ProjectData";
import ProjectList from "./modules/Projects/components/ProjectList/ProjectList";
import TaskData from "./modules/Tasks/component/TaskData/TaskData";
import TaskList from "./modules/Tasks/component/TaskList/TaskList";
import UserList from "./modules/Users/component/UserList/UserList";
import TaskBoard from "./modules/Taskboard/component/TaskBoard/TaskBoard";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPass /> },
        { path: "verify-account", element: <Verfiy /> },
        { path: "reset-password", element: <ResetPass /> },
        { path: "change-password", element: <ChangePass /> },
      ],
    },
    {
      path:"dashboard",
      element:<ProtectedRoute>
        <MasterLayout/>
      </ProtectedRoute>,
      errorElement:<NotFound/>,
      children:[
        {index:true ,element:<Dashboard/>},
        {path:"project-data",element:<ProjectData/>},
        {path:"project-data/:id",element:<ProjectData/>},
        {path:"project-list",element:<ProjectList/>},
        {path:"task-data",element:<TaskData/>},
        {path:"task-list",element:<TaskList/>},
        {path:"user-list",element:<UserList/>},
        {path:"task-board",element:<TaskBoard/>},


      ]
    }
  ]);

  return (
    <>
      <ToastContainer />

      <RouterProvider router={routes} />
    </>
  );
}
export default App;
