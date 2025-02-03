import React from "react";

const SearchResults = ({ data, isLoading, error, query, onClose }) => {
  return (
    <div className="search-results-overlay">
      <div className="search-results-container">
        {/* Loading State */}
        {isLoading && <p className="loading">Loading...</p>}

        {/* Error State */}
        {error && <p className="error">Error fetching products</p>}

        {/* No Results */}
        {!isLoading && !error && query.length >= 3 && data?.length === 0 && (
          <p className="no-results">No products found</p>
        )}

        {/* Search Results */}
        {data?.length > 0 && (
          <ul className="search-results-list">
            {data.map((product) => (
              <li key={product.id} className="search-item">
                <img src={product.images[0]} alt={product.name} />
                <div>
                  <p className="product-name">{product.name}</p>
                  <p className="product-price">₹{product.price}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 🔥 CSS (Styled Inside Component) */}
      <style jsx>{`
        .search-results-overlay {
          position: fixed;
          top: 0%;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.98);
          z-index: 1000;
          padding: 20px;
          box-sizing: border-box;
        }

        .search-results-container {
          max-width: 800px;
          margin: 0 auto;
        }

        .loading,
        .error,
        .no-results {
          font-size: 16px;
          color: gray;
          text-align: center;
          margin-top: 20px;
        }

        .search-results-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .search-item {
          display: flex;
          align-items: center;
          padding: 10px;
          border-bottom: 1px solid #ddd;
          cursor: pointer;
        }

        .search-item img {
          width: 50px;
          height: 50px;
          object-fit: cover;
          margin-right: 15px;
          border-radius: 5px;
        }

        .product-name {
          font-size: 16px;
          font-weight: bold;
        }

        .product-price {
          font-size: 14px;
          color: green;
        }
      `}</style>
    </div>
  );
};

export default SearchResults;