import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrums from "../Components/Breadcrums/Breadcrums";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((event) => event.id === Number(productId));

    if (!product) {
    return <h2>Loading product details...</h2>;  // prevent error until product is ready
  }
  return (
    <>
      <Breadcrums product={product} />
      <ProductDisplay product={product}/>
      <DescriptionBox/>
      <RelatedProducts category={product.category}/>
    </>
  );
};
export default Product;
