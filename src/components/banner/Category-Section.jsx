import Image from "next/image";
import logo5 from "../../../public/assets/img/banner/Category/5.png";
import logo2 from "../../../public/assets/img/banner/Category/2.png";
import logo1 from "../../../public/assets/img/banner/Category/1.png";
import logo3 from "../../../public/assets/img/banner/Category/3.png";
import logo4 from "../../../public/assets/img/banner/Category/4.png";
import logo6 from "../../../public/assets/img/banner/Category/6.png";

import mlogo5 from "../../../public/assets/img/banner/Category/m5.jpg";
import mlogo2 from "../../../public/assets/img/banner/Category/m2.png";
import mlogo1 from "../../../public/assets/img/banner/Category/m1.jpg";
import mlogo3 from "../../../public/assets/img/banner/Category/m3.jpg";
import mlogo4 from "../../../public/assets/img/banner/Category/m4.jpg";
import mlogo6 from "../../../public/assets/img/banner/Category/m6.jpg";

import { useRouter } from "next/router";
import { useIsMobile } from "@/utils/isMobileUtil";
import "@fontsource/tangerine";
const desktopCategories = [
  { id: 23, label: "THE SURPRISE BOX", icon: logo1 },
  { id: 27, label: "THE TEDDY MADDY", icon: logo2 },
  { id: 28, label: "THE HAPPY CARDS", icon: logo3 },
  { id: 32, label: "THE WALL PAINTINGS", icon: logo4 },
  { id: 33, label: "THE FLOWER POT", icon: logo5 },
  { id: 31, label: "Personalised", icon: logo6 },
];

const mobileCategories = [
  { id: 23, label: "THE SURPRISE BOX", icon: mlogo1 },
  { id: 27, label: "THE TEDDY MADDY", icon: mlogo2 },
  { id: 28, label: "THE HAPPY CARDS", icon: mlogo3 },
  { id: 32, label: "THE WALL PAINTINGS", icon: mlogo4 },
  { id: 33, label: "THE FLOWER POT", icon: mlogo5 },
  { id: 31, label: "Personalised", icon: mlogo6 },
];

export default function CategorySection() {
  const router = useRouter();
  const isMobile = useIsMobile(); // Check if the current view is mobile
  const categories = isMobile ? mobileCategories : desktopCategories; // Choose icons based on device

  const handleCategoryClick = (id) => {
    router.push(`/shop?category=${id}`);
  };

  return (
    <div className="container">
     <div className="container" style={{ textAlign: 'center' }}>
  <h2
    style={{
      padding: "0 10px", // Top padding
      paddingTop: "22px",
      paddingBottom:"10px",
      fontSize: "55px",
      fontFamily: "'Tangerine', cursive", 
      borderBottom: "2px dotted gray",
      display: "inline-block", // Ensures the border wraps the text
      margin: "12px auto", // Center the element horizontally
      color:'#990100',

    }}
  >
    Categories
  </h2>
</div>


      
      {isMobile ? (
        // Mobile View: Horizontal Scroll
        <div className="mobile-container">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="category-item mobile-category-item"
            >
              <Image
                src={category.icon}
                alt={category.label}
                width={65} // Increased size
                height={50} // Increased size
                style={{ objectFit: "contain" }} // Ensures the image covers the element
              />
              <p className="category-label">{category.label}</p>
            </div>
          ))}
        </div>
      ) : (
        // Desktop View: Grid Layout
        <div
          className="desktop-container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "20px",
            padding: "1px",
            maxWidth: "1500px",
            margin: "auto",
            
          }}
        >
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              style={{
                textAlign: "center",
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: "#fff",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                
                
              }}
              className="category-item"
            >
              <Image
                src={category.icon}
                alt={category.label}
                width={200}
                height={200}
                style={{objectFit:'cover'}}
              />
              <p
                style={{
                  marginTop: "8px",
                  fontSize: "14px",
                  color: "black",
                  transition: "color 0.2s",
                  fontWeight:'500',
                  paddingTop:'10px'
                }}
                className="category-label"
              >
                {category.label}
              </p>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        /* Mobile-Specific Styles */
        .mobile-container {
          display: flex;
          flex-direction: row;
          overflow-x: auto; /* Enables horizontal scrolling */
          padding: 10px 16px; /* Consistent padding */
          gap: 16px;
          scroll-snap-type: x mandatory; /* Smooth snap scrolling */
        }

        .mobile-container::-webkit-scrollbar {
          display: none; /* Hide scrollbar */
        }

        .mobile-category-item {
          min-width: 110px; /* Increased slightly */
          text-align: center;
          padding: 12px; /* Adjusted padding */
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #fff;
          cursor: pointer;
          flex-shrink: 0;
          scroll-snap-align: start;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .mobile-category-item:hover {
          transform: scale(1.05);
        }

        .category-label {
          margin-top: 8px;
          font-size: 12px;
          color: black;
          transition: color 0.2s;
        }

        .mobile-category-item:hover .category-label {
          color: #990100;
        }

        /* Desktop-Specific Styles */
        .category-item:not(.mobile-category-item) {
          box-shadow: none; /* No shadow for desktop */
        }
      `}</style>
    </div>
  );
}
