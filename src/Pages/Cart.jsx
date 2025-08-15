import { useEffect, useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";
import { assets } from "../assets/assets.js";
import CartTotal from "../Components/CartTotal";
import { toast } from "react-toastify";
function Cart() {
  const [cartData, setCartData] = useState([]);
  const {
    cartItems,
    Products,
    currency,
    updateQuantity,
    navigate,
    getCartAmount,
  } = useContext(ShopContext);
  useEffect(() => {
    if (Products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item]) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, Products]);

  return (
    <div className="border-t border-gray-400 pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = Products.find(
            (product) => product._id === item._id
          );
          return (
            <div
              key={index}
              className="py-4 border-t border-gray-400 text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  src={productData.image[0]}
                  alt=""
                  className="w-16 sm:w-20"
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium ">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border-slate-400 bg-slate-100">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                type="number"
                className="border-slate-400 max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                min={1}
                defaultValue={item.quantity}
                onChange={(e) => {
                  if (e.target.value === "" || e.target.value === "0") {
                    return null;
                  } else {
                    updateQuantity(item._id, item.size, Number(e.target.value));
                  }
                }}
              />
              <img
                onClick={() => {
                  updateQuantity(item._id, item.size, 0);
                }}
                src={assets.bin_icon}
                alt="delete"
                className="w-4 mr-4 sm:w-5 cursor-pointer"
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              className="bg-black text-white text-sm my-8 px-8 py-3"
              onClick={() => {
                if (getCartAmount() != 0) {
                  navigate("/place-order");
                } else {
                  toast.error("Please Add a Product to Cart first");
                }
              }}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cart;
