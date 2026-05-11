import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthLayout from "./modules/Shared/Components/AuthLayout/AuthLayout";
import NotFound from "./modules/Shared/Components/NotFound/NotFound";

import Login from "./modules/Authentication/components/Login/Login";
import Register from "./modules/Authentication/components/Register/Register";
import ForgetPass from "./modules/Authentication/components/ForgetPass/ForgetPass";
import Verfiy from "./modules/Authentication/components/Verfiy/Verfiy";
import ResetPass from "./modules/Authentication/components/ResetPass/ResetPass";

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
        { path: "forgetpass", element: <ForgetPass /> },
        { path: "verifyaccount", element: <Verfiy /> },
        { path: "resetpass", element: <ResetPass /> },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;