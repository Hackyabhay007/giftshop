import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

function GiftSection() {
  return (
    <div className="container-fluid py-5">
      <div className="row">
        {/* Left Section */}
        <div
          style={{
            minHeight: "527px",
            backgroundImage:
              "url(https://i.pinimg.com/736x/75/7e/d3/757ed33504e1a095c7e51a943ef84299.jpg)",
            backgroundSize: "cover", // Ensures the image covers the entire div
            backgroundPosition: "center", // Centers the image within the div
            backgroundRepeat: "no-repeat", // Prevents the image from repeating
            // Keeps the rounded corners
          }}
          className="col-md-4 d-flex flex-column align-items-center text-center bg-light py-5"
        >
          <h5>Clearance Sale</h5>
          <h2 className="fw-bold">Up To 50% Off</h2>
          <Link href="/shop" className="btn btn-outline-dark mt-3">
            Shop Now
          </Link>
        </div>

        {/* Middle Section */}
        <div
          style={{
            minHeight: "527px",
            backgroundImage:
              "url(https://i.pinimg.com/736x/d2/a2/99/d2a299c9abae1864af15b6f97128d2b4.jpg)",
            backgroundSize: "cover", // Ensures the image covers the entire div
            backgroundPosition: "center", // Centers the image within the div
            backgroundRepeat: "no-repeat", // Prevents the image from repeating
            // Keeps the rounded corners
          }}
          className="col-md-4 d-flex flex-column align-items-center justify-content-center bg-info text-center py-5"
        >
          <h5>New Arrivals</h5>
          <h2 className="fw-bold">Handmade Special Gifts</h2>
          <p>From $29.90</p>
          <Link href="/shop" className="btn btn-dark mt-3">
            Send Gift
          </Link>
        </div>

        {/* Right Section */}
        <div
          style={{
            minHeight: "527px",
            backgroundImage:
              "url(https://i.pinimg.com/736x/a9/cd/1d/a9cd1dd0eb53c32b9d43a07e63464dcb.jpg)",
            backgroundSize: "cover", // Ensures the image covers the entire div
            backgroundPosition: "center", // Centers the image within the div
            backgroundRepeat: "no-repeat", // Prevents the image from repeating
            // Keeps the rounded corners
          }}
          className="col-md-4 d-flex flex-column align-items-center text-center bg-light py-5"
        >
          <h5>Best Offer</h5>
          <h2 className="fw-bold">Customize Gifts</h2>
          <Link href="/shop" className="btn btn-outline-dark mt-3">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GiftSection;
