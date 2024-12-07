import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useGetUserQuery } from '@/redux/features/auth/authApi';
// internal
import { EmailTwo, UserThree } from '@/svg';

const ProfileInfo = () => {
  const dispatch = useDispatch();

  // Fetch user info using RTK query
  const { data: userInfo, isLoading, error } = useGetUserQuery();

  useEffect(() => {
    // Sync user state with Redux when component mounts
    if (userInfo) {
      const { user, token } = userInfo;
      if (user && token) {
        dispatch(userLoggedIn({ user, accessToken: token }));
      }
    }
  }, [userInfo, dispatch]);

  return (
    <div
      className="profile__info"
      style={{
        backgroundColor: "#ffffff", // White background for the card
        borderRadius: "16px", // Rounded corners for the card
        // boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", 
        border: "1px solid #e0e0e0", // Light border
        padding: "24px", // Inner padding
        maxWidth: "600px", // Max width for the card
        margin: "0 auto", // Center align the card
      }}
    >
      <h3
        className="profile__info-title"
        style={{
          marginBottom: "20px",
          fontSize: "20px",
          fontWeight: "600",
          textAlign: "center",
          color: "#333",
        }}
      >
        Personal Details
      </h3>
      <div className="profile__info-content">
        <div className="row">
          {/* Name Field */}
          <div className="col-xxl-12">
            <div
              className="profile__input-box"
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px 16px",
                marginBottom: "16px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <span style={{ marginRight: "12px", color: "#333" }}>
                <UserThree />
              </span>
              <input
                name="name"
                type="text"
                placeholder="Enter your username"
                value={userInfo?.user?.name || ""}
                readOnly
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  outline: "none",
                  width: "100%",
                  fontSize: "16px",
                  color: "#333",
                }}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="col-xxl-12">
            <div
              className="profile__input-box"
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px 16px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <span style={{ marginRight: "12px", color: "#333" }}>
                <EmailTwo />
              </span>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={userInfo?.user?.email || ""}
                readOnly
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  outline: "none",
                  width: "100%",
                  fontSize: "16px",
                  color: "#333",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
