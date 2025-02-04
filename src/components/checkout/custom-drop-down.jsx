import React, { useState, useRef, useEffect } from "react";

const CustomDropdown = ({
  options = [],
  label,
  onChange,
  name,
  value,
  error,
  disabled,
  allowOther = true, // New prop to control Other option
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setSearchTerm(value || "");
    setIsOtherSelected(!options.includes(value) && value !== "");
  }, [value, options]);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOptionClick = (option) => {
    if (option === "Other") {
      setIsOtherSelected(true);
      setSearchTerm("");
    } else {
      setIsOtherSelected(false);
      setSearchTerm(option);
      onChange(option);
    }
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (isOtherSelected) {
      onChange(value);
    }
  };

  const handleClearSelection = () => {
    setSearchTerm("");
    setIsOtherSelected(false);
    onChange("");
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="tp-checkout-input"
      ref={dropdownRef}
      style={styles.dropdownContainer}
    >
      <label htmlFor={`billing_${name}`}>
        {label} {label !== "Village (Optional)" && <span>*</span>}
      </label>
      <div style={styles.inputContainer}>
        <input
          type="text"
          id={`billing_${name}`}
          placeholder={isOtherSelected ? `Enter ${label}` : `Search ${label}`}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => !isOtherSelected && setIsOpen(true)}
          disabled={disabled}
          autoComplete={`billing ${name}`}
          style={styles.input}
        />
        {searchTerm && (
          <span style={styles.clearButton} onClick={handleClearSelection}>
            ×
          </span>
        )}
        {!isOtherSelected && (
          <span style={styles.dropdownArrow} onClick={() => setIsOpen(!isOpen)}>
            ▼
          </span>
        )}
      </div>
      {isOpen && !isOtherSelected && (
        <ul className="dropdown-list" style={styles.dropdownList}>
          {filteredOptions.length > 0 && (
            <>
              {filteredOptions.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  style={styles.dropdownItem}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#f0f0f0")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "white")
                  }
                >
                  {option}
                </li>
              ))}
              {allowOther && (
                <li
                  onClick={() => handleOptionClick("Other")}
                  style={styles.dropdownItem}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#f0f0f0")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "white")
                  }
                >
                  Other
                </li>
              )}
            </>
          )}
          {filteredOptions.length === 0 && allowOther && (
            <li
              onClick={() => handleOptionClick("Other")}
              style={styles.dropdownItem}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "#f0f0f0")
              }
              onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
            >
              Other
            </li>
          )}
        </ul>
      )}
      {error && <p style={styles.errorText}>{error}</p>}
    </div>
  );
};

const styles = {
  dropdownContainer: {
    position: "relative",
    width: "100%",
    marginBottom: "15px",
  },
  inputContainer: {
    position: "relative",
    width: "100%",
  },
  input: {
    width: "100%",
    padding: "10px",
    paddingRight: "30px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
  },
  clearButton: {
    position: "absolute",
    right: "30px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    fontWeight: "bold",
  },
  dropdownArrow: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
  },
  dropdownList: {
    position: "absolute",
    top: "100%",
    left: "0",
    right: "0",
    background: "white",
    border: "1px solid #ccc",
    borderRadius: "4px",
    maxHeight: "200px",
    overflowY: "auto",
    zIndex: 1000,
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  dropdownItem: {
    padding: "10px",
    cursor: "pointer",
  },
  errorText: {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  },
};

export default CustomDropdown;
