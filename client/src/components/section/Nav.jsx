import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { AuthContext } from "../../contexts/AuthContext";
function Nav() {

  const { isDarkMode , toggleDarkMode  , logOut} = useContext(AuthContext);
 const navigate = useNavigate();

 async function handleLogout(){
    await logOut();
    navigate("/login");
  }

  return (
    <div className="navbar bg-base-100 dark:text-white dark:bg-[#010101]">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
          <DarkModeSwitch
            style={{ marginBottom: "2rem" }}
            checked={isDarkMode === 'dark' ? true : false}
            onChange={toggleDarkMode}
            size={60}
            color={isDarkMode === 'dark' ? 'green' : 'yellow'}
          />
      </div>
      <div className="navbar-center hidden lg:flex ">
        <ul  className="menu menu-horizontal px-1 ">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2 dark:text-black">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link onClick={handleLogout} className="btn dark:text-white dark:bg-black">
          LogOut
        </Link>
      </div>
    </div>
  );
}

export default Nav;
