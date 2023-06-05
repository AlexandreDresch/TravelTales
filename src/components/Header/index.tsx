import { Link, useLocation } from "react-router-dom";
import { SignIn } from "@phosphor-icons/react";

import logo from "../../assets/logo.png";

export function Header() {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 bg-white z-50 border-x-slate-600 border-b-[.5px]">
      <nav className="flex justify-between items-center py-2 px-2">
        <Link to={"/"} className="flex items-center gap-2">
          <img
            src={logo}
            alt="TravelTales"
            className="w-12 hover:opacity-90"
            aria-label="TravelTales - Home"
          />
          <h1 className="font-medium tracking-wide">TravelTales</h1>
        </Link>

        {pathname === "/sign-up" ? (
          <Link
            to={"/sign-in"}
            className="flex justify-center items-center gap-2 hover:text-gray-600"
          >
            Sign In
            <SignIn size={20} />
          </Link>
        ) : (
          <Link
            to={"/sign-up"}
            className="text-white text-sm font-semibold bg-blue-500 align-baseline hover:bg-blue-800 p-1 rounded-md"
          >
            Sign Up
          </Link>
        )}
      </nav>
    </header>
  );
}
