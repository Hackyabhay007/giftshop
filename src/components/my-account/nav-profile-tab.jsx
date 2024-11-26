import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Box, DeliveryTwo, Processing, Truck } from "@/svg"; // SVGs used for icons
import { userLoggedOut, userLoggedIn } from "@/redux/features/auth/authSlice";
import { useGetUserQuery } from "@/redux/features/auth/authApi";

const NavProfileTab = ({ orderData }) => {
  const dispatch = useDispatch();
  const router = useRouter();

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

  // Handle Logout
  const handleLogout = () => {
    dispatch(userLoggedOut());
    router.push("/");
  };

  // Calculate total orders, pending orders, and placeholders for processing/delivered
  const totalOrders = orderData?.orders?.total || 0;
  const pendingOrders =
    orderData?.orders?.data?.filter((order) => order.status === "pending")
      .length || 0;
  const processingOrders =
    orderData?.orders?.data?.filter((order) => order.status === "processing")
      .length || 0;
  const deliveredOrders =
    orderData?.orders?.data?.filter((order) => order.status === "delivered")
      .length || 0;

  return (
    <div
      className="profile__main"
      style={{
        backgroundColor: "#fff",
        borderRadius: "24px", // Rounded corners for main container
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", /// Adding shadow
        padding: "24px",
      }}
    >
      <div className="profile__main-top pb-80">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="profile__main-inner d-flex flex-wrap align-items-center">
              <div className="profile__main-content">
                <h4 className="profile__main-title">
                  Welcome Mr. {userInfo?.user?.name}
                </h4>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="profile__main-logout text-sm-end">
              <a
                style={{
                  backgroundColor: "#990100",
                  color: "white",
                  borderRadius: "8px",
                }}
                onClick={handleLogout}
                className="cursor-pointer tp-logout-btn"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="profile__main-info">
        <div
          className="row gx-3"
          style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
        >
          {/* For each stat, create a responsive 2x2 grid */}
          <div className="col-md-6 col-sm-12">
            <div
              className="profile__main-info-item"
              style={{
                backgroundColor: "#f2f2f2", // Lightest gray background
                borderRadius: "12px", // Rounded corners for each box
                padding: "16px",
                textAlign: "center",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                marginBottom: "16px",
              }}
            >
              <div className="profile__main-info-icon">
                <span>
                  <span
                    style={{
                      backgroundColor: "#990100",
                      padding: "4px", // Adjust the padding to make the circle more proportional
                      borderRadius: "50%",
                      fontSize: "12px",
                      color: "#fff",
                      fontWeight: "600",
                      width: "24px", // Set the width of the circle
                      height: "24px", // Set the height of the circle
                      display: "flex", // Flexbox to center the text
                      alignItems: "center", // Vertically center the content
                      justifyContent: "center", // Horizontally center the content
                      position: "absolute", // To ensure the circle is positioned correctly
                      top: "0", // Align the circle properly with the icon
                      right: "0", // Adjust if needed for positioning
                    }}
                    className="profile-icon-count profile-download"
                  >
                    {totalOrders}
                  </span>
                  <Box style={{ fontSize: "24px" }} />
                </span>
              </div>
              <h4 className="profile__main-info-title">Total Orders</h4>
            </div>
          </div>

          <div className="col-md-6 col-sm-12">
            <div
              className="profile__main-info-item"
              style={{
                backgroundColor: "#f2f2f2",
                borderRadius: "12px",
                padding: "16px",
                textAlign: "center",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                marginBottom: "16px",
              }}
            >
              <div className="profile__main-info-icon">
                <span>
                  <span
                    style={{
                      backgroundColor: "#990100",
                      padding: "4px", // Adjust the padding to make the circle more proportional
                      borderRadius: "50%",
                      fontSize: "12px",
                      color: "#fff",
                      fontWeight: "600",
                      width: "24px", // Set the width of the circle
                      height: "24px", // Set the height of the circle
                      display: "flex", // Flexbox to center the text
                      alignItems: "center", // Vertically center the content
                      justifyContent: "center", // Horizontally center the content
                      position: "absolute", // To ensure the circle is positioned correctly
                      top: "0", // Align the circle properly with the icon
                      right: "0", // Adjust if needed for positioning
                    }}
                    className="profile-icon-count profile-order"
                  >
                    {pendingOrders}
                  </span>
                  <Processing style={{ fontSize: "24px" }} />
                </span>
              </div>
              <h4 className="profile__main-info-title">Pending Orders</h4>
            </div>
          </div>

          <div className="col-md-6 col-sm-12">
            <div
              className="profile__main-info-item"
              style={{
                backgroundColor: "#f2f2f2",
                borderRadius: "12px",
                padding: "16px",
                textAlign: "center",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                marginBottom: "16px",
              }}
            >
              <div className="profile__main-info-icon">
                <span>
                  <span
                    style={{
                      backgroundColor: "#990100",
                      padding: "4px", // Adjust the padding to make the circle more proportional
                      borderRadius: "50%",
                      fontSize: "12px",
                      color: "#fff",
                      fontWeight: "600",
                      width: "24px", // Set the width of the circle
                      height: "24px", // Set the height of the circle
                      display: "flex", // Flexbox to center the text
                      alignItems: "center", // Vertically center the content
                      justifyContent: "center", // Horizontally center the content
                      position: "absolute", // To ensure the circle is positioned correctly
                      top: "0", // Align the circle properly with the icon
                      right: "0", // Adjust if needed for positioning
                    }}
                    className="profile-icon-count profile-wishlist"
                  >
                    {processingOrders}
                  </span>
                  <Truck style={{ fontSize: "24px" }} />
                </span>
              </div>
              <h4 className="profile__main-info-title">Processing Orders</h4>
            </div>
          </div>

          <div className="col-md-6 col-sm-12">
            <div
              className="profile__main-info-item"
              style={{
                backgroundColor: "#f2f2f2",
                borderRadius: "12px",
                padding: "16px",
                textAlign: "center",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                marginBottom: "16px",
              }}
            >
              <div className="profile__main-info-icon">
                <span>
                  <span
                    style={{
                      backgroundColor: "#990100",
                      padding: "4px", // Adjust the padding to make the circle more proportional
                      borderRadius: "50%",
                      fontSize: "12px",
                      color: "#fff",
                      fontWeight: "600",
                      width: "24px", // Set the width of the circle
                      height: "24px", // Set the height of the circle
                      display: "flex", // Flexbox to center the text
                      alignItems: "center", // Vertically center the content
                      justifyContent: "center", // Horizontally center the content
                      position: "absolute", // To ensure the circle is positioned correctly
                      top: "0", // Align the circle properly with the icon
                      right: "0", // Adjust if needed for positioning
                    }}
                    className="profile-icon-count profile-wishlist"
                  >
                    {deliveredOrders}
                  </span>
                  <DeliveryTwo style={{ fontSize: "24px" }} />
                </span>
              </div>
              <h4 className="profile__main-info-title">Completed Orders</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavProfileTab;
