import React, { useState } from "react";
import { useFetchBlogsQuery } from "@/redux/features/auth/authApi"; // Ensure this path is correct
import Link from "next/link"; // Adjust based on your routing
import BlogItem from "./blog-item";
import { ArrowRightLong } from "@/svg";
import { ShapeLine } from "@/svg";
import Loader from "@/components/loader/loader";
import ErrorMsg from "@/components/common/error-msg";

const BlogArea = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: blogData = {},
    isLoading,
    isError,
  } = useFetchBlogsQuery(currentPage);

  if (isLoading) return <div><Loader/></div>;
  if (isError) return <div><ErrorMsg/></div>;

  const { data: blogs = [], total_blogs } = blogData;

  return (
    <section className="tp-blog-area pt-50 pb-5">
      <div className="container">
        {/* Centered Title */}
        <div className="container text-center">
          <h2
            style={{
              padding: "0 10px",
              paddingTop: "22px",
              paddingBottom: "10px",
              fontSize: "55px",
              fontFamily: "'Tangerine', cursive",
              borderBottom: "2px dotted gray",
              display: "inline-block",
              margin: "1px 20px",
              color:'#990100'
            }}
          >
            Blogs
          </h2>
        </div>

        {/* Centered "Latest news & articles" Heading */}
        <div className="text-center mt-4">
          <h3 className="tp-section-title" style={{ display: "inline-block",color:'#9F2B68',fontSize:'30px',marginBottom:'32px' }}>
            Latest news & articles
            {/* <ShapeLine /> */}
          </h3>
        </div>

       

        {/* Blog Grid Layout */}
        <div className="row">
          {blogs.slice(0, 3).map((blog) => (
            <div key={blog.id} className="col-md-4">
              <div className="blog-card">
                <BlogItem blog={blog} />
              </div>
            </div>
          ))}
        </div>
         {/* View All Blog Button */}
         <div className="d-flex justify-content-end mt-4">
          <div className="tp-blog-more mb-50 text-center">
            <Link
              href="/blog"
              className="cursor-pointer"
              style={{
                // backgroundColor: "#000000",
                // color: "#FFFFFF",
                padding: "10px 15px",
                display: "inline-flex",
                alignItems: "center",
                transition: "background-color 0.3s, color 0.3s",
                border:'1px dashed #990100'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#990100";
                e.target.style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#FFFFFF";
                e.target.style.color = "#000000";
              }}
            >
              View All Blog →
              {/* <ArrowRightLong style={{ marginLeft: "10px" }} /> */}
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .blog-card {
          background-color: white;
          padding: 15px;
          border-radius: 26px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height:430px;
          border:1px dotted #990100
        }

        .blog-card:hover {
          
          box-shadow: 1px -4px 10px 1px rgba(0, 0, 0, 0.15);
        }

        .blog-card img {
          transition: transform 0.3s ease;
          transform: scale(1.0);
        }

        .blog-card:hover img {
          transform: scale(1.0);
        }
      `}</style>
    </section>
  );
};

export default BlogArea;
