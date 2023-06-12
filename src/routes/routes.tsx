import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";

import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Home from "../pages/Home";
import Profile from "../pages/Profile";

import { ProtectedRoute } from "../components/ProtectedRoute";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route element={<Home />} path="/" />
        <Route element={<SignIn />} path="/sign-in" />
        <Route element={<SignUp />} path="/sign-up" />
        <Route
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
          path="/profile/*"
        />
      </Switch>
    </BrowserRouter>
  );
}
