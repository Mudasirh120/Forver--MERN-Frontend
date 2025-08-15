import Title from "./Title";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import ProductItem from "./ProductItem";
function LatestCollections() {
  const { Products } = useContext(ShopContext);
  const [latestProduct, setlatestProduct] = useState([]);
  useEffect(() => {
    setlatestProduct(Products.slice(0, 10));
  }, [Products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto  text-xs sm:text-sm md:text-base text-gray-600">
          Discover the newest additions to our store — handpicked styles
          designed to keep you ahead of the trend. From timeless classics to
          modern essentials, explore fresh looks for every occasion.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProduct.map((product, index) => {
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

export default LatestCollections;
