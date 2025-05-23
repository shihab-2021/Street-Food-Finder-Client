"use client";
import { toggleState } from "@/redux/features/device/deviceSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Menu, X } from "lucide-react";

export default function MobileMenuButton() {
  const isOpen = useAppSelector((state) => state.isOpen.value);
  const dispatch = useAppDispatch();
  return (
    <div className="lg:hidden">
      <button
        onClick={() => dispatch(toggleState())}
        className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
    </div>
  );
}
