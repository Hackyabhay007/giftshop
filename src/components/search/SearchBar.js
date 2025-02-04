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
        height: 100vh;
        background: rgba(255, 255, 255, 0.98);
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        overflow: hidden;
      }
      .search-overlay.active {
        opacity: 1;
        visibility: visible;
      }
      .search-overlay-header {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1001;
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
        max-width: 1200px;
        margin: 0 auto;
        padding: 80px 20px 20px;
        height: 100vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
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
    <div className="search-results-wrapper">
      <div className="search-results-grid">
        {data?.map((product) => (
          <Link 
            href={`/product-details/${product.product_id}`} 
            key={product.id}
            className="search-result-card"
          >
            <div className="card-image">
              <img src={product.images?.[0]} alt={product.name} />
            </div>
            <div className="card-content">
              <h3>{product.name}</h3>
              <p className="price">₹{product.price}</p>
              {product.description && (
                <p className="description">{product.description.slice(0, 60)}...</p>
              )}
            </div>
          </Link>
        ))}
      </div>
      <style jsx>{`
        .search-results-wrapper {
          flex: 1;
          overflow: hidden;
          padding: 20px 0;
        }
        .search-results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          height: calc(100vh - 180px);
          overflow-y: auto;
          padding: 10px;
          scroll-behavior: smooth;
        }
        .search-result-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex;
          flex-direction: column;
          text-decoration: none;
        }
        .search-result-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.12);
        }
        .card-image {
          aspect-ratio: 1;
          overflow: hidden;
        }
        .card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }
        .search-result-card:hover .card-image img {
          transform: scale(1.05);
        }
        .card-content {
          padding: 15px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .card-content h3 {
          font-size: 16px;
          color: #333;
          margin: 0;
          line-height: 1.4;
        }
        .price {
          font-size: 18px;
          color: #A85E72;
          font-weight: 600;
          margin: 0;
        }
        .description {
          font-size: 14px;
          color: #666;
          margin: 0;
          line-height: 1.4;
        }
        
        /* Custom Scrollbar */
        .search-results-grid::-webkit-scrollbar {
          width: 8px;
        }
        .search-results-grid::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .search-results-grid::-webkit-scrollbar-thumb {
          background: #A85E72;
          border-radius: 4px;
        }
        .search-results-grid::-webkit-scrollbar-thumb:hover {
          background: #8e4e60;
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
