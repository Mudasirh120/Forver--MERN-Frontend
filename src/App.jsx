import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Collection from "./Pages/Collection";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import Orders from "./Pages/Orders";
import PlaceOrder from "./Pages/PlaceOrder";
import NavigationBar from "./Components/NavigationBar";
import Footer from "./Components/Footer";
import NotFound from "./Pages/NotFound";
import SearchBar from "./Components/SearchBar";
function App() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <NavigationBar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:path" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
