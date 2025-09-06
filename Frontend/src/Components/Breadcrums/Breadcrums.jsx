import "../Breadcrums/Breadcrums.css";
import arrow_icon from "../assets/breadcrum_arrow.png";

const Breadcrums = (props) => {
  const { product } = props;
  return (
    <>
    <div className="breadcrum-outer">
      <div className="breadcrum">
        HOME <img src={arrow_icon} alt="arrow-icon" /> SHOP{" "}
        <img src={arrow_icon} alt="arrow-icon" />
        {product.category} <img src={arrow_icon} alt="arrow-icon" />
        {product.name}
      </div>
      </div>
    </>
  );
};

export default Breadcrums;
