import React from "react";
import "./Unique.css";
import { Link } from "react-router-dom";
import { AiOutlineLine } from 'react-icons/ai';

const uniqueBlogs = ({ blogs, i }) => {

  let date = new Date(Object.keys(blogs).length > 0 && blogs.date)

  const slugify = str =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  return (
    <div className="unique-blogs">
      <div className="cat-blog-title">
       <Link to={`/blogs/${slugify(blogs.category.fields.name)}/${blogs.id}/${slugify(blogs.title)}`}> {blogs.title}</Link>
      </div>
      <div className="Author">
        <div className="authorItem">
          <img src={Object.keys(blogs).length && blogs.authorImage.fields.file.url} alt='hello' />
        </div>
        <AiOutlineLine style={{ height: 25 }} />
        <div className="authorItem">
          {blogs.authorName}
        </div>
        <AiOutlineLine style={{ height: 25 }} />
        <div className="authorItem">
          {blogs.category.fields.name}
        </div>
        <AiOutlineLine style={{ height: 25 }} />
        <div className="authorItem">
          {date.toDateString()}
        </div>
      </div>
      <div className="unique-blog-content">
        <div className="UniqueImage">
          <img src={blogs.image.fields.file.url} alt={blogs.title} />
        </div>
        <div className="description">
          <div > {blogs.description}</div>
        </div>
      </div>

    </div>

  );
};

export default uniqueBlogs;
