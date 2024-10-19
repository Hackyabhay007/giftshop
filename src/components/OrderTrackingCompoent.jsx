import React from "react";
import { useTrackOrderQuery } from "@/redux/features/order/orderApi";

const OrderTrackingComponent = ({ orderId }) => {
  const { data, error, isLoading } = useTrackOrderQuery({ orderId });

  // Styles
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '20px auto',
      padding: '20px',
      backgroundColor: '#FFF0F0',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    header: {
      fontSize: '24px',
      color: '#8B0000',
      marginBottom: '20px',
      textAlign: 'center',
    },
    section: {
      backgroundColor: '#FFFFFF',
      padding: '15px',
      marginBottom: '15px',
      borderRadius: '4px',
      boxShadow: '0 1px 3px rgba(139,0,0,0.1)',
      border: '1px solid #FFCCCB',
    },
    label: {
      fontWeight: 'bold',
      color: '#8B0000',
      marginRight: '10px',
    },
    value: {
      color: '#333',
    },
    error: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      textAlign: 'center',
      padding: '10px',
      backgroundColor: '#FF0000',
      borderRadius: '4px',
    },
    timeline: {
      borderLeft: '2px solid #8B0000',
      paddingLeft: '20px',
      marginLeft: '10px',
    },
    timelineItem: {
      marginBottom: '15px',
      position: 'relative',
    },
    timelineDot: {
      width: '12px',
      height: '12px',
      backgroundColor: '#8B0000',
      borderRadius: '50%',
      position: 'absolute',
      left: '-26px',
      top: '5px',
    },
    loadingSpinner: {
      textAlign: 'center',
      color: '#8B0000',
      fontSize: '18px',
    },
  };

  if (isLoading) {
    return <div style={styles.loadingSpinner}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.error}>Error: {error.message}</div>;
  }

  if (!data || !data.tracking_info || data.tracking_info.length === 0) {
    return <div style={styles.error}>No tracking information available.</div>;
  }

  // Function to safely get tracking data
  const getTrackingData = (data) => {
    if (Array.isArray(data.tracking_info)) {
      // Handle the case when no data is available
      if (data.tracking_info[0] && typeof data.tracking_info[0] === 'object') {
        const firstKey = Object.keys(data.tracking_info[0])[0];
        return data.tracking_info[0][firstKey]?.tracking_data;
      }
    } else if (data.tracking_info && data.tracking_info.tracking_data) {
      // Handle the case when real data comes
      return data.tracking_info.tracking_data;
    }
    return null;
  };

  const trackingData = getTrackingData(data);

  if (!trackingData) {
    return <div style={styles.error}>Unable to retrieve tracking data.</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Order Tracking Information</h2>

      {trackingData.error ? (
        <div style={styles.error}>{trackingData.error}</div>
      ) : (
        <>
          <div style={styles.section}>
            <p>
              <span style={styles.label}>Order ID:</span>
              <span style={styles.value}>{orderId}</span>
            </p>
            <p>
              <span style={styles.label}>Current Status:</span>
              <span style={styles.value}>{trackingData.shipment_track[0]?.current_status || "N/A"}</span>
            </p>
          </div>

          {trackingData.shipment_track[0]?.courier_name && (
            <div style={styles.section}>
              <p>
                <span style={styles.label}>Courier:</span>
                <span style={styles.value}>{trackingData.shipment_track[0].courier_name}</span>
              </p>
            </div>
          )}

          {trackingData.shipment_track[0]?.awb_code && (
            <div style={styles.section}>
              <p>
                <span style={styles.label}>AWB Code:</span>
                <span style={styles.value}>{trackingData.shipment_track[0].awb_code}</span>
              </p>
            </div>
          )}

          {trackingData.shipment_track[0]?.edd && (
            <div style={styles.section}>
              <p>
                <span style={styles.label}>Expected Delivery Date:</span>
                <span style={styles.value}>{new Date(trackingData.shipment_track[0].edd).toLocaleString()}</span>
              </p>
            </div>
          )}
{/* 
          {trackingData.track_url && (
            <div style={styles.section}>
              <p>
                <span style={styles.label}>Tracking URL:</span>
                <a href={trackingData.track_url} target="_blank" rel="noopener noreferrer" style={{...styles.value, color: '#8B0000'}}>
                  Click here to track your order
                </a>
              </p>
            </div>
          )} */}

          {trackingData.shipment_track_activities && trackingData.shipment_track_activities.length > 0 && (
            <div style={styles.section}>
              <p style={styles.label}>Tracking Timeline:</p>
              <div style={styles.timeline}>
                {trackingData.shipment_track_activities.map((activity, index) => (
                  <div key={index} style={styles.timelineItem}>
                    <div style={styles.timelineDot}></div>
                    <p style={styles.value}>
                      <strong>{new Date(activity.date).toLocaleString()}</strong>
                    </p>
                    <p style={styles.value}>{activity.activity}</p>
                    <p style={styles.value}>{activity.location}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrderTrackingComponent;