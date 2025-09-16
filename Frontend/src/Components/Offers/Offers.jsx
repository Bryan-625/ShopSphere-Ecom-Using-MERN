import "../Offers/Offers.css";
import exclusive_image from "../assets/exclusive_image.png";
import {Link} from "react-router-dom"

const Offers = () => {
  return (
    <>
      <div className="offers-outer">
        <div className="offers">
          <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>Offers For You</h1>
            <p>ONLY ON BEST SELLERS PRODUCT</p>
            <Link to="/womens"><button>Check Now</button></Link>
          </div>
          <div className="offers-right">
            <img src={exclusive_image} alt="exclusie-image" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Offers;
