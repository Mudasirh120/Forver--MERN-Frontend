import { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import CartTotal from "../Components/CartTotal";
import Title from "../Components/Title";
import { ShopContext } from "../Context/ShopContext";
import { useEffect } from "react";
import { toast } from "react-toastify";
function PlaceOrder() {
  const {
    navigate,
    api,
    cartItems,
    setCartItems,
    getCartAmount,
    deliveryFee,
    Products,
  } = useContext(ShopContext);
  const [method, setMethod] = useState("cod");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = {
      firstname,
      lastname,
      email,
      street,
      city,
      state,
      zipcode,
      country,
      phone,
    };
    let orderItems = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          const itemInfo = structuredClone(
            Products.find((prod) => prod._id === items)
          );
          if (itemInfo) {
            itemInfo.size = item;
            itemInfo.quantity = cartItems[items][item];
            orderItems.push(itemInfo);
          }
        }
      }
    }
    let orderData = {
      address: formData,
      items: orderItems,
      amount: getCartAmount() + deliveryFee,
    };
    let res;
    switch (method) {
      case "cod":
        try {
          res = await api.post("/api/order/place", orderData);
          toast.success(res.data.message);
          if (res.data.success) {
            setCartItems({});
            navigate("/orders");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }

        break;
      case "stripe":
        break;
    }
    navigate("/orders");
  };
  useEffect(() => {}, []);
  return (
    <form
      onSubmit={(e) => {
        onSubmitHandler(e);
      }}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t border-gray-200"
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            required
            name="firstname"
            type="text"
            value={firstname}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder="First Name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full placeholder:text-gray-400"
          />
          <input
            required
            name="lastname"
            type="text"
            value={lastname}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder="Last Name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full placeholder:text-gray-400"
          />
        </div>
        <input
          required
          name="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full placeholder:text-gray-400"
        />
        <input
          name="street"
          required
          type="text"
          value={street}
          onChange={(e) => {
            setStreet(e.target.value);
          }}
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full placeholder:text-gray-400"
        />
        <div className="flex gap-3">
          <input
            required
            name="city"
            type="text"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full placeholder:text-gray-400"
          />
          <input
            required
            name="state"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
            }}
            type="text"
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full placeholder:text-gray-400"
          />
        </div>
        <div className="flex gap-3">
          <input
            required
            name="zipcode"
            value={zipcode}
            onChange={(e) => {
              setZipCode(e.target.value);
            }}
            type="text"
            placeholder="Zip Code"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full placeholder:text-gray-400"
          />
          <input
            required
            name="country"
            type="text"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full placeholder:text-gray-400"
          />
        </div>
        <input
          required
          name="phone"
          type="tel"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          placeholder="Phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full placeholder:text-gray-400"
        />
      </div>
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            {/* <div
              onClick={() => {
                setMethod("stripe");
              }}
              className="flex items-center gap-3 border border-gray-200 p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-gray-200 rounded-full ${
                  method === "stripe" ? "bg-green-700" : ""
                }`}
              ></p>
              <img src={assets.stripe_logo} alt="" className="h-5 mx-4" />
            </div> */}
            <div
              onClick={() => {
                setMethod("cod");
              }}
              className="flex items-center gap-3 border border-gray-200 p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border border-gray-200 rounded-full ${
                  method == "cod" ? "bg-green-700" : ""
                } `}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              onSubmit={(e) => {
                onSubmitHandler(e);
              }}
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
export default PlaceOrder;
