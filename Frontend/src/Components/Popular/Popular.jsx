import { useState } from "react";
import Item from "../Item/Item";
import "../Popular/Popular.css";


const Popular = () => {
  const [popularProduct, setpopularProduct] = useState([]);

  useState(() => {
    fetch("https://shopsphere-ecom-backend.onrender.com/popularinallcategory")
      .then((res) => res.json())
      .then((data) => {
          console.log("Fetched data:", data);
         const allProducts = [
          ...data.women,
          ...data.men,
          ...data.kid,
        ];
        setpopularProduct(allProducts);
      });
  }, []);

  return (
    <>
      <div className="popular-outer">
        <div className="popular">
          <div className="popular-text">
            <h1 id="popular-text-1">POPULAR IN </h1>
            <h1 id="popular-text-2"> ALL CATEGORIES</h1>
          </div>
          <hr />
          <div className="popular-item">
            {popularProduct.map((item, index) => {
              return (
                <Item
                  key={index}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Popular;
