import React, { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state
import { mobile_menu } from "@/data/menu-data";

const MobileMenus = () => {
  const [isActiveMenu, setIsActiveMenu] = useState("");
  const user = useSelector((state) => state.auth.user); // Accessing the user state

  // handleOpenSubMenu to toggle submenu on click
  const handleOpenSubMenu = (title) => {
    setIsActiveMenu((prevMenu) => (prevMenu === title ? "" : title));
  };

  return (
    <>
      <nav className="tp-main-menu-content">
        <ul className="menu">
          {mobile_menu.map((menu) =>
            menu.sub_menu ? (
              // Menu with submenus
              <li
                key={menu.id}
                className={`menu-item has-sub-menu ${
                  isActiveMenu === menu.title ? "active" : ""
                }`}
              >
                <Link href={menu.link || "#"}>
                  <span
                    style={{
                      color: isActiveMenu === menu.title ? "gray" : "black", // Change color based on active state
                    }}
                    onClick={() => handleOpenSubMenu(menu.title)}
                  >
                    {menu.title}
                  </span>
                </Link>

                {/* Render Submenu */}
                {isActiveMenu === menu.title && menu.sub_menus && (
                  <ul className="sub-menu">
                    {menu.sub_menus.map((sub, index) => (
                      <li key={index}>
                        <Link href={sub.link || "#"}>
                          <span
                            style={{
                              color:
                                isActiveMenu === menu.title ? "black" : "black", // Change color based on active state
                            }}
                          >
                            {sub.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              // Single link item
              <li key={menu.id} className="menu-item">
                <Link href={menu.link || "#"}>
                  <span
                    style={{
                      color: isActiveMenu === menu.title ? "black" : "black", // Change color based on active state
                    }}
                  >
                    {menu.title}
                  </span>
                </Link>
              </li>
            )
          )}
          {/* Conditionally render Profile, Login, and Register links */}
          {user ? (
            <li className="menu-item">
              <Link href="/profile">
                <span style={{ color: "black" }}>Profile</span>
              </Link>
            </li>
          ) : (
            <>
              <li className="menu-item">
                <Link href="/login">
                  <span style={{ color: "black" }}>Login</span>
                </Link>
              </li>
              <li className="menu-item">
                <Link href="/register">
                  <span style={{ color: "black" }}>Register</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default MobileMenus;