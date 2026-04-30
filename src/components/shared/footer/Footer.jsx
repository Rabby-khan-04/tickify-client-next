import Link from "next/link";
import Image from "next/image";
import logo from "@/../public/brand/logo.png";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="p-top bg-dark-light">
      <div className="container-fluid grid sm:grid-cols-3 lg:grid-cols-5 gap-6 pb-8">
        {/* Brand */}
        <div className="sm:col-span-3 lg:col-span-2">
          <Image src={logo} alt="logo" className="h-12 w-auto mb-2" />

          <p className="text-white">
            Your go-to platform for booking movie tickets quickly and easily.
            Discover the latest releases, grab the best seats, and enjoy the
            show!
          </p>
        </div>

        {/* More */}
        <div>
          <h2 className="text-2xl font-medium mb-4 text-white">More</h2>
          <ul className="text-sm space-y-2 text-white/70">
            <li>
              <Link href="/">Career</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/">News</Link>
            </li>
            <li>
              <Link href="/">Privacy & policy</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-2xl font-medium mb-4 text-white">Contact Us</h2>
          <ul className="text-sm space-y-2 text-white/70">
            <li>
              <a href="tel:+8801647211326">(+880) 1647211326</a>
            </li>
            <li>
              <a href="tel:+8801319438030">01319438030</a>
            </li>
            <li>
              <a href="mailto:ajrabbyk72@gmail.com">ajrabbyk72@gmail.com</a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h2 className="text-2xl font-medium mb-4 text-white">Follow Us</h2>
          <ul className="text-sm space-y-2 text-white/70">
            <li className="flex items-center gap-2">
              <FaFacebook className="text-xl" />
              <span>Facebook</span>
            </li>
            <li className="flex items-center gap-2">
              <FaInstagram className="text-xl" />
              <span>Instagram</span>
            </li>
            <li className="flex items-center gap-2">
              <FaTwitter className="text-xl" />
              <span>Twitter</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-dark py-3">
        <div className="container-fluid flex items-center justify-center sm:justify-between flex-wrap gap-2 text-white/70">
          <p>
            &copy; All Rights Reserved By <span className="italic">me</span>
          </p>

          <p>
            Design & Developed by <span className="italic">me</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
