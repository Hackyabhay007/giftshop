import React from 'react';

const FormErrorDisplay = ({ errors }) => {
  if (!errors || Object.keys(errors).length === 0) {
    return null;
  }

  return (
    <div className="error-container" style={styles.container}>
      <h3 style={styles.heading}>Please correct the following errors:</h3>
      <ul style={styles.list}>
        {Object.entries(errors).map(([field, messages]) => (
          <li key={field} style={styles.listItem}>
            <strong>{field.replace('_', ' ')}:</strong> {messages.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#ffebee',
    border: '1px solid #ef9a9a',
    borderRadius: '4px',
    padding: '15px',
    marginBottom: '20px',
  },
  heading: {
    color: '#c62828',
    fontSize: '18px',
    marginTop: 0,
    marginBottom: '10px',
  },
  list: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  listItem: {
    color: '#b71c1c',
    marginBottom: '5px',
  },
};

export default FormErrorDisplay;