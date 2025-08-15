import { assets } from "../assets/assets.js";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title.jsx";
import ProductItem from "../Components/ProductItem.jsx";
function Collection() {
  const { Products, search, showSearch } = useContext(ShopContext);
  const [ShowFilter, setShowFilter] = useState(false);
  useEffect(() => {
    setfilterProducts(Products);
  }, [Products]);
  const [category, setCategory] = useState([]);
  const [subCategory, setsubCategory] = useState([]);
  const [filterProducts, setfilterProducts] = useState([]);
  const [sort, setSort] = useState("relevant");
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item != e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setsubCategory((prev) => prev.filter((item) => item != e.target.value));
    } else {
      setsubCategory((prev) => [...prev, e.target.value]);
    }
  };
  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sort) {
      case "low-high":
        setfilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setfilterProducts(fpCopy.sort((b, a) => a.price - b.price));
        break;
      default:
        applyFilter();
        break;
    }
  };
  const applyFilter = () => {
    let productsCopy = Products.slice();
    if (showSearch && search) {
      productsCopy = productsCopy.filter((prod) =>
        prod.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter((prod) =>
        category.includes(prod.category)
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((prod) =>
        subCategory.includes(prod.subCategory)
      );
    }
    setfilterProducts(productsCopy);
  };
  useEffect(() => {
    applyFilter();
    setSort("relevant");
  }, [category, subCategory, search, showSearch]);
  useEffect(() => {
    sortProduct();
  }, [sort]);
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 py-10 border-t border-t-gray-200">
      <div>
        <div className="min-w-60">
          <p className="my-2 text-xl flex items-center cursor-pointer gap-2">
            FILTERS
            <img
              src={assets.dropdown_icon}
              alt="DropDown"
              className={`h-3 sm:hidden ${ShowFilter ? "rotate-90" : ""}`}
              onClick={() => {
                setShowFilter(!ShowFilter);
              }}
            />
          </p>
          <div
            className={`border border-gray-300 pl-5 py-3 mt-6 ${
              ShowFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="mb-3 text-sm font-medium">CATEGORIES</p>
            <div className="flex flex-col gap-2 sm:font-light text-gray-700">
              <p className="flex gap-2 text-sm">
                <input
                  type="checkbox"
                  className="w-3 cursor-pointer"
                  value={"Men"}
                  id="Men"
                  onChange={(e) => {
                    toggleCategory(e);
                  }}
                />
                <label htmlFor="Men" className="cursor-pointer">
                  Men
                </label>
              </p>
              <p className="flex gap-2 text-sm">
                <input
                  type="checkbox"
                  className="w-3 cursor-pointer"
                  value={"Women"}
                  id="women"
                  onChange={(e) => {
                    toggleCategory(e);
                  }}
                />
                <label htmlFor="women" className="cursor-pointer">
                  Women
                </label>
              </p>
              <p className="flex gap-2 text-sm">
                <input
                  type="checkbox"
                  className="w-3 cursor-pointer"
                  value={"Kids"}
                  id="kids"
                  onChange={(e) => {
                    toggleCategory(e);
                  }}
                />
                <label htmlFor="kids" className="cursor-pointer">
                  Kids
                </label>
              </p>
            </div>
          </div>
          <div
            className={`border border-gray-300 pl-5 py-3 mt-5 ${
              ShowFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="mb-3 text-sm font-medium">TYPE</p>
            <div className="flex flex-col gap-2 sm:font-light text-gray-700">
              <p className="flex gap-2 text-sm">
                <input
                  type="checkbox"
                  className="w-3 cursor-pointer"
                  value={"Topwear"}
                  id="topwear"
                  onChange={toggleSubCategory}
                />
                <label htmlFor="topwear" className="cursor-pointer">
                  Topwear
                </label>
              </p>
              <p className="flex gap-2 text-sm">
                <input
                  type="checkbox"
                  className="w-3 cursor-pointer"
                  value={"Bottomwear"}
                  id="bottomwear"
                  onChange={toggleSubCategory}
                />
                <label htmlFor="bottomwear" className="cursor-pointer">
                  Bottomwear
                </label>
              </p>
              <p className="flex gap-2 text-sm">
                <input
                  type="checkbox"
                  className="w-3 cursor-pointer"
                  value={"Winterwear"}
                  id="winterwear"
                  onChange={toggleSubCategory}
                />
                <label htmlFor="winterwear" className="cursor-pointer">
                  Winterwear
                </label>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            className="border-2 border-gray-300 text-sm px-2"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
            }}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 ">
          {filterProducts.map((product, index) => {
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
    </div>
  );
}
export default Collection;
