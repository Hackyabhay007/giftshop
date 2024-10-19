import React, { useState, useRef, useEffect } from 'react';

const CustomDropdown = ({ options, label, onChange, register, name }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter(option =>
    
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (option) => {
    onChange(option);
    setSearchTerm(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="tp-checkout-input" ref={dropdownRef} style={styles.dropdownContainer}>
      <label>{label} {label !== "Village (Optional)" && <span>*</span>}</label>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder={`Search ${label}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          {...register(name)}
          style={styles.input}
        />
        <span style={styles.dropdownArrow} onClick={() => setIsOpen(!isOpen)}>▼</span>
      </div>
      {isOpen && (
        <ul className="dropdown-list" style={styles.dropdownList}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li 
                key={index} 
                onClick={() => handleOptionClick(option)} 
                style={styles.dropdownItem}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              >
                {option}
              </li>
            ))
          ) : (
            <li style={styles.dropdownItem}>No options available</li>
          )}
        </ul>
      )}
    </div>
  );
};

const styles = {
  dropdownContainer: {
    position: 'relative',
    width: '100%',
    marginBottom: '15px',
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
  },
  input: {
    width: '100%',
    padding: '10px',
    paddingRight: '30px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  dropdownArrow: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
  },
  dropdownList: {
    position: 'absolute',
    top: '100%',
    left: '0',
    right: '0',
    background: 'white',
    border: '1px solid #ccc',
    borderRadius: '4px',
    maxHeight: '200px',
    overflowY: 'auto',
    zIndex: 1000,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  dropdownItem: {
    padding: '10px',
    cursor: 'pointer',
  },
};

export default CustomDropdown;