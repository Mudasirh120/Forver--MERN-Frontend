import { useContext, useEffect, useState } from "react";
import Title from "./Title.jsx";
import { ShopContext } from "../Context/ShopContext.jsx";
import ProductItem from "./ProductItem.jsx";
function RelatedProduct({ category, subCategory }) {
  const { Products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);
  useEffect(() => {
    if (Products.length > 0) {
      let rel = Products.slice();
      rel = rel.filter((item) => category == item.category);
      rel = rel.filter((item) => subCategory == item.subCategory);
      setRelated(rel.slice(0, 5));
    }
  }, [Products]);
  return related ? (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>
      <div className="grid grid-col-2 sm:grid-col-3 md-grid-col-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item, i) => (
          <ProductItem
            key={i}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
            productId={item.productId}
          />
        ))}
      </div>
    </div>
  ) : (
    <div></div>
  );
}

export default RelatedProduct;
