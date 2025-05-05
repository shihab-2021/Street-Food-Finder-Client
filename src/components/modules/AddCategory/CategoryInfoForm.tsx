"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createCategory, deleteCategory } from "@/service/Category";
import Image from "next/image";
import { useGetAllCategoryQuery } from "@/redux/features/category/categoryApi";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function CategoryInfoForm() {
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const {
    data: categories,
    isLoading,
    refetch,
  } = useGetAllCategoryQuery(undefined, {
    refetchOnFocus: true,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [file]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !name) {
      setMessage("Please fill out all fields.");
      return;
    }

    setIsSubmitting(true);
    setShowModal(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("data", JSON.stringify({ name }));

      for (const [key, value] of formData.entries()) {
      }

      const result = await createCategory(formData);

      setIsSubmitting(false);
      setShowModal(false);

      if (result.success) {
        setMessage("Category created successfully!");
        refetch();
        setName("");
        setFile(null);
      } else {
        setMessage(result.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setIsSubmitting(false);
      setShowModal(false);
      setMessage("An unexpected error occurred");
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      setLoadingId(postId);
      await deleteCategory(postId);
      refetch();
      setSelectedCategoryId(null);
    } catch (err) {
      console.error("Failed to delete post:", err);
      alert("Delete failed.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto p-6 rounded-2xl shadow-xl border">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#FFB900]">
          Add Category
        </h2>

        {previewUrl && (
          <div className="flex justify-center mb-4">
            <Image
              height={128}
              width={128}
              src={previewUrl}
              alt="Image Preview"
              className="max-w-full h-32 object-contain"
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label htmlFor="image" className="text-[#FFB900]">
              Upload Image
            </Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 bg-white text-black file:bg-[#FFB900] file:text-black file:p-1 file:rounded"
            />
          </div>

          <div>
            <Label htmlFor="name" className="text-[#FFB900]">
              Category Name
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              className="mt-2 bg-white text-black"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#FFB900] text-white font-bold cursor-pointer hover:bg-[#e6a800]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>

          {message && (
            <p className="text-center mt-3 text-sm text-[#FFB900]">{message}</p>
          )}
        </form>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-[#232536] text-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-[#FFB900]">
                Submitting...
              </h3>
              <div className="flex justify-center mt-4">
                <div className="w-16 h-16 border-4 border-t-4 border-[#FFB900] border-dashed rounded-full animate-spin"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="">
        <h2 className="text-2xl md:text-[37px] tracking-tighter font-semibold">
          Categories
        </h2>
        <div className="py-5 grid grid-cols-4 gap-4">
          {categories?.data?.map((category: any, index: number) => (
            <div key={category?.id} className="border p-2 shadow-lg rounded-lg">
              <div>
                <Image
                  className="mx-auto"
                  src={category?.image || "/assets/joinUs.png"}
                  alt="category image"
                  width={100}
                  height={100}
                />
              </div>
              <h1 className="font-bold text-center mt-2">{category?.name}</h1>
              <div className="w-fit mx-auto mt-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      onClick={() => setSelectedCategoryId(category.id)}
                      className="bg-red-600 text-white text-sm px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the category.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          if (selectedCategoryId)
                            handleDelete(selectedCategoryId);
                        }}
                        disabled={loadingId === selectedCategoryId}
                      >
                        {loadingId === selectedCategoryId
                          ? "Deleting..."
                          : "Delete"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
