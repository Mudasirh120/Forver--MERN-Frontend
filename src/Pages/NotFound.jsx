function NotFound() {
  return (
    <div className="my-10 flex flex-col items-center justify-center">
      <h1 className="font-bold text-9xl mb-4 text-gray-700">404</h1>
      <h2 className="font-semibold text-4xl mb-8 text-gray-400">Not Found</h2>
      <p className="font-light text-xl text-gray-800">
        The resource requested could not be found on this server
      </p>
    </div>
  );
}

export default NotFound;
