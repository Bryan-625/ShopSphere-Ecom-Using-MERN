import "../RelatedProducts/RelatedProducts.css";
import Item from "../Item/Item";
import { useState } from "react";
import { useEffect } from "react";

const RelatedProducts = ({category}) => {

  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        let res = await fetch(`https://shopsphere-ecom-backend.onrender.com/relatedproducts/${category}`);
        let data = await res.json();
        setRelated(data);
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    if (category) {
      fetchRelated();
    }
  }, [category]);

  return (
    <>
      <div className="relatedproducts-outer">
        <div className="relatedproducts">
          <div className="relatedproducts-text">
            <h1 id="relatedproducts-text1">Related </h1>
            <h1 id="relatedproducts-text2"> Products</h1>
          </div>
          <hr />
          <div className="relatedproducts-item">
            {related.filter((item) => item.category === category).map((item, index) => {
             
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

export default RelatedProducts;
