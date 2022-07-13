import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import Home from "./components/Home";
import Blogs from "./components/Blogs";
import useContentful from "./hooks/useContentful";
import Navbar from "./components/Navbar";
import SinglePost from "./components/SinglePost";
import PageError from "./components/PageError";


function App() {
  
  const [blog, setBlog] = useState([]);

  const [categories, setCategories] = useState([]);
  const [apiloaded, setApiloaded] = useState(false);
  const { getBlog, getCategories } = useContentful();
  const [toggleMenu, setToggleMenu] = useState(false);
  useEffect(() => {
    if (!apiloaded) {
      getCategories().then((res) => {
        setCategories(res);
        setApiloaded(true);
      });
      getBlog().then((res) => {
        setBlog(res);
        
       
      });
    }
  }, []);
  let uniqueObjArray = [
    ...new Map(
      blog.map((blog) => [blog.category.fields["name"], blog])
    ).values(),
  ];
  


  return (
    <div className="App">
      <Router>
        <Navbar setToggleMenu={setToggleMenu} toggleMenu={toggleMenu} blogs={blog} />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                uniqueObjArray={uniqueObjArray}
                setToggleMenu={setToggleMenu}
              />
            }
          />
          <Route
            path="/blogs"
            element={
              <Blogs
                blogs={blog}
                categories={categories}
                setToggleMenu={setToggleMenu}
              />
            }
          ></Route>
          <Route
            path="/blogs/:name"
            element={
              <Blogs
                blogs={blog}
                categories={categories}
                setToggleMenu={setToggleMenu}
              />
            }
          ></Route>
          <Route
            path="/blogs/:name/:id/:title"
            element={
              <SinglePost
                blog={blog}
                categories={categories}
                setToggleMenu={setToggleMenu}
               
              />
            }
          ></Route>
          <Route path="*" element={<PageError />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
