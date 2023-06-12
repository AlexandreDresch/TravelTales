import { Link, useLocation } from "react-router-dom";
import { GearSix, SignIn } from "@phosphor-icons/react";

import logo from "../../assets/logo.png";
import useToken from "../../hooks/useToken";

export function Header() {
  const { pathname } = useLocation();

  const token = useToken();

  return (
    <header className="sticky top-0 bg-white z-50 border-x-slate-600 border-b-[.5px] rounded-sm">
      <nav className="flex justify-between items-center py-2 px-2">
        <Link
          to={"/"}
          className="flex items-center gap-2 hover:scale-105 hover:opacity-90"
        >
          <img
            src={logo}
            alt="TravelTales"
            className="w-12"
            aria-label="TravelTales - Home"
          />
          <h1 className="font-medium tracking-widest">TravelTales</h1>
        </Link>

        {pathname === "/sign-up" ? (
          <Link
            to={"/sign-in"}
            className="flex justify-center items-center gap-2 hover:text-gray-600"
          >
            Sign In
            <SignIn size={20} />
          </Link>
        ) : !token ? (
          <Link
            to={"/sign-up"}
            className="text-white text-sm font-semibold bg-cyan-500 align-baseline hover:bg-cyan-600 hover:scale-105 p-1 rounded-md"
          >
            Sign Up
          </Link>
        ) : (
          <GearSix size={25} className="hover:scale-105 cursor-pointer" />
        )}
      </nav>
    </header>
  );
}
