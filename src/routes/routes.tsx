import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";

import  Home  from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route element={<Home />} path="/"/>
                <Route element={<SignIn />} path="/sign-in"/>
                <Route element={<SignUp />} path="/sign-up"/>
            </Switch>
        </BrowserRouter>
    )
}