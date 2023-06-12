import {
  ChartDonut,
  DiamondsFour,
  Images,
  SignOut,
  User,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { DropdownMenu } from "../DropDownMenu";

export function UserNav() {
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width <= 642) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [width]);

  return (
    <header className="flex justify-between items-center w-full h-full bg-white p-2 rounded-sm">
      <h1 className="text-base font-semibold tracking-wide">
        {pathname === "/"
          ? "Feed"
          : pathname === "/profile"
          ? "Profile"
          : pathname === "/profile/statistics"
          ? "Statistics"
          : "New Post"}
      </h1>

      {isMobile ? (
        <DropdownMenu />
      ) : (
        <nav className="flex justify-between gap-10  ">
          <NavLink
            to={
              pathname === "/"
                ? "/profile"
                : pathname === "/profile"
                ? "/"
                : "/profile"
            }
            className={`flex gap-2 items-center hover:text-cyan-500 hover:scale-125 transition-transform ${
              pathname === "/profile" && "text-cyan-500"
            }`}
          >
            {pathname === "/" ? (
              <User size={26} />
            ) : pathname === "/profile" ? (
              <DiamondsFour size={26} />
            ) : (
              <User size={26} />
            )}
          </NavLink>
          <NavLink
            to="/profile/statistics"
            className={`flex gap-2 items-center hover:text-cyan-500 hover:scale-125 transition-transform ${
              pathname === "/profile/statistics" && "text-cyan-500"
            }`}
          >
            <ChartDonut size={26} />
            {isMobile && "Statistics"}
          </NavLink>
          <NavLink
            to="/profile/new-post"
            className={`flex gap-2 items-center hover:text-cyan-500 hover:scale-125 transition-transform ${
              pathname === "/profile/new-post" && "text-cyan-500"
            }`}
          >
            <Images size={26} />
            {isMobile && "New Post"}
          </NavLink>
          <button className="hover:text-red-500 hover:scale-125 transition-transform">
            <SignOut size={26} />
          </button>
        </nav>
      )}
    </header>
  );
}
