import React from "react";
import { useEffect } from "react";
import "./Home.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { Link } from "react-router-dom";
import { AiOutlineLine } from "react-icons/ai";
import { useIsMounted } from "../hooks/useIsMounted";

const Home = ({ uniqueObjArray, setToggleMenu }) => {
  const isMounted = useIsMounted();
  useEffect(() => {
    if (isMounted()) {
      setToggleMenu(false);
    }
  }, []);
  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  const options = {
    autoplayHoverPause: true,
    autoplaySpeed: 500,
    autoplay: true,
    loop: true,
    slideBy: 1,
    speed: 1000,
    loop: true,
    margin: 15,
    dots: false,
    nav: true,

    responsive: {
      0: {
        items: 1,
      },
      968: {
        items: 2,
      },
    },
  };

  return (
    <div className="home">
      {(uniqueObjArray.length && (
        <OwlCarousel className="owl-theme" {...options}>
          {uniqueObjArray.map((uniqueObjArray, i) => (
            <div
              key={i}
              className="item"
              id={uniqueObjArray.category.fields.name}
              style={{
                backgroundImage: `url(${uniqueObjArray.category.fields.image.fields.file.url})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",objectFit:"cover",
              }}
            >
              <div className="itemContent">
                <Link
                  to={
                    slugify("blogs") +
                    "/" +
                    slugify(uniqueObjArray.category.fields.name)
                  }
                >
                  <button id="item-btn">
                    {uniqueObjArray.category.fields.name}
                  </button>
                </Link>
              </div>
              <div className="itemBottom">
                <Link
                  to={
                    slugify("blogs") +
                    "/" +
                    slugify(uniqueObjArray.category.fields.name)
                  }
                  className="item-content-bootom-link"
                >
                  {uniqueObjArray.category.fields.description}
                </Link>
              </div>
              <ul className="details">
                <li>{uniqueObjArray.authorName}</li>
                <li>
                  <AiOutlineLine  />
                </li>
                <li> {new Date(uniqueObjArray.date).toDateString()}</li>
                <li>
                  <AiOutlineLine  />
                </li>
                <li> time to read</li>
              </ul>
            </div>
          ))}
        </OwlCarousel>
      )) || <p>No data</p>}
    </div>
  );
};

export default Home;
