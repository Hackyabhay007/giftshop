import React, { useState } from "react";

function SingleNav({ active = false, id, title, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: active ? "#990100" : "transparent", // Red background when active
        color: active ? "white" : "black", // White text when active
        borderRadius: "12px", // Rounded corners for the button
        border: "none", // No outer border for buttons
        width: "100%", // Full width for alignment
        padding: "12px 20px", // Adjust padding for extra spacing
        display: "flex", // Flex layout for icon and text alignment
        alignItems: "center", // Center items vertically
        justifyContent: "flex-start", // Align content to the left
        gap: "10px", // Space between icon and text
        cursor: "pointer", // Pointer cursor on hover
      }}
      className={`nav-link ${active ? "active" : ""}`}
      id={`nav-${id}-tab`}
      data-bs-toggle="tab"
      data-bs-target={`#nav-${id}`}
      type="button"
      role="tab"
      aria-controls={id}
      aria-selected={active ? "true" : "false"}
    >
      <i
        style={{
          color: active ? "white" : "black", // Icon color matches text color
        }}
        className={icon}
      ></i>
      <span>{title}</span>
    </button>
  );
}

const ProfileNavTab = () => {
  const [activeTab, setActiveTab] = useState("profile"); // State for active tab

  const handleNavClick = (tabId) => {
    setActiveTab(tabId); // Set the clicked tab as active
  };

  return (
    <nav>
      <div
        className="nav nav-tabs tp-tab-menu flex-column"
        id="profile-tab"
        role="tablist"
        style={{
          backgroundColor: "#f5f5f5", // Lighter gray background
          borderRadius: "24px", // Rounded corners for the container
          border: "1px solid lightgray", // Light gray border
          padding: "10px", // Padding inside the container
          boxShadow: "none", // Ensure no shadow is applied
        }}
      >
        <div style={{ padding: "5px" }}>
          <SingleNav
            active={activeTab === "profile"}
            id="profile"
            title="Profile"
            icon="fa-regular fa-user-pen"
            onClick={() => handleNavClick("profile")}
          />
        </div>
        <div
          style={{
            borderBottom: "1px solid lightgray", // Divider line
            margin: "0 16px", // Adjust margin for spacing
          }}
        ></div>
        <div style={{ padding: "5px" }}>
          <SingleNav
            active={activeTab === "information"}
            id="information"
            title="Information"
            icon="fa-regular fa-circle-info"
            onClick={() => handleNavClick("information")}
          />
        </div>
        <div
          style={{
            borderBottom: "1px solid lightgray", // Divider line
            margin: "0 16px", // Adjust margin for spacing
          }}
        ></div>
        <div style={{ padding: "5px" }}>
          <SingleNav
            active={activeTab === "order"}
            id="order"
            title="My Orders"
            icon="fa-light fa-clipboard-list-check"
            onClick={() => handleNavClick("order")}
          />
        </div>
        <div
          style={{
            borderBottom: "1px solid lightgray", // Divider line
            margin: "0 16px", // Adjust margin for spacing
          }}
        ></div>
        <div style={{ padding: "5px" }}>
          <SingleNav
            active={activeTab === "password"}
            id="password"
            title="Change Password"
            icon="fa-regular fa-lock"
            onClick={() => handleNavClick("password")}
          />
        </div>
      </div>
    </nav>
  );
};

export default ProfileNavTab;
