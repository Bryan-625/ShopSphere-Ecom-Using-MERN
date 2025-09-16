import "../ProductDisplay/ProductDisplay.css";
import star_icon from "../assets/star_icon.png";
import star_dull_icon from "../assets/star_dull_icon.png";
import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  return (
    <>
      <div className="productdisplay-outer">
        <div className="productdisplay">
          <div className="productdisplay-left">
            <div className="productdisplay-img-list">
              <img src={product.image} alt="product-img" />
              <img src={product.image} alt="product-img" />
              <img src={product.image} alt="product-img" />
              <img src={product.image} alt="product-img" />
            </div>
            <div className="productdisplay-img">
              <img
                className="productdisplay-main-img"
                src={product.image}
                alt="product-img"
              />
            </div>
          </div>
          <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-stars">
              <img src={star_icon} alt="star-icon" />
              <img src={star_icon} alt="star-icon" />
              <img src={star_icon} alt="star-icon" />
              <img src={star_icon} alt="star-icon" />
              <img src={star_dull_icon} alt="star-dull-icon" />
              <p>(122)</p>
            </div>
            <div className="productdisplay-right-prices">
              <div className="productdisplay-right-price-old">
                &#8377;{product.old_price}
              </div>
              <div className="productdisplay-right-price-new">
                &#8377;{product.new_price}
              </div>
            </div>
            <div className="productdisplay-right-description">
              {product.description}
            </div>
            <div className="productdisplay-right-size">
              <h1>Select Size</h1>
              <div className="productdisplay-right-sizes">
                <div tabIndex={0}>S</div>
                <div tabIndex={0}>M</div>
                <div tabIndex={0}>L</div>
                <div tabIndex={0}>XL</div>
                <div tabIndex={0}>XXL</div>
              </div>
            </div>
            <button
              onClick={() => {
                addToCart(product.id);
              }}
            >
              ADD TO CART
            </button>

            <p className="productdisplay-right-cateogory">
              <span>Tags:</span> <span className="tag">Modern</span>,{" "}
              <span className="tag">Latest</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDisplay;
