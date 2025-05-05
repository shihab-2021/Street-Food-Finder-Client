"use client";
import {
  LayoutDashboardIcon,
  LogIn,
  LogOut,
  LogOutIcon,
  Menu,
  Salad,
  SearchIcon,
  UserCircle2Icon,
  UserPlus,
  X,
} from "lucide-react";
import Link from "next/link";
import Logo from "@/assets/LogoProDarkBG.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, useCurrentToken } from "@/redux/features/auth/authSlice";
import { useProfileQuery } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";

interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
}

export default function NavbarClient() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const token = useAppSelector(useCurrentToken);
  const { data: profile } = useProfileQuery(token);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Navigation items
  const navItems: NavItem[] = [
    { name: "Tastes", path: "/tastes", icon: Salad },
    { name: "Pro Posts", path: "/proPosts", icon: Salad },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  return (
    <>
      <nav
        className={`fixed bg-[#232536] top-0 left-0 right-0 z-50 transition-all font-arima duration-300 ease-in-out
      ${isScrolled ? " shadow-lg" : "shadow-sm "}`}
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
              <button className="text-gray-100 hover:text-amber-600 transition-colors duration-200 relative">
                <SearchIcon className="h-5 w-5" />
              </button>
              {token ? (
                <div className="relative">
                  <button
                    onClick={() => toggleProfile()}
                    className="flex items-center space-x-2 focus:outline-none cursor-pointer"
                  >
                    {profile?.data?.profilePhoto ? (
                      <Image
                        src={profile?.data?.profilePhoto}
                        // profile?.data?.name
                        alt="image"
                        className="h-10 w-10 rounded-full object-cover border"
                        width={50}
                        height={50}
                      />
                    ) : (
                      <UserCircle2Icon className="h-10 w-10 text-gray-100" />
                    )}
                    <span className="text-gray-50">{profile?.data?.name}</span>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <Link
                        href={
                          profile?.data?.role === "ADMIN"
                            ? "/dashboard/admin"
                            : "/dashboard/customer/profile"
                        }
                        className="flex items-center gap-1 w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                      >
                        <LayoutDashboardIcon className="h-5 w-5" />
                        <span>Dashboard</span>
                      </Link>
                      <button
                        onClick={() => {
                          dispatch(logout());
                          router.push("/");
                        }}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 gap-1"
                      >
                        <LogOutIcon className="h-5 w-5" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/login"
                    className="flex items-center space-x-1 text-gray-100 hover:text-amber-600"
                  >
                    <LogIn />
                    <span>Login</span>
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center space-x-1 bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-500 transition-colors"
                  >
                    <UserPlus />
                    <span>Register</span>
                  </Link>
                </div>
              )}
            </div>
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
          } fixed top-16 left-0 right-0 z-50`}
        >
          <div className="bg-white/90 backdrop-blur-md shadow-lg p-4">
            <div className="space-y-3">
              <div className="space-y-3 block md:hidden">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 
                    transition-colors duration-200 group px-4 py-2 rounded-md
                    hover:bg-blue-50/50"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                    <span>{item.name}</span>
                  </Link>
                ))}
                {token && (
                  <>
                    <Link
                      href={
                        profile?.data?.role === "ADMIN"
                          ? "/dashboard/admin"
                          : "/dashboard/customer/profile"
                      }
                      className="flex items-center space-x-2 text-gray-600 px-4 py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <LayoutDashboardIcon className="h-5 w-5" />
                      <span>Dashboard</span>
                    </Link>
                  </>
                )}
              </div>
              <hr className="border-gray-200 block md:hidden" />
              <div className="space-y-3 pt-2 md:pt-0">
                {!token && (
                  <>
                    <Link
                      href="/login"
                      className="flex items-center space-x-2 text-gray-600 px-4 py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <LogIn className="h-5 w-5" />
                      <span>Login</span>
                    </Link>
                    <Link
                      href="/register"
                      className="flex items-center space-x-2 text-blue-600  px-4 py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <UserPlus className="h-5 w-5" />
                      <span>Register</span>
                    </Link>
                  </>
                )}
                {token && (
                  <button
                    onClick={() => {
                      dispatch(logout());
                      router.push("/");
                    }}
                    className="flex items-center space-x-2 text-gray-600 px-4 py-2"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign out</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
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
