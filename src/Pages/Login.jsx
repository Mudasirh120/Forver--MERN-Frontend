import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { toast } from "react-toastify";
function Login() {
  const { token, setToken, navigate, api } = useContext(ShopContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [currentState, setCurrentState] = useState("Sign Up");
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const res = await api.post(`/api/user/register`, {
          email,
          name,
          password,
        });
        if (res.data.success) {
          setToken(true);
          toast.success(res.data.message);
          setEmail("");
          setName("");
          setPassword("");
        } else {
          toast.error(res.data.message);
        }
        console.log(res);
      } else {
        const res = await api.post(`/api/user/login`, {
          email,
          password,
        });
        if (res.data.success) {
          setToken(true);
          toast.success(res.data.message);
          setEmail("");
          setPassword("");
        } else {
          toast.error(res.response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    if (token) navigate("/");
  }, [token]);
  return (
    <form className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState != "Login" ? (
        <input
          name="name"
          required
          type="text"
          className="w-full px-3 py-2 border border-gray-800 placeholder:text-gray-600"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      ) : (
        ""
      )}
      <input
        name="email"
        required
        type="email"
        className="w-full px-3 py-2 border border-gray-800 placeholder:text-gray-600"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        name="password"
        required
        type="password"
        className="w-full px-3 py-2 border border-gray-800 placeholder:text-gray-600"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      {currentState == "Login" ? (
        <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p className="cursor-pointer">Forgot your Password</p>
          <p
            className="cursor-pointer"
            onClick={() => {
              setCurrentState("Sign Up");
            }}
          >
            Create Account
          </p>
        </div>
      ) : (
        <div className="w-full flex justify-end text-sm mt-[-8px]">
          <p
            className="cursor-pointer"
            onClick={() => {
              setCurrentState("Login");
            }}
          >
            Already have an Account
          </p>
        </div>
      )}
      <button
        onClick={(e) => {
          onSubmitHandler(e);
        }}
        type="submit"
        className="text-white bg-black font-light px-8 py-2 mt-4"
      >
        {currentState == "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
}
export default Login;
