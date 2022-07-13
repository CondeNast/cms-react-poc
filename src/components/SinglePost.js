import React from "react";
import "./SinglePost.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useContentful from '../hooks/useContentful'
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineLine } from "react-icons/ai";
import PageError from "./PageError";
const SinglePost = (blog) => {
  let [filteredBlog, setFilteredBlog] = useState({});
  const { getBlog } = useContentful();
  let { id } = useParams();
  let { name } = useParams();
  let date = new Date(
    Object.keys(filteredBlog).length > 0 && filteredBlog.date
  );
  const slugify = (str) =>
    str
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  useEffect(() => {
    if (id) {
      getBlog().then((res) => {
        let specificBlog = res.filter(
          (item) =>
            item.id == id &&
            item.category.fields.name.toLowerCase() === name.toLowerCase()
        );
        specificBlog.length >= 1 && setFilteredBlog(specificBlog[0]);
        
      });
    }
  }, [id]);

  let slug =
    Object.keys(filteredBlog).length > 0 && filteredBlog.category.fields.name;
  return (
    <div className="Single">
      {  Object.keys(filteredBlog).length > 0 ? (
        <>
      <div className="Blog-Header">
        <h1 id="BlogHeading">
          {Object.keys(filteredBlog).length > 0 && filteredBlog.title}
        </h1>
        <div className="BlogLinkers">
          <Link to="/" style={{ color: "gray" }}>
            Home
          </Link>
          <IoIosArrowForward style={{ color: "gray" }} />
          <Link to="/blogs" style={{ color: "gray" }}>
            Blogs
          </Link>
          <IoIosArrowForward style={{ color: "gray" }} />
          <Link to={`/blogs/${slugify(slug)}`}>{slug}</Link>
        </div>
      </div>
      <div className="AuthorSingle">
        <div className="authorItemSingle">
          <img
            src={
              Object.keys(filteredBlog).length &&
              filteredBlog.authorImage.fields.file.url
            }
            alt="blog"
          />
        </div>
        <AiOutlineLine style={{ height: 25 }} />
        <div className="authorItemSingle">
          {Object.keys(filteredBlog).length > 0 && filteredBlog.authorName}
        </div>
        <AiOutlineLine style={{ height: 25 }} />
        <div className="authorItemSingle">
          {Object.keys(filteredBlog).length > 0 &&
            filteredBlog.category.fields.name}
        </div>
        <AiOutlineLine style={{ height: 25 }} />
        <div className="authorItemSingle">{date.toDateString()}</div>
      </div>
      <div className="SingleBlog">
        {Object.keys(filteredBlog).length > 0 && (
          <div>
            <div className="BlogImage">
              <img src={filteredBlog.image.fields.file.url} alt="blogs" />
            </div>
            <div className="BlogDescription">
              <div> {filteredBlog.description}</div>
            </div>
          </div>
        )}
      </div> 
      </>):
      (<PageError />)
}
    </div>
    
  );
};

export default SinglePost;
