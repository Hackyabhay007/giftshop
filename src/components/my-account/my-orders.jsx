import dayjs from "dayjs";
import Link from "next/link";
import React, { useState } from "react";

const MyOrders = ({ orderData, currentPage, setCurrentPage }) => {
  const [hoveredOrderId, setHoveredOrderId] = useState(null);
  const orders = orderData?.orders;
  const {
    current_page,
    last_page,
    data,
    total
  } = orders || {};

  // Sort data by date (latest first)
  const sortedData = data ? [...data].sort((a, b) => 
    new Date(b.created_at) - new Date(a.created_at)
  ) : [];

  // Function to get status style
  const getStatusStyle = (status) => {
    switch (status) {
      case 'completed':
        return { color: 'green', bg: 'rgba(0, 128, 0, 0.1)' };
      case 'canceled':
        return { color: 'red', bg: 'rgba(255, 0, 0, 0.1)' };
      case 'pending':
        return { color: 'orange', bg: 'rgba(255, 165, 0, 0.1)' };
      default:
        return { color: 'gray', bg: 'rgba(128, 128, 128, 0.1)' };
    }
  };

  // Function to format date and time
  const formatDateTime = (dateString) => {
    return dayjs(dateString).format("MMMM D, YYYY [at] h:mm A");
  };

  const paginationStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    marginTop: '20px',
  };

  const pageButtonStyle = (isActive = false) => ({
    padding: '8px 16px',
    border: '1px solid #990100',
    backgroundColor: isActive ? '#990100' : 'transparent',
    color: isActive ? 'white' : '#990100',
    cursor: isActive ? 'default' : 'pointer',
    borderRadius: '5px',
    transition: 'all 0.2s ease',
    opacity: isActive ? 1 : 0.8,
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="profile__ticket" style={{ maxWidth: "800px", margin: "4px auto", padding: "2px", border: "1px solid #ccc", borderRadius: "8px",  backgroundColor: "#f9f9f9" }}>
      {!sortedData?.length ? (
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
        <>
          <table className="table" style={{ width: "100%", tableLayout: "fixed", fontSize: "14px" }}>
            <thead>
              <tr>
                <th scope="col" style={{ width: "100%", padding: "15px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>Order Details</span>
                    <span style={{ fontSize: "12px", color: "#666" }}>Sorted by Latest Date</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item) => {
                const statusStyle = getStatusStyle(item.status);
                return (
                  <tr key={item.id}>
                    <td style={{ padding: "15px", borderBottom: "2px solid #ccc", borderStyle:"dashed" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                        <div>
                          <div style={{ fontWeight: "bold", fontSize: "16px" }}>Order #{item.order_id}</div>
                          <div style={{ fontSize: "14px", color: "#666", marginTop: "4px" }}>
                            {item.products.map(prod => `${prod.name} (Qty: ${prod.quantity})`).join(", ")}
                          </div>
                        </div>
                        <span 
                          className={`status ${item.status}`} 
                          style={{ 
                            fontSize: "12px", 
                            color: statusStyle.color, 
                            padding: "3px 8px", 
                            borderRadius: "12px", 
                            backgroundColor: statusStyle.bg,
                            whiteSpace: "nowrap"
                          }}
                        >
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </span>
                      </div>
                      <div style={{ fontSize: "12px", color: "#666", marginBottom: "15px" }}>
                        <div>{formatDateTime(item.created_at)}</div>
                        <div style={{ marginTop: "4px" }}>Total Amount: ₹{parseFloat(item.price).toLocaleString()}</div>
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
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          {last_page > 1 && (
            <div style={paginationStyle}>
              <button
                onClick={() => handlePageChange(current_page - 1)}
                disabled={current_page === 1}
                style={pageButtonStyle(false)}
              >
                Previous
              </button>

              {[...Array(last_page)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  style={pageButtonStyle(current_page === index + 1)}
                  disabled={current_page === index + 1}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(current_page + 1)}
                disabled={current_page === last_page}
                style={pageButtonStyle(false)}
              >
                Next
              </button>
            </div>
          )}
          
          {/* Orders count */}
          <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px', color: '#666' }}>
            Showing {((current_page - 1) * 10) + 1} to {Math.min(current_page * 10, total)} of {total} orders
          </div>
        </>
      )}
    </div>
  );
};

export default MyOrders;