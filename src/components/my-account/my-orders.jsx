import dayjs from "dayjs";
import Link from "next/link";
import React from "react";

const MyOrders = ({ orderData }) => {
  const order_items = orderData?.orders; // Accessing the correct data field


  return (
    <div className="profile__ticket table-responsive">
      {!order_items || order_items.length === 0 ? (
        <div
          style={{ height: "210px" }}
          className="d-flex align-items-center justify-content-center"
        >
          <div className="text-center">
            <i
              style={{ fontSize: "30px" }}
              className="fa-solid fa-cart-circle-xmark"
            ></i>
            <p>You Have no orders yet!</p>
          </div>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Order Id</th>
              <th scope="col">Order Time</th>
              <th scope="col">Status</th>
              <th scope="col">View</th>
            </tr>
          </thead>
          <tbody>
            {order_items?.data.map((item) => (
              <tr key={item.id}>
                <th scope="row">#{item.order_id}</th>
                <td data-info="title">
                  {dayjs(item.created_at).format("MMMM D, YYYY")} {/* Accessing created_at */}
                </td>
                <td
                  data-info={`status ${item.status === "pending" ? "pending" : ""} ${item.status === "processing" ? "hold" : ""} ${item.status === "delivered" ? "done" : ""}`} // Adjusting status checks
                  className={`status ${item.status === "pending" ? "pending" : ""} ${item.status === "processing" ? "hold" : ""} ${item.status === "delivered" ? "done" : ""}`}
                >
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)} {/* Capitalizing the first letter */}
                </td>
                <td>
                  <Link href={`/order/${item.order_id}`} className="tp-logout-btn"> {/* Using order_id */}
                    Invoice
                  </Link>
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
