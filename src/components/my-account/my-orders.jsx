import dayjs from "dayjs";
import Link from "next/link";
import React, { useState } from "react";

const MyOrders = ({ orderData }) => {
  const order_items = orderData?.orders; // Accessing the correct data field
  const [hoveredOrderId, setHoveredOrderId] = useState(null); // Track hovered order

  return (
    <div className="profile__ticket" style={{ maxWidth: "800px", margin: "4px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", backgroundColor: "#f9f9f9" }}>
      {order_items?.data?.length === 0 ? (
        <div
          style={{ height: "210px" }}
          className="d-flex align-items-center justify-content-center"
        >
          <div className="text-center">
            <i
              style={{ fontSize: "40px" }}
              className="fa-solid fa-cart-circle-xmark"
            ></i>
            <p style={{ fontSize: "18px", marginTop: "10px" }}>You have no orders yet!</p>
          </div>
        </div>
      ) : (
        <table className="table" style={{ width: "100%", tableLayout: "fixed", fontSize: "14px" }}>
          <thead>
            <tr>
              <th scope="col">Order Details</th>
              <th scope="col" style={{ display: "none" }}>Order Time</th>
              <th scope="col" style={{ display: "none" }}>Status</th>
              <th scope="col" style={{ display: "none" }}>View</th>
            </tr>
          </thead>
          <tbody>
            {order_items?.data?.map((item) => (
              <tr key={item.id}>
                <td colSpan="4" style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
                  <div style={{ fontWeight: "bold", fontSize: "16px" }}>Order #{item.order_id}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
                    <span style={{ fontSize: "12px", color: "#666" }}>{dayjs(item.created_at).format("MMMM D, YYYY")}</span>
                    <span className={`status ${item.status}`} style={{ fontSize: "12px", color: item.status === "completed" ? "green" : "orange" }}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <Link
                      href={`/order/${item.order_id}`}
                      className="tp-logout-btn"
                      style={{
                        backgroundColor: hoveredOrderId === item.order_id ? "#990100" : "transparent",
                        color: hoveredOrderId === item.order_id ? "white" : "black",
                        border: "solid 1px #990100",
                        padding: "8px 12px", // Adjust padding for better appearance
                        transition: "background-color 0.2s ease, color 0.2s ease", // Smooth transition
                        display: "inline-block", // Make it behave like a button
                        borderRadius: "5px", // Rounded corners for the button
                        fontSize: "14px", // Font size for better readability
                      }}
                      onMouseEnter={() => setHoveredOrderId(item.order_id)}
                      onMouseLeave={() => setHoveredOrderId(null)}
                    >
                      View
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyOrders;