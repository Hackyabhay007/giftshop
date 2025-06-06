import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useSearchProductsQuery } from "@/redux/api/apiSlice";
import searchIcon from "public/assets/img/search/search.svg";
import Link from "next/link";
import { useIsMobile } from "@/utils/isMobileUtil";

// Updated debounce utility with cancel function
const debounce = (func, wait) => {
  let timeout;
  const debouncedFn = (...args) => {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
  debouncedFn.cancel = () => clearTimeout(timeout);
  return debouncedFn;
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

const NoResults = () => (
  <div className="no-results">
    <div className="no-results-content">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
      <h3>No Products Found</h3>
      <p>We couldn't find any products matching your search.</p>
    </div>
    <style jsx>{`
      .no-results {
        text-align: center;
        padding: 40px 20px;
        color: #666;
      }
      .no-results-content {
        max-width: 300px;
        margin: 0 auto;
      }
      .no-results svg {
        color: #A85E72;
        opacity: 0.5;
        margin-bottom: 20px;
      }
      .no-results h3 {
        font-size: 18px;
        margin-bottom: 10px;
        color: #333;
      }
      .no-results p {
        font-size: 14px;
        line-height: 1.5;
      }
    `}</style>
  </div>
);

const SearchResults = ({ data, isLoading, error, query }) => {
  if (isLoading) return <LoadingSpinner />;
  if (error) return <p className="search-error">Error fetching results</p>;
  
  // Show initial message for short queries
  if (query.length > 0 && query.length < 3) {
    return (
      <div className="initial-search">
        <p>Please enter at least 3 characters to search products</p>
        <style jsx>{`
          .initial-search {
            text-align: center;
            padding: 40px 20px;
            color: #666;
          }
        `}</style>
      </div>
    );
  }
  
  // Show no results message only if query is valid
  if (!data?.length && query.length >= 3) {
    return <NoResults />;
  }
  
  // Show empty state if no query
  if (!query) {
    return (
      <div className="empty-search">
        <p>Start typing to search products...</p>
        <style jsx>{`
          .empty-search {
            text-align: center;
            padding: 40px 20px;
            color: #666;
          }
        `}</style>
      </div>
    );
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

const SearchBar = ({ iconOnly = false }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  // Update debounced term after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, error, isLoading } = useSearchProductsQuery(debouncedTerm, {
    skip: debouncedTerm.length < 3,
  });

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm("");
    setDebouncedTerm("");
  };

  return (
    <div className="position-relative">
      <button 
        className={`btn d-flex align-items-center ${iconOnly ? 'p-2 rounded-circle' : 'px-3 py-2 rounded-pill'}`}
        onClick={() => setIsOpen(true)}
        style={{
          background: iconOnly ? 'rgba(168, 94, 114, 0.08)' : '#f8f8f8',
          minWidth: iconOnly ? '40px' : '180px',
          height: '40px'
        }}
      >
        <Image src={searchIcon} alt="Search" width={22} height={22} />
        {!iconOnly && (
          <span className="ms-2 d-none d-lg-block text-body-secondary">
            Search products
          </span>
        )}
      </button>

      <SearchOverlay isOpen={isOpen} onClose={handleClose}>
        <div className="search-input-wrapper">
          <Image src={searchIcon} alt="" width={20} height={20} />
          <input
            type="text"
            placeholder="Start typing to search..."
            value={searchTerm}
            onChange={handleSearchInput}
            autoFocus
          />
        </div>
        <SearchResults 
          data={data} 
          isLoading={isLoading} 
          error={error}
          query={searchTerm}  // Changed from debouncedTerm to searchTerm
        />
      </SearchOverlay>

      <style jsx>{`
        .search-wrapper {
          position: relative;
        }

        .search-button {
          display: flex;
          align-items: center;
          gap: 10px;
          height: 40px;
          padding: ${iconOnly ? '0' : '0 16px'};
          min-width: ${iconOnly ? '40px' : '180px'};
          border: none;
          border-radius: ${iconOnly ? '50%' : '20px'};
          background: ${iconOnly ? 'rgba(168, 94, 114, 0.08)' : '#f8f8f8'};
          color: #666;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .search-button:hover {
          background: ${iconOnly ? 'rgba(168, 94, 114, 0.12)' : '#f2f2f2'};
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }

        @media (max-width: 991px) {
          .search-button {
            min-width: 40px;
            padding: 0;
            border-radius: 50%;
            justify-content: center;
          }
          .search-button span {
            display: none;
          }
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
