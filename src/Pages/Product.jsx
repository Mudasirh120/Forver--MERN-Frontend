import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/assets.js";
import RelatedProduct from "../Components/RelatedProduct";
import { toast } from "react-toastify";
function Product() {
  const { id } = useParams();
  const { Products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [Size, setSize] = useState("");
  const fetchProductData = async () => {
    const foundProduct = await Products.find((prod) => prod._id == id);
    setProductData(foundProduct || null);
    setImage(foundProduct?.image[0] || null);
  };
  useEffect(() => {
    fetchProductData();
  }, [Products, id]);
  return productData ? (
    <div className="border-t-2 border-gray-200 pt-10 transition-opacity ease-in duration-700 opacity-100">
      <div className="flex gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row ">
          <div className="flex sm:flex-col overflow-x-auto y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, i) => (
              <img
                src={item}
                alt=""
                key={i}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink cursor-pointer"
                onClick={(e) => {
                  setImage(e.target.src);
                }}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="" className="w-full h-auto" />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="text-gray-500 mt-5 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, i) => (
                <button
                  onClick={() => setSize(item)}
                  key={i}
                  className={`border  py-2 px-4 bg-gray-100 ${
                    item == Size ? "border-orange-500" : "border-gray-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <button
              className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
              onClick={() => {
                if (Size) {
                  addToCart(productData._id, Size);
                } else {
                  toast.error("Please select a size");
                }
              }}
            >
              ADD TO CART
            </button>
            <hr className="mt-8 sm:w-4/5 border-gray-200 " />
            <div className="text-sm text-gray-700 mt-5 flex flex-col gap-1 ">
              <p className="text-gray-500">100% Original product.</p>
              <p className="text-gray-500">
                Cash on delivery is available on this product.
              </p>
              <p className="text-gray-500">
                Easy return and exchange policy within 7 days.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <RelatedProduct
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
      {/* <div className="mt-20">
        <div className="flex ">
          <p className="border border-gray-200  px-5 py-3 text-sm">
            Reviews (122) -- Under Work
          </p>
        </div>
        <div className="flex flex-col border border-gray-200 text-gray-500 text-sm py-6 px-6">
          <div className="flex gap-4 items-center">
            <img src={assets.profile_icon} alt="" className="w-8 " />
            <div>
              <div className="flex gap-4">
                <p>User</p>
                <p>Date</p>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur nobis veniam, ad error saepe nostrum quo enim
                repudiandae perferendis aperiam eaque dignissimos quaerat quia
                quis reprehenderit fuga deserunt in necessitatibus!
              </p>
            </div>
          </div>
        </div>
        <div className="border border-gray-200 w-full flex justify-between">
          <textarea
            name=""
            id=""
            className="outline-none w-full text-gray-500 text-sm placeholder:text-gray-500 px-4"
            placeholder="Write a review..."
          ></textarea>
          <button className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700">
            Submit
          </button>
        </div>
      </div> */}
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}
export default Product;
