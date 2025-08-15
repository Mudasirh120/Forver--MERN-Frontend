import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const ShopContext = createContext();
const ShopContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const api = axios.create({
    baseURL: backendUrl,
    withCredentials: true,
  });
  const [Products, setProducts] = useState([]);
  const currency = "$";
  const deliveryFee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const checkAuth = async () => {
    const res = await api.post("/api/user/check-auth");
    setToken(res.data.success);
    if (res.data.success) getUserCart();
  };
  useEffect(() => {
    checkAuth();
  }, []);
  const navigate = useNavigate();
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
    if (token) {
      try {
        const res = await api.post("/api/cart/add", { itemId, size });
        if (res.data.success) {
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };
  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if (token) {
      try {
        const res = await api.post("/api/cart/update", {
          itemId,
          size,
          quantity,
        });
        if (res.data.success) {
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };
  const getUserCart = async () => {
    try {
      const res = await api.post("/api/cart");
      if (res.data.success) {
        setCartItems(res.data.cartData);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = Products.find((prod) => prod._id == items);
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalAmount += itemInfo?.price * cartItems[items][item];
        }
      }
    }
    return totalAmount;
  };
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalCount += cartItems[items][item];
        }
      }
    }
    return totalCount;
  };
  const fetchProducts = async () => {
    try {
      const res = await api.get(`/api/product`);
      if (res.data.success) {
        const products = await res.data;
        setProducts(products.data);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("Error while fetching Products", error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [cartItems]);
  let value = {
    Products,
    currency,
    deliveryFee,
    fetchProducts,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    token,
    setToken,
    api,
    setCartItems,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};
export default ShopContextProvider;
