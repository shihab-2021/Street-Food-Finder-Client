"use client";
import dynamic from "next/dynamic";

const NavbarClient = dynamic(() => import("./NavbarClient"), { ssr: false });
// import NavbarClient from "./NavbarClient";

export default function Navbar() {
  return (
    <>
      <NavbarClient />
    </>
  );
}
