import React, { useEffect, useState } from "react";
import "../ListProduct/ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";
import Swal from "sweetalert2";


const ListProduct = () => {
  const [allproducts, setAllproducts] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => {
        setAllproducts(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_Product = async (id) => {
    await fetch("http://localhost:4000/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchInfo();
  };

  return (
    <>
      <div className="list-product-outer">
        <div className="list-product">
          <div className="list-product-h1">
            <h1 id="list-product-h1-text1">All Product</h1>
            <h1 id="list-product-h1-text2">List</h1>
          </div>

          <div className="listproduct-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Old Price</p>
            <p>New Price</p>
            <p>Category</p>
            <p>Remove</p>
          </div>
          <div className="listproduct-allproducts">
            <hr />
            {allproducts.map((product, index) => (
              <React.Fragment key={index}>
                <div className="listproduct-format-main listproduct-format">
                  <img
                    className="listproduct-product-icon"
                    src={product.image}
                    alt="product image"
                  />
                  <p>{product.name}</p>
                  <p>&#8377;{product.old_price}</p>
                  <p>&#8377;{product.new_price}</p>
                  <p>{product.category}</p>
                  <img
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure?",
                        text: "This product will be deleted permanently!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#d33",
                        cancelButtonColor: "#3085d6",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          remove_Product(product.id);
                          Swal.fire(
                            "Deleted!",
                            "The product has been removed.",
                            "success"
                          );
                        }
                      });
                    }}
                    className="listproduct-remove-icon"
                    src={cross_icon}
                    alt="cross-icon"
                  />
                </div>
                <hr />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default ListProduct;
