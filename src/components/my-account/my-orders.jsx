import dayjs from "dayjs";
import Link from "next/link";
import React, { useState } from "react";

const MyOrders = ({ orderData }) => {
  const order_items = orderData?.orders;
  const [hoveredOrderId, setHoveredOrderId] = useState(null);

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
              <th scope="col" style={{ width: "100%" }}>Order Details</th>
            </tr>
          </thead>
          <tbody>
            {order_items?.data?.map((item) => (
              <tr key={item.id}>
                <td style={{ padding: "15px", borderBottom: "1px solid #ccc" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                    <div style={{ fontWeight: "bold", fontSize: "16px" }}>Order #{item.order_id}</div>
                    <span className={`status ${item.status}`} style={{ fontSize: "12px", color: item.status === "completed" ? "green" : "orange", padding: "3px 8px", borderRadius: "12px", backgroundColor: item.status === "completed" ? "rgba(0, 128, 0, 0.1)" : "rgba(255, 165, 0, 0.1)" }}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </div>
                  <div style={{ fontSize: "12px", color: "#666", marginBottom: "15px" }}>
                    {dayjs(item.created_at).format("MMMM D, YYYY")}
                  </div>
                  <div>
                    <Link
                      href={`/order/${item.order_id}`}
                      className="tp-logout-btn"
                      style={{
                        backgroundColor: hoveredOrderId === item.order_id ? "#990100" : "transparent",
                        color: hoveredOrderId === item.order_id ? "white" : "#990100",
                        border: "solid 1px #990100",
                        padding: "8px 16px",
                        transition: "all 0.2s ease",
                        display: "inline-block",
                        borderRadius: "5px",
                        fontSize: "14px",
                        textDecoration: "none",
                      }}
                      onMouseEnter={() => setHoveredOrderId(item.order_id)}
                      onMouseLeave={() => setHoveredOrderId(null)}
                    >
                      View Order
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