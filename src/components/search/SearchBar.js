import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchProductsQuery } from "@/redux/api/apiSlice";
import searchIcon from "public/assets/img/search/search.svg"; // Import the SVG search icon
import Link from "next/link";
const SearchResults = ({ data, query, onClose }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Detect Mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="popup-results">
      <button className="close-btn" onClick={onClose}>
        ✖
      </button>
      {data?.length > 0 ?(
        <ul className="search-results">
          {data.map((product) => (
            <li key={product.id} className="search-item">
              {/* Wrap product in Link */}
              <Link href={`/product-details/${product.id}`} passHref>
               
                  <img src={product.images?.[0]} alt={product.name} />
                  <div>
                    <p className="product-name">{product.name}</p>
                    <p className="product-price">₹{product.price}</p>
                  </div>
                
              </Link>
            </li>
          ))}
        </ul>
      ): (
        query.length >= 3 && <p className="no-results">No products found</p>
      )}
      <style jsx>{`
        .popup-results {
          position: fixed;
          top: ${isMobile ? "10%" : "39%"};
          left: ${isMobile ? "0%" : "15%"};
          right: 10%;
          width: ${isMobile ? "100%" : "100%"};
          max-width: 1000px;
          background: white;
          z-index: 999;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          padding: 20px;
          overflow-y: auto;
          max-height:${isMobile ? "50%" : "55%"};
           box-shadow: -100px 10px 2000px 1000px rgba(0, 0, 0, 0.33);
        }
        .popup-results::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for Firefox */
        .popup-results {
          scrollbar-width: none;
        }
        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          position: absolute;
          top: 10px;
          right: 20px;
        }
        .search-results {
          list-style: none;
          padding: 0;
          margin-top: 20px;
        }
        .search-item {
          display: flex;
          align-items: center;
          padding: 8px;
          border-bottom: 1px solid #ddd;
          cursor: pointer;
        }
        .search-item img {
          width: 40px;
          height: 40px;
          object-fit: cover;
          margin-right: 10px;
          border-radius: 5px;
        }
        .product-name {
          font-size: 14px;
          font-weight: bold;
        }
        .product-price {
          font-size: 12px;
          color: green;
        }
      `}</style>
    </div>
  );
};

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Detect Mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch search results when query is at least 3 characters
  const { data, error, isLoading } = useSearchProductsQuery(query, {
    skip: query.length < 3,
  });

  // Handle closing of search popup
  const handleClose = () => {
    setIsSearchOpen(false);
    setQuery("");
  };

  return (
    <div className="search-bar">
      {isMobile && !isSearchOpen ? (
        <button
          className="search-icon-btn"
          onClick={() => setIsSearchOpen(true)}
        >
          <Image src={searchIcon} alt="Search" width={20} height={20} />
        </button>
      ) : (
        <div className="search-container">
          <Image
            src={searchIcon}
            alt="Search"
            width={20}
            height={20}
            className="search-icon"
          />
          <input
            type="text"
            placeholder="Search for products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
            style={{ width: isMobile ? "80%" : "100%" }}
          />
          {query.length >= 3 && !error && (
            <SearchResults data={data} query={query} onClose={handleClose} />
          )}
          {isLoading && <p className="loading">Loading...</p>}
          {error && <p className="error">Error fetching products</p>}
        </div>
      )}
      <style jsx>{`
        .search-bar {
          position: relative;
          z-index: 100;
        }
        .search-icon-btn {
          background: none;
          border: none;
          cursor: pointer;
        }
        .search-container {
          display: flex;
          align-items: center;
          position: relative;
          background: white;
          padding: 8px;
          border-radius: 5px;
          width: 300px;
          max-width: ${isMobile ? "100%" : "350px"};
          box-shadow: none;
        }
        .search-input {
          flex: 1;
          padding: 8px;
          border: none;
          font-size: 14px;
          outline: none;
          color: #333;
        }
        .search-icon {
          margin-right: 10px;
        }
        .loading,
        .error,
        .no-results {
          font-size: 14px;
          color: gray;
          text-align: center;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default SearchBar;
