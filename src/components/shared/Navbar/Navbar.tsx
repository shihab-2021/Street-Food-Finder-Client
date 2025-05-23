import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/assets/LogoProDarkBG.png";
import UserStatusAndInfo from "./UserStatusAndInfo";
import MobileMenuButton from "./MobileMenuButton";
import MobileMenu from "./MobileMenu";

interface NavItem {
  name: string;
  path: string;
  //   icon: React.ElementType;
}

export default function Navbar() {
  // Navigation items
  const navItems: NavItem[] = [
    { name: "Tastes", path: "/tastes" },
    { name: "About Us", path: "/about" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact Us", path: "/contact" },
  ];
  return (
    <>
      <nav
        className={`fixed bg-[#232536] top-0 left-0 right-0 z-50 transition-all font-arima duration-300 ease-in-out`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo section */}
            <Link href="/" className="flex items-center space-x-2">
              <Image src={Logo} alt="logo" className="w-28" />
            </Link>
            {/* Right side icons */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className="flex items-center space-x-1 text-gray-100 hover:text-amber-600 transition-colors duration-200"
                  >
                    {/* <item.icon className="text-sm" /> */}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
              <UserStatusAndInfo />
            </div>
            {/* Mobile menu button */}
            <MobileMenuButton />
          </div>
        </div>
        {/* Mobile menu */}
        <MobileMenu navItems={navItems} />
      </nav>

      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(-100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
}
