/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { updateMyProfile } from "@/service/Customer/ProfileUpdate";
import { FileEdit } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";

const ProfileCard = ({ profile }: { profile: any }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imagePreviewRef = useRef<HTMLImageElement>(null);
  const [preview, setPreview] = useState<string | null>(null);


  const openModal = () => dialogRef.current?.showModal();
  const closeModal = () => dialogRef.current?.close();

  const handleImagePreview = () => {
    const file = fileInputRef.current?.files?.[0];
    if (file && imagePreviewRef.current) {
      const reader = new FileReader();
      reader.onload = () => {
        if (imagePreviewRef.current) {
          imagePreviewRef.current.src = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    const name = nameInputRef.current?.value;
    const file = fileInputRef.current?.files?.[0];

    if (!name) return;

    const formData = new FormData();
    formData.append("data", JSON.stringify({ name }));
    if (file) {
      formData.append("file", file);
    }

    try {
      const res = await updateMyProfile(formData);
      toast.success("Profile updated successfully!");
      closeModal();
    } catch (error) {
        toast.error("Profile update failed!");
    }
  };

  return (
    <div className="relative bg-white shadow-lg rounded-2xl max-w-md w-full p-6 text-center">
      <Button
        className="absolute top-4 right-4 text-[#FFBC00] hover:text-black transition"
        onClick={openModal}
        title="Edit Profile"
      >
        <FileEdit size={20} />
      </Button>

      <div className="flex justify-center mb-4">
        <div className="rounded-full overflow-hidden border-4 border-[#FFBC00] w-32 h-32">
          <Image
            height={128}
            width={128}
            alt="Profile Photo"
            src={profile?.profilePhoto || "/default-profile.png"}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-2">My Profile</h1>
      <div className="text-left space-y-2 text-gray-700">
        <p>
          <span className="font-semibold text-[#FFBC00]">Name:</span>{" "}
          {profile?.name}
        </p>
        <p>
          <span className="font-semibold text-[#FFBC00]">Email:</span>{" "}
          {profile?.email}
        </p>
        <p>
          <span className="font-semibold text-[#FFBC00]">Role:</span>{" "}
          {profile?.role}
        </p>
      </div>

      <div className="flex justify-center">
        <dialog
          ref={dialogRef}
          className="rounded-xl p-6 shadow-lg w-96 backdrop:bg-black/30"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            position: "fixed",
          }}
        >
          <form method="dialog" className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Update Profile</h3>

            <input
              ref={nameInputRef}
              defaultValue={profile?.name}
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#FFBC00]"
              placeholder="Enter your name"
            />

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImagePreview}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-[#FFBC00] file:text-white file:rounded hover:file:bg-yellow-600"
            />

{preview && (
  <Image
    ref={imagePreviewRef}
    src={preview} 
    alt="Preview"
    width={96}
    height={96}
    className="w-24 h-24 mx-auto rounded-full object-cover border border-gray-300"
  />
)}


            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleUpdate}
                className="bg-[#FFBC00] text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Save
              </button>
            </div>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default ProfileCard;
