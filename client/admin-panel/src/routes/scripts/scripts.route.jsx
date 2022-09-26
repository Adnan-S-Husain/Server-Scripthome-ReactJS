import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import img1 from "../../assets/img/img1.jpg";
import img2 from "../../assets/img/img2.jpg";
import img3 from "../../assets/img/img3.jpg";
import img4 from "../../assets/img/img4.jpg";
import img5 from "../../assets/img/img5.jpg";
import img6 from "../../assets/img/img6.jpg";
import ArrowButtons from "../../components/arrowbuttons/arrowbuttons.component";
import { DataContext } from "../../contexts/data/data.context";
import { SearchContext } from "../../contexts/searchfield/search.context";

export default function Scripts() {
  const { scripts } = useContext(DataContext);
  const { searchfield } = useContext(SearchContext);
  const [current, Setcurrent] = useState(0);
  const [shortscripts, Setshortscripts] = useState([]);
  const [filteredscripts, Setfilteredscripts] = useState([]);
  const images = [img1, img2, img3, img4, img5, img6];

  const Addcurrent = () => {
    if (current + 6 > filteredscripts.length) {
      return;
    }
    Setcurrent(current + 6);
  };

  const Subcurrent = () => {
    if (current - 6 < 0) {
      return;
    }
    Setcurrent(current - 6);
  };

  useEffect(() => {
    if (searchfield !== "") {
      Setfilteredscripts(
        scripts.filter((script) => {
          return script.title.includes(searchfield) || script.madeby.includes(searchfield);
        })
      );
      Setcurrent(0);
    } else {
      Setfilteredscripts(scripts);
    }
  }, [searchfield, scripts]);

  useEffect(() => {
    Setshortscripts(filteredscripts.slice(current, current + 6));
  }, [current, filteredscripts]);

  return (
    <div className="main2">
      <div className="main-header" style={{ padding: "0 0.5rem" }}>
        <div>
          <h3>Scripts</h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link
                  to="/admin/dashboard"
                  style={{
                    listStyle: "none",
                    color: "#8c8888",
                    textDecoration: "none",
                  }}
                >
                  Dashboard
                </Link>
              </li>
              <li className="breadcrumb-item" aria-current="page" style={{ color: "#8c8888" }}>
                Scripts
              </li>
            </ol>
          </nav>
        </div>
        <div className="edit-users">
          <Link to="/admin/scripts/addscript">
            Add Scripts <i className="fa-solid fa-caret-right"></i>
          </Link>
        </div>
      </div>
      <div className="group-cards">
        <div className="container-of-cards">
          {shortscripts.map((item, key) => {
            return <Card img={images[Math.floor(Math.random() * images.length)]} script={item} key={key} srno={current + key} />;
          })}
        </div>
      </div>
      <div className="foot">
        <p>
          Displaying {current + shortscripts.length} Out of {filteredscripts.length}
        </p>
        <div>
          <p>
            {current + 1}-{current + shortscripts.length}
          </p>
          <ArrowButtons Addcurrent={Addcurrent} Subcurrent={Subcurrent} />
        </div>
      </div>
    </div>
  );
}

function Card({ img, script, srno }) {
  const { title, likes, views, active } = script;
  const [isActive, SetisActive] = useState(null);
  // const {title, madeby, active, likes, views, date} = script
  useEffect(() => {
    SetisActive(active);
  }, [active]);

  return (
    <div className="card">
      <img src={img} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="card-text">
              <span style={{ color: "#fd683e" }}>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </span>
              {likes} Likes
            </p>
            <p>Total Views: {views}</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: "0.5rem",
            }}
          >
            <Link to={`editscript?id=${srno}`} className="btn btn-primary btn-1">
              Edit Script
            </Link>
            {isActive ? <ButtonIA SetisActive={SetisActive} /> : <ButtonAI SetisActive={SetisActive} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function ButtonIA({ SetisActive }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <button
        className="unselected"
        onClick={() => {
          SetisActive(false);
        }}
      >
        Inactive
      </button>
      <button className="active-script">Active</button>
    </div>
  );
}

function ButtonAI({ SetisActive }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <button className="inactive-script">Inactive</button>
      <button
        className="unselected"
        onClick={() => {
          SetisActive(true);
        }}
      >
        Active
      </button>
    </div>
  );
}
