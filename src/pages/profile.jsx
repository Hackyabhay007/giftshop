import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
// internal
import SEO from "@/components/seo";
import Wrapper from "@/layout/wrapper";
import HeaderTwo from "@/layout/headers/header-2";
import Footer from "@/layout/footers/footer";
import ProfileArea from "@/components/my-account/profile-area";
import { useGetUserOrdersQuery } from "@/redux/features/order/orderApi";
import Loader from "@/components/loader/loader";

const ProfilePage = () => {
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Add pagination state
  const { accessToken } = useSelector((state) => state.auth);

  const router = useRouter();
  
  const { data: orders, error, isLoading } = useGetUserOrdersQuery(
    { accessToken, page: currentPage },
    {
      skip: !accessToken,
    }
  );

  // Set mounted to true when component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle authentication
  useEffect(() => {
    if (!accessToken && mounted) {
      router.push("/login");
    }
  }, [accessToken, router, mounted]);

  // Prevent rendering until mounted
  if (!mounted) {
    return null;
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
        <Loader loading={isLoading} />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="text-center">
        <h2>Error fetching orders: {error.message}</h2>
        <p>Please try again later.</p>
      </div>
    );
  }

  return (
    <Wrapper>
      <SEO pageTitle="Profile" />
      <HeaderTwo style_2={true} />
      <ProfileArea
        orderData={orders}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <Footer style_2={true} />
    </Wrapper>
  );
};

export default ProfilePage;