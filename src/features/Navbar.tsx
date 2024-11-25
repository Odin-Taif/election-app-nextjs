"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Logo } from "./Logo";
import useLoginModel from "@/app/hook/useLoginModal";
import axios from "axios";
import { useShoppingCart } from "@/app/context/shopincartConext";
import { UserSection } from "./user/UserSection";
import { BsChevronCompactUp } from "react-icons/bs";
type Props = {};

const Navbar = (props: Props) => {
  const links = [
    { name: "Home", url: "/" },
    { name: "Shop", url: "/" },
    { name: "About", url: "/aboutus" },
    { name: "Contact", url: "/contact" },
  ];
  const [showNav, setShowNav] = useState<boolean>(false);
  const { openCart, cartQuantity, watchlistQuantity, cartItems } =
    useShoppingCart();

  const loginModel = useLoginModel();
  const { data: session } = useSession();
  useEffect(() => {
    const getAllCartProducts = async () => {
      try {
        // Assuming userId is a variable containing the user's ID
        const response = await axios.get("/api/cartproducts", {
          params: { userId: session?.user?.id }, // Use params to pass userId as a query parameter
        });
        const data = response.data;
        // console.log(data, "this is data");
        // setCartitemsToprismaItems(data.products);
      } catch (error) {
        console.error("Error fetching cart products:", error);
      }
    };
    if (session?.user) {
      getAllCartProducts();
    }
  }, [session?.user, cartItems]);

  return (
    <div className="border-b border-amber-400 mb-2">
      <div className="flex items-center justify-end md:justify-between gap-x-2 py-2 px-4 relative">
        <div className="flex items-center md:space-x-10 lg:space-x-20">
          <Logo />
          {/* screen device nav */}
          <nav className="max-md:hidden">
            <div className="flex items-center lg:space-x-10 space-x-7 opacity-70 text-[15px]">
              {links.map((link, index) => (
                <Link href={link.url} key={index}>
                  <p className="py-3 inline-block w-full hover:text-yellow-600">
                    {link.name}
                  </p>
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {/* user section */}
        <UserSection />
        {/* user section */}
        <span
          onClick={() => setShowNav(!showNav)}
          className="p-[9px] bg-gray-100 rounded-full md:hidden"
        >
          <BsChevronCompactUp
            className={`transition ease-in duration-150 ${
              showNav ? "rotate-180" : "0"
            }`}
          />
        </span>
      </div>

      {/* mobile nav */}
      <div
        className={`md:hidden bg-gray-100 ${
          showNav ? "pb-4 px-5" : "h-0 invisible opacity-0"
        }`}
      >
        <div className="flex flex-col text-[15px] opacity-75 px-2 justify-center items-center">
          {links &&
            links.map((link, index) => (
              <Link href={link.url} key={index}>
                <p className="py-3 inline-block w-full font-bold hover:text-yellow-600">
                  {link.name}
                </p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
