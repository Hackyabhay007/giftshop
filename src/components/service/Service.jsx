import React from "react";
import Image from "next/image";

function Service() {
  return (
    <div style={styles.serviceContainer}>
      {/* Main Container */}
      <div style={styles.container}>
        {/* Grid for Desktop (3 Columns) */}
        <div style={styles.grid}>
          {/* Service 1 */}
          <div style={{ ...styles.serviceItem, borderRight: "4px dotted #D3D3D3" }}>
            <div style={styles.serviceIcon}>
              <div style={{ ...styles.iconBox, backgroundColor: "#f0f0f0" }}>
                <Image
                  src="/assets/img/service/service1.svg"
                  alt="Service 1"
                  width={48}
                  height={48}
                  style={styles.image}
                />
              </div>
            </div>
            <h3 style={styles.title}>Delivering quality gifts</h3>
            <p style={styles.subtext}>We are Known for Our Quality & Services</p>
          </div>

          {/* Service 2 */}
          <div style={{ ...styles.serviceItem, borderRight: "4px dotted #D3D3D3" }}>
            <div style={styles.serviceIcon}>
              <div
                style={{
                  ...styles.iconBox,
                  backgroundColor: "#fef3c7",
                 
                  borderRadius: "24px 51px 34px 21px",
                }}
              >
                <Image
                  src="/assets/img/service/service2.svg"
                  alt="Service 2"
                  width={48}
                  height={48}
                  style={styles.image}
                />
              </div>
            </div>
            <h3 style={styles.title}>Gifts for all occasions</h3>
            <p style={styles.subtext}>Checkout Our Variety of gifts for every occasion</p>
          </div>

          {/* Service 3 */}
          <div style={styles.serviceItem}>
            <div style={styles.serviceIcon}>
              <div style={{ ...styles.iconBox, backgroundColor: "#e3f2fd" }}>
                <Image
                  src="/assets/img/service/service3.svg"
                  alt="Service 3"
                  width={48}
                  height={48}
                  style={styles.image}
                />
              </div>
            </div>
            <h3 style={styles.title}>Great customer service</h3>
            <p style={styles.subtext}>Always Ready to help our Customers</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  serviceContainer: {
    backgroundColor: "#ffffff",
    borderTop: "4px dotted #D3D3D3",
    borderBottom: "4px dotted #D3D3D3",
    padding: "40px 20px",
    textAlign: "center",
    margin:'50px 0px',
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    padding: "20px 0",
  },
  serviceItem: {
    padding: "20px",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  serviceIcon: {
    marginBottom: "10px",
  },
  iconBox: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 10px",
  },
  image: {
    transition: "transform 0.3s ease",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  subtext: {
    fontSize: "14px",
    color: "gray",
  },
};

// Hover Effect (Only works inside JSX)
if (typeof window !== "undefined") {
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".service-item").forEach((item) => {
      item.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-5px)";
        this.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
      });
      item.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
        this.style.boxShadow = "none";
      });
    });
  });
}

export default Service;
