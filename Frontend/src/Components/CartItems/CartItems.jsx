import { useContext } from "react";
import "../CartItems/CartItems.css";
import remove_icon from "../assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const CartItems = () => {
  const { all_product, cartItems, removeFromCart, getTotalCartAmount } =
    useContext(ShopContext);

  const totalAmount = getTotalCartAmount();
  const hasItems = totalAmount > 0;

  return (
    <div className="cartitems-outer">
      <div className="cartitems">
        {/* Table headers only if cart has items */}
        {hasItems && (
          <>
            <div className="cartitems-format-main">
              <p>Products</p>
              <p>Title</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Remove</p>
            </div>
            <hr />
          </>
        )}

        {/* Cart items */}
        {all_product.map((e) => {
          if (cartItems[e.id] > 0) {
            return (
              <div key={e.id}>
                <div className="cartitems-format cartitems-format-main">
                  <img
                    className="carticon-product-icon"
                    src={e.image}
                    alt={e.name}
                  />
                  <p>{e.name}</p>
                  <p>&#8377;{e.new_price}</p>
                  <button className="cartitems-quantity">
                    {cartItems[e.id]}
                  </button>
                  <p>&#8377;{e.new_price * cartItems[e.id]}</p>
                  <img
                    className="cartitems-remove-icon"
                    onClick={() => removeFromCart(e.id)}
                    src={remove_icon}
                    alt="remove-icon"
                  />
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}

        {/* Empty state message */}
        {!hasItems && (
          <div className="cartitems-empty">
            <p>Your cart is empty 🛒</p>
          </div>
        )}

        {/* Bottom Section */}
        <div className="cartitems-down">
          <div className="cartitems-total">
            <div className="cartitems-total-text">
              <h1 id="cartitems-total-text1">Cart</h1>
              <h1 id="cartitems-total-text2"> Total</h1>
            </div>

            <div>
              <div className="cartitems-total-items">
                <p>Subtotal</p>
                <p>&#8377;{totalAmount}</p>
              </div>
              <hr />
              <div className="cartitems-total-items">
                <p>Shipping fee</p>
                <p>Free</p>
              </div>
              <hr />
              <div className="cartitems-total-items">
                <h3>Total</h3>
                <h3>&#8377;{totalAmount}</h3>
              </div>
            </div>
            <button disabled={!hasItems}>
              {hasItems ? "PROCEED TO CHECKOUT" : "Add items to checkout"}
            </button>
          </div>

          <div className="cartitems-promocode">
            <p>If you have a promo code, Enter it here</p>
            <div className="cartitems-promobox">
              <input type="text" placeholder="Enter Promo Code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
