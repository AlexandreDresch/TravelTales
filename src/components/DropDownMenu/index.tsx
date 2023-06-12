import {
  ChartDonut,
  DiamondsFour,
  Images,
  List,
  SignOut,
  User,
  X,
} from "@phosphor-icons/react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const { pathname } = useLocation();
  return (
    <div>
      <button
        id="dropdownDividerButton"
        data-dropdown-toggle="dropdownDivider"
        className="text-black bg-white hover:bg-gray-100 focus:outline-none font-medium rounded-lg text-sm px-1 py-1 text-center inline-flex items-center"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={26} /> : <List size={26} />}
      </button>

      {isOpen && (
        <div
          id="dropdownDivider"
          className="z-10 absolute right-6 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDividerButton"
          >
            <li>
              <NavLink
                to={
                  pathname === "/"
                    ? "/profile"
                    : pathname === "/profile"
                    ? "/"
                    : "/profile"
                }
                className={`flex gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white items-center transition-transform `}
                onClick={() => setIsOpen(!isOpen)}
              >
                {pathname === "/" ? (
                  <User size={26} />
                ) : pathname === "/profile" ? (
                  <DiamondsFour size={26} />
                ) : (
                  <User size={26} />
                )}

                {pathname === "/"
                  ? "My Profile"
                  : pathname === "/profile"
                  ? "Feed"
                  : "My Profile"}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile/statistics"
                className={`flex gap-2 items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:text-teal-500 transition-transform ${
                  pathname === "/profile/statistics" && "text-teal-500"
                }`}
                onClick={() => setIsOpen(!isOpen)}
              >
                <ChartDonut size={26} />
                {"Statistics"}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile/new-post"
                className={`flex gap-2 items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover:text-teal-500 transition-transform ${
                  pathname === "/profile/new-post" && "text-teal-500"
                }`}
                onClick={() => setIsOpen(!isOpen)}
              >
                <Images size={26} />
                {"New Post"}
              </NavLink>
            </li>
          </ul>
          <div className="py-2">
            <button className="flex gap-2 items-center text-sm hover:text-red-500 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-transform">
              <SignOut size={26} />
              {"Sign Out"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
