import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
const Promotions = () => {
  return (
    <div className="container my-5">
      <div className="row text-center">
        {/* Card 1 */}
        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm">
            <div
              className="card-body"
              style={{
                paddingLeft: "60px",
                paddingTop: "45px",
                minHeight: "227px",
                backgroundImage:
                  "url(https://i.pinimg.com/736x/6e/40/52/6e40521a2a25ed26760a6d8c7bb6cbc0.jpg)",
                backgroundSize: "cover", // Ensures the image covers the entire div
                backgroundPosition: "center", // Centers the image within the div
                backgroundRepeat: "no-repeat", // Prevents the image from repeating
                borderRadius: "10px", // Keeps the rounded corners
              }}
            >
              <h5 className="card-title">Get Your</h5>
              <h3 className="font-weight-bold">Free Gifts</h3>
              <Link
                href="/shop"
                className="text-decoration-none"
                style={{
                  borderStyle: "dashed",
                  border: "none",
                  padding: "10px",
                  borderBottom: "dashed",
                }}
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm">
            <div
              className="card-body "
              style={{
                paddingLeft: "60px",
                paddingTop: "45px",
                minHeight: "227px",
                backgroundImage:
                  "url(https://i.pinimg.com/736x/3f/61/a4/3f61a46ab2f437880a756f1ce5dd4d99.jpg)",
                backgroundSize: "cover", // Ensures the image covers the entire div
                backgroundPosition: "center", // Centers the image within the div
                backgroundRepeat: "no-repeat", // Prevents the image from repeating
                borderRadius: "10px", // Keeps the rounded corners
              }}
            >
              <h5 className="card-title">Don't Miss!</h5>
              <h3 className="font-weight-bold">Save $29</h3>
              <p className="mb-3">Next Purchase</p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm">
            <div
              className="card-body "
              style={{
                paddingTop: "75px",
                minHeight: "227px",
                backgroundImage:
                  "url(https://i.pinimg.com/736x/58/89/cb/5889cbbfc85af2995e6bf6338529f685.jpg)",
                backgroundSize: "cover", // Ensures the image covers the entire div
                backgroundPosition: "center", // Centers the image within the div
                backgroundRepeat: "no-repeat", // Prevents the image from repeating
                borderRadius: "10px", // Keeps the rounded corners
              }}
            >
              <h5 className="card-title">Only This Week</h5>
              <h3 className="font-weight-bold">Giveaway Gifts</h3>
              <Link
                href="/shop"
                className="text-decoration-none"
                style={{
                  borderStyle: "dashed",
                  border: "none",
                  padding: "10px",
                  borderBottom: "dashed",
                }}
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotions;
