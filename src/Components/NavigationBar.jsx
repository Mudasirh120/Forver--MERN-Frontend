import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";
function NavigationBar() {
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
    api,
  } = useContext(ShopContext);
  const LogOut = async () => {
    try {
      const res = await api.post("/api/user/logout");
      if (res.data.success) {
        setToken(false);
        setCartItems({});
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      // toast.success(error.response.data.message);
    }
  };
  const [isBurgerMenu, setisBurgerMenu] = useState(false);
  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link to={"/"}>
        <img src={assets.logo} alt="Main Logo" className="w-36" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        <NavLink className="flex flex-col items-center gap-1" to={"/"}>
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden " />
        </NavLink>
        <NavLink
          className="flex flex-col items-center gap-1"
          to={"/collection"}
        >
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to={"/about"}>
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink className="flex flex-col items-center gap-1" to={"/contact"}>
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <img
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="search"
          onClick={() => {
            setShowSearch(true);
            navigate("/collection");
          }}
        />
        <div className="group relative">
          <Link to={"/login"}>
            <img
              src={assets.profile_icon}
              className="w-5 cursor-pointer"
              alt="profile"
            />
          </Link>
          {token ? (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p
                  className="cursor-pointer hover:text-black"
                  onClick={() => {
                    navigate("/orders");
                  }}
                >
                  Orders
                </p>
                <p className="cursor-pointer hover:text-black" onClick={LogOut}>
                  Logout
                </p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <Link to={"/cart"} className="relative">
          <img src={assets.cart_icon} alt="cart" className="w-5 min-w-5" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          src={assets.menu_icon}
          alt="Menu"
          onClick={() => {
            setisBurgerMenu(true);
          }}
          className="w-5 cursor-pointer sm:hidden"
        />
        <div
          className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
            isBurgerMenu ? "w-full" : "w-0"
          }`}
        >
          <div className="flex flex-col text-gray-600 burgerNav">
            <div
              className="flex items-center gap-4 p-3 cursor-pointer"
              onClick={() => {
                setisBurgerMenu(false);
              }}
            >
              <img
                src={assets.dropdown_icon}
                alt="Close"
                className="h-4 rotate-180"
              />
              <p>Back</p>
            </div>
            <NavLink
              onClick={() => {
                setisBurgerMenu(false);
              }}
              className="py-2 pl-6 border border-gray-200"
              to={"/"}
            >
              HOME
            </NavLink>
            <NavLink
              onClick={() => {
                setisBurgerMenu(false);
              }}
              className="py-2 pl-6 border border-gray-200"
              to={"/collection"}
            >
              COLLECTION
            </NavLink>
            <NavLink
              onClick={() => {
                setisBurgerMenu(false);
              }}
              className="py-2 pl-6 border border-gray-200"
              to={"/about"}
            >
              ABOUT
            </NavLink>
            <NavLink
              onClick={() => {
                setisBurgerMenu(false);
              }}
              className="py-2 pl-6 border border-gray-200"
              to={"/contact"}
            >
              CONTACT
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NavigationBar;
