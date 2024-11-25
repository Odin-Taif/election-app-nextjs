import React from "react";
import Link from "next/link";

export function Navbar() {
  const links = [
    { name: "Add Election", url: "/" },
    { name: "Registry", url: "/elections-registry" },
    { name: "Election Results", url: "/elections-results" },
    { name: "Add Representative", url: "/nominate-representative" },
  ];

  return (
    <div className="border-b border-amber-400 mb-2">
      <div className="flex items-center justify-end md:justify-between gap-x-2 py-2 px-4 relative">
        <div className="flex items-center md:space-x-10 lg:space-x-20">
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
      </div>
    </div>
  );
}
