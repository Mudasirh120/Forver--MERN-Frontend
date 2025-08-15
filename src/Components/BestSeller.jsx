import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
function BestSeller() {
  const { Products } = useContext(ShopContext);
  const [BestSeller, setBestSeller] = useState([]);
  useEffect(() => {
    const bestProducts = Products.filter((product) => product.bestseller);
    setBestSeller(bestProducts.slice(0, 5));
  }, [Products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto  text-xs sm:text-sm md:text-base text-gray-600">
          Our most-loved pieces — trusted by hundreds of happy customers. Shop
          the styles that are trending, tried, and true.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {BestSeller.map((product, index) => {
          return (
            <ProductItem
              key={index}
              id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              productId={product.productId}
            />
          );
        })}
      </div>
    </div>
  );
}

export default BestSeller;
