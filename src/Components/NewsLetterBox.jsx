function NewsLetterBox() {
  const onSumbitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="text-center mt-12">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now and get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Join our community to receive exclusive offers, early access to new
        arrivals, and style tips straight to your inbox.
      </p>
      <form className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
        <input
          type="email"
          required
          placeholder="Enter your Email"
          className="w-full sm:flex-1 outline-none"
        />
        <button
          onClick={onSumbitHandler}
          type="submit"
          className="bg-black text-white text-xs px-10 py-4"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
}

export default NewsLetterBox;
