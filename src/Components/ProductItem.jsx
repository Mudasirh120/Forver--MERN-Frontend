import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link } from "react-router-dom";
function ProductItem({ id, image, name, price, productId }) {
  const { currency } = useContext(ShopContext);
  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
      <div className="overflow-hidden">
        <img
          src={image[0]}
          alt="Prroduct Image"
          className="hover:scale-110 transition ease-in-out"
        />
        <p className="pt-3 pb-3 text-sm">{name}</p>
        <p className="flex gap-1 text-sm font-medium">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
}

export default ProductItem;
