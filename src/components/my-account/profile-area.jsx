import React, { useState } from "react";
import { useIsMobile } from "@/utils/isMobileUtil"; // Import the custom hook
import ProfileNavTab from "./profile-nav-tab";
import ProfileShape from "./profile-shape";
import NavProfileTab from "./nav-profile-tab";
import ProfileInfo from "./profile-info";
import ChangePassword from "./change-password";
import MyOrders from "./my-orders";

const ProfileArea = ({ orderData, currentPage, setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState("nav-profile"); // State to track active tab
  const isMobile = useIsMobile(); // Use the custom hook to check if the device is mobile

  // Handle tab change
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // Reset page to 1 when switching to orders tab
    if (tabId === "nav-order") {
      setCurrentPage(1);
    }
  };

  return (
    <section
      className="profile__area"
      style={{
        paddingTop: isMobile ? "20px" : "120px", // Adjust padding-top for mobile
        paddingBottom: isMobile ? "20px" : "120px", // Adjust padding-bottom for mobile
      }}
    >
      <div className="container">
        <div className="profile__inner p-relative">
          <ProfileShape />
          <div className="row">
            <div className={`col-xxl-4 col-lg-4 ${isMobile ? "mb-4" : ""}`}>
              <div className="">
                <ProfileNavTab
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                />
              </div>
            </div>
            <div className="col-xxl-8 col-lg-8">
              <div className="profile__tab-content">
                <div className="tab-content " id="profile-tabContent">
                  <div
                    style={{ minHeight: "70vh" }}
                    className={`tab-pane fade ${
                      activeTab === "nav-profile" ? "show active" : ""
                    }`}
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab"
                  >
                    <NavProfileTab orderData={orderData} />
                  </div>

                  <div
                    style={{ minHeight: "60vh" }}
                    className={`tab-pane fade ${
                      activeTab === "nav-information" ? "show active" : ""
                    }`}
                    id="nav-information"
                    role="tabpanel"
                    aria-labelledby="nav-information-tab"
                  >
                    <ProfileInfo />
                  </div>

                  <div
                    style={{ minHeight: "70vh" }}
                    className={`tab-pane fade  ${
                      activeTab === "nav-password" ? "show active" : ""
                    }`}
                    id="nav-password"
                    role="tabpanel"
                    aria-labelledby="nav-password-tab"
                  >
                    <ChangePassword />
                  </div>

                  <div
                    style={{ minHeight: "70vh" }}
                    className={`tab-pane fade ${
                      activeTab === "nav-order" ? "show active" : ""
                    }`}
                    id="nav-order"
                    role="tabpanel"
                    aria-labelledby="nav-order-tab"
                  >
                    <MyOrders
                      orderData={orderData}
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileArea;
