import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";
import App from "./App";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import { CreatePage, LoginPage, RegisterPage, VerifyPage } from "./pages";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<MainLayout />}>
        <Route index path="/" element={<App />} />
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="create/:token" element={<CreatePage />} />
          <Route
            path="verify/:token"
            errorElement={<h1>error occured</h1>}
            loader
            element={<VerifyPage />}
          />
        </Route>
      </Route>
    </>
  )
);
