import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { assets } from "../assets/assets";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
function SearchBar() {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const Navigate = useNavigate();
  useEffect(() => {
    if (location.pathname == "/collection") {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);
  return showSearch && visible ? (
    <div className="border-y border-y-gray-200 bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 ">
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 outline-none bg-inherit text-sm placeholder:text-gray-400"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <img src={assets.search_icon} alt="search" className="w-4" />
      </div>
      <img
        src={assets.cross_icon}
        alt="cross"
        className="inline w-4 cursor-pointer"
        onClick={() => {
          setShowSearch(false);
        }}
      />
    </div>
  ) : null;
}

export default SearchBar;
