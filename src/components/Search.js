import React, { useState, useEffect } from 'react'
import './Search.css'
import useContentful from "../hooks/useContentful";
import { Link } from 'react-router-dom';


function Search({ setOpenModal, blogs }) {
  const [filteredBlog, setFilteredBlog] = useState({});
  const [searchedBlog, setSearchedBlog] = useState();
  console.log(searchedBlog);
  const { getBlog } = useContentful();
  const slugify = (str) =>
    str
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  useEffect(() => {
    if (searchedBlog) {
      getBlog().then((res) => {
        let specificBlog = res.filter(
          (item) =>
            slugify(item.title.toLowerCase()) ===
            slugify(searchedBlog.toLowerCase())
        );
        specificBlog.length >= 1 && setFilteredBlog(specificBlog[0]);
      });
    }
  }, [searchedBlog]);
  const blogNotAvailable=()=>{
    setSearchedBlog("");
    if(searchedBlog){
    document.getElementById("availbility").innerHTML=searchedBlog+" "+"blog not avilable."+ ""+" please search for another blog."
    }
    else{
      document.getElementById("availbility").innerHTML="Please Enter The Blog"
    }
  }


  return (
    <div className="modalBackground">
      <div className='CloseBtn'>
        <button
          onClick={() => {
            setOpenModal(false);
          }}
        >
          X
        </button>
      </div>
      <div className='searchcontainer'>
        <div id='search-content'>
          <input
            type="text"
            value={searchedBlog}
            placeholder='which blog are you looking for?'
            className='search-text'
            id='search-text'
            onChange={(e) => setSearchedBlog(e.target.value)}
          />
          {Object.keys(filteredBlog).length > 0 && <Link  to={`/blogs/${(Object.keys(filteredBlog).length > 0 && slugify(filteredBlog.category.fields.name))}/${filteredBlog.id}/${slugify(filteredBlog.title)}`}>
            <button id='search-btn' onClick={() => {
              setOpenModal(false);
            }} >search</button>
          </Link>}
          {Object.keys(filteredBlog).length === 0 &&
            <button className='search-btn' onClick={blogNotAvailable} >search</button>
          }
        </div>
      </div>
      <div className='searchingcontainer'>
        <p id='availbility'> </p>
      </div>
    </div>


  )
}

export default Search