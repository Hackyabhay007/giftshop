import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useSearchProductsQuery } from "@/redux/api/apiSlice";
import searchIcon from "public/assets/img/search/search.svg";
import Link from "next/link";

// Debounce utility
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const LoadingSpinner = () => (
  <div className="search-loader">
    <div className="search-spinner" />
    <style jsx>{`
      .search-loader {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
      }
      .search-spinner {
        width: 30px;
        height: 30px;
        border: 2px solid #f3f3f3;
        border-top: 2px solid #A85E72;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

const SearchOverlay = ({ isOpen, onClose, children }) => (
  <div className={`search-overlay ${isOpen ? 'active' : ''}`}>
    <div className="search-overlay-header">
      <button className="search-close-btn" onClick={onClose}>✖</button>
    </div>
    <div className="search-overlay-content">
      {children}
    </div>
    <style jsx>{`
      .search-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.98);
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
      }
      .search-overlay.active {
        opacity: 1;
        visibility: visible;
      }
      .search-overlay-header {
        position: fixed;
        top: 20px;
        right: 20px;
      }
      .search-close-btn {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        padding: 10px;
        color: #333;
      }
      .search-overlay-content {
        max-width: 800px;
        margin: 80px auto 0;
        padding: 0 20px;
      }
    `}</style>
  </div>
);

const SearchResults = ({ data, isLoading, error, query }) => {
  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="search-error">Error fetching results</p>;
  if (!data?.length && query.length >= 3) {
    return <p className="search-no-results">No products found</p>;
  }
  
  return (
    <div className="search-results-container">
      {data?.map((product) => (
        <Link 
          href={`/product-details/${product.id}`} 
          key={product.id}
          className="search-result-item"
        >
          <div className="search-result-image">
            <img src={product.images?.[0]} alt={product.name} />
          </div>
          <div className="search-result-info">
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
          </div>
        </Link>
      ))}
      <style jsx>{`
        .search-results-container {
          margin-top: 20px;
        }
        .search-result-item {
          display: flex;
          align-items: center;
          padding: 15px;
          border-bottom: 1px solid #eee;
          transition: background 0.2s ease;
        }
        .search-result-item:hover {
          background: #f9f9f9;
        }
        .search-result-image img {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 8px;
        }
        .search-result-info {
          margin-left: 15px;
        }
        .search-result-info h3 {
          font-size: 16px;
          margin: 0 0 5px 0;
          color: #333;
        }
        .search-result-info p {
          font-size: 14px;
          color: #A85E72;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  
  const debouncedSearch = useCallback(
    debounce((value) => setSearchTerm(value), 400),
    []
  );

  const { data, error, isLoading } = useSearchProductsQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="search-wrapper">
      <button 
        className="search-trigger"
        onClick={() => setIsOpen(true)}
      >
        <Image src={searchIcon} alt="Search" width={20} height={20} />
      </button>

      <SearchOverlay isOpen={isOpen} onClose={handleClose}>
        <div className="search-input-wrapper">
          <Image src={searchIcon} alt="" width={20} height={20} />
          <input
            type="text"
            placeholder="Search for products..."
            onChange={(e) => debouncedSearch(e.target.value)}
            autoFocus
          />
        </div>
        <SearchResults 
          data={data} 
          isLoading={isLoading} 
          error={error}
          query={searchTerm}
        />
      </SearchOverlay>

      <style jsx>{`
        .search-wrapper {
          position: relative;
        }
        .search-trigger {
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
        }
        .search-input-wrapper {
          display: flex;
          align-items: center;
          background: #f5f5f5;
          padding: 15px 20px;
          border-radius: 12px;
          margin-bottom: 20px;
        }
        .search-input-wrapper input {
          border: none;
          background: none;
          font-size: 16px;
          padding: 0 15px;
          width: 100%;
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default SearchBar;
