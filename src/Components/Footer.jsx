import { assets } from "../assets/assets.js";
function Footer() {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} alt="" className="mb-5 w-32" />
          <p className="w-full md:w-2/3 text-gray-600">
            We are ForeverBuy, your destination for premium fashion
            essentials—from smart casual jackets to refined denim outerwear. We
            believe in quality craftsmanship and timeless style, delivering
            curated looks that are both on‑trend and enduring.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-000-000-0000</li>
            <li>
              <a href="mailto:mudasirh120@gmail.com?subject=Appreciation for Your Work&body=Hi Mudasir,%0D%0AI just checked out your eCommerce project and wanted to say — great work!.%0D%0ALooking forward to connecting.%0D%0A%0D%0ABest,">
                mudasirh120@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <hr className="text-gray-200" />
        <p className="py-5 text-sm text-center">
          Copyright 2024@ Mudasir Hussain - All Right Reserved.
        </p>
      </div>
    </div>
  );
}
export default Footer;
