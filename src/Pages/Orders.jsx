import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import Title from "../Components/Title";
import { useState } from "react";
import { useEffect } from "react";
function Orders() {
  const { currency, api, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const fetchOrders = async () => {
    try {
      if (!token) {
        return null;
      }
      const res = await api.post("/api/order/user-orders");
      const allOrderItems = [];
      if (res.data.success) {
        res.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["createdAt"] = order.createdAt;
            allOrderItems.push(item);
          });
        });
      }
      setOrderData(allOrderItems.reverse());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="border-t border-gray-400 pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        {orderData.map((prod, index) => (
          <div
            key={index}
            className="py-4  border-t border-gray-200 text-gray-700 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img src={prod.image[0]} alt="" className="w-16 sm:w-26" />
              <div>
                <p className="sm:text-base font-medium">{prod.name}</p>
                <div className="flex items-center text-base gap-3 mt-2">
                  <p className="text-lg">
                    {currency}
                    {prod.price}
                  </p>
                  <p>Quantity : {prod.quantity}</p>
                  <p>Size : {prod.size}</p>
                </div>
                <p className="mt-2">
                  Date :
                  <span className="text-gray-400">
                    {new Date(prod.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </p>
                <p className="mt-2">
                  Payment :
                  <span className="text-gray-400">
                    {prod.paymentMethod.toUpperCase()}
                  </span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">{prod.status}</p>
              </div>
              <button
                className="border border-gray-200 px-4 py-2 text-sm font-medium rounded-sm"
                onClick={() => {
                  fetchOrders();
                }}
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Orders;
