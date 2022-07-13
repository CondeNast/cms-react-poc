import React, { useEffect, useState } from "react";
import "./Blog.css";
import { Link, useParams } from "react-router-dom";
import UniqueBlogs from "./UniqueBlogs";
import useContentful from "../hooks/useContentful";
import { IoIosArrowForward } from "react-icons/io";
import { useIsMounted } from "../hooks/useIsMounted";
import PageError from './PageError'
const Blogs = ({ blogs, categories, setToggleMenu }) => {
  const isMounted = useIsMounted();
  useEffect(() => {
    if (isMounted()) {
      setToggleMenu(false);
    }
    console.log(isMounted());
  }, []);
  let { name } = useParams();
  const { getBlog } = useContentful();
  let [filteredBlogs, setFilteredBlogs] = useState(blogs);
  const slugify = (str) =>
    str.toString()
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  useEffect(() => {
    if (name) {
      getBlog().then((res) => {
        let specificCategroy = res.filter(
          (item) =>
            slugify(item.category.fields.name.toLowerCase()) ===
            slugify(name.toLowerCase())
        );
        setFilteredBlogs(specificCategroy);
      });
    }
   
  }, [name]);
  return (
    <div className="blog">
      {!name ? (
        <div className="categories">
          {categories.map((category, c) => (
            <div key={c} className="category">
              <div className="categoryImage">
                <img src={category.image.fields.file.url} alt={category.name} />
              </div>
              <div className="categoryDescription">
                <Link to={slugify(category.name)}>
                  <div>{category.description}</div>
                </Link>
              </div>
              <div className="categoryName">
                <h5>{category.name}</h5>
              </div>
            </div>
          ))}
        </div>
      ) 
      :filteredBlogs.length>0 ?
       (
        <>
          <div className="Blogs-Header">
            <h1 id="heading">
              {filteredBlogs.length > 0 &&
                filteredBlogs[0].category.fields.name}
            </h1>
            <span>
              <Link to="/" style={{ color: "gray", right: -15 }}>
                Home
              </Link>
              <IoIosArrowForward
                style={{
                  color: "gray",
                  height: 24,
                  position: "relative",
                  top: -30,
                }}
              />
              <Link to="/blogs" style={{ left: -15 }}>
                Blogs
              </Link>
            </span>
          </div>

          {filteredBlogs.map((blogs, i) => (
            <UniqueBlogs key={i} blogs={blogs} />
          ))}
        </>
        
      )
    :<PageError />
    }
     
    </div>
  );
};

export default Blogs;
