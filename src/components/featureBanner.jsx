import React from "react";
import { FaGift, FaThumbsUp, FaRegSmile } from "react-icons/fa";

const Features = () => {
  return (
    <div
      className="container my-5  p-5"
      style={{
        borderStyle: "dotted",
        borderLeft: "none",
        borderRight: "none",
        borderWidth: "2px",
        minWidth: "95vw",
      }}
    >
      <div className="row text-center">
        {/* Feature 1 */}
        <div className="col-md-4">
          <div className="p-4" style={{ borderRight: "dotted" }}>
            <div className="mb-3">
              <FaGift size={50} className="text-primary" />
            </div>
            <h5 className="fw-bold">Delivering quality gifts</h5>
            <p className="text-muted">Information on its origins</p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="col-md-4">
          <div className="p-4 " style={{ borderRight: "dotted" }}>
            <div className="mb-3">
              <FaThumbsUp size={50} className="text-warning" />
            </div>
            <h5 className="fw-bold">Gifts for all occasions</h5>
            <p className="text-muted">Variants and technical</p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="col-md-4">
          <div className="p-4 ">
            <div className="mb-3 ">
              <FaRegSmile size={50} className="text-danger" />
            </div>
            <h5 className="fw-bold">Great customer service</h5>
            <p className="text-muted">customer is our main priority</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
