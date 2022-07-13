import { React,  useState } from "react";
import "./Navbar.css";
import Search from "./Search";
import { Link } from "react-router-dom";
import { VscSearch } from "react-icons/vsc";
import { IoMoon } from "react-icons/io5";
import { FiSun } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = ({ toggleMenu, setToggleMenu,blogs }) => {
  const [lightMode, setLightMode] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const Theme = () => {
    setLightMode((prevMode) => !prevMode);
  };

  let clickedClass = "clicked";
  const body = document.body;
  const lightTheme = "light";
  const darkTheme = "dark";
  let theme;
  if (localStorage) {
    theme = localStorage.getItem("theme");
  }

  if (theme === lightTheme || theme === darkTheme) {
    body.classList.add(theme);
  } else {
    body.classList.add(lightTheme);
  }

  const switchTheme = (e) => {
    Theme();
    if (theme === darkTheme) {
      body.classList.replace(darkTheme, lightTheme);
      e.target.classList.remove(clickedClass);
      localStorage.setItem("theme", "light");
      theme = lightTheme;
    } else {
      body.classList.replace(lightTheme, darkTheme);
      e.target.classList.add(clickedClass);
      localStorage.setItem("theme", "dark");
      theme = darkTheme;
    }
  };

  return (
    <div className="Navbar">
      <div className="logo">
        <Link to="/">Condé Nast</Link>
      </div>

      <div className={toggleMenu ? "menuMobile" : "nav-center"}>
        <div className="menuList">
          <Link to="/">home</Link>
        </div>
        <div className="menuList">
          <Link to="/blogs">blogs</Link>
        </div>
      </div>

      <div className="nav-right">
        <div className="nav-right-item">
          {lightMode && (
            <FiSun
              className={theme === "dark" ? clickedClass : ""}
              id="darkMode"
              onClick={(e) => switchTheme(e)}
            />
          )}
          {!lightMode && (
            <IoMoon
              className={theme === "dark" ? clickedClass : ""}
              id="darkMode"
              onClick={(e) => switchTheme(e)}
            />
          )}
        </div>
        <div className="nav-right-item">
          {modalOpen && <Search setOpenModal={setModalOpen} blogs={blogs} />}
          <VscSearch
            id="search-icon"
            className="openModalBtn"
            onClick={() => {
              setModalOpen(true);
            }}
          />
        </div>
        {/* <Link to="">
          <button type="button" id="nav-right-btn">
            subscribe
          </button>
        </Link> */}
        <GiHamburgerMenu
          onClick={() => {
            setToggleMenu((prevMode) => !prevMode);
          }}
          className="mobileMenuIcon"
        ></GiHamburgerMenu>
      </div>
    </div>
  );
};

export default Navbar;
