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
  ]);

  return (
    <>
      <ToastContainer />

      <RouterProvider router={routes} />
    </>
  );
}
export default App;
