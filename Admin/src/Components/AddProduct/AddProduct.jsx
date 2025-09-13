import "../AddProduct/AddProduct.css";
import upload_area from "../../assets/upload_area.svg";

const AddProduct = () => {
  return (
    <>
      <div className="add-product-outer">
        <div className="add-product">
          <div className="addproduct-itemfield">
            <p>Product Title</p>
            <input type="text" name="name" placeholder="Type here" />
          </div>
          <div className="addproduct-price">
            <div className="addproduct-itemfield">
              <p>Price</p>
              <input
                type="text"
                name="old_price"
                placeholder="Enter old price"
              />
            </div>
            <div className="addproduct-itemfield">
              <p>Offer Price</p>
              <input
                type="text"
                name="new_price"
                placeholder="Enter Offer price"
              />
            </div>
          </div>
          <div className="addproduct-itemfield">
            <p>Category</p>
            <select name="category" className="add-product-selector">
              <option value="women">Women</option>
              <option value="men">Men</option>
              <option value="kid">Kid</option>
            </select>
          </div>
          <div className="addproduct-itemfield">
            <label htmlFor="file-input">
              <img
                className="addproduct-thumbnail-img"
                src={upload_area}
                alt="upload-area-img"
              />
            </label>
            <input type="file" name="image" id="file-input" hidden />
          </div>
          <button className="addproduct-button">Add</button>
        </div>
      </div>
    </>
  );
};
export default AddProduct;
