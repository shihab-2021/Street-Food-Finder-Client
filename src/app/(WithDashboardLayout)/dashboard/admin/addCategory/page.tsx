"use client";
import React, { useState } from "react";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newCategory = { name, image };

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCategory),
      });

      if (!res.ok) throw new Error("Failed to create category");

      const data = await res.json();
      alert("Category created successfully!");
      setName("");
      setImage("");
    } catch (err) {
      console.error(err);
      alert("Error creating category");
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 border rounded shadow-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Create Category</h2>

        <div>
          <label className="block mb-1 font-medium">Category Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image URL (optional)</label>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer bg-amber-600 hover:bg-amber-500 text-white py-2 rounded font-semibold"
        >
          Create Category
        </button>
      </form>
    </div>
  );
}
