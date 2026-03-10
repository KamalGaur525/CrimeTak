"use client";

import { useState, useEffect } from "react";
import { slugify } from "@/lib/slugify";

export default function CategoriesPage() {

  const [name, setName] = useState("");
  const [categories, setCategories] = useState<any[]>([]);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async (e: any) => {
    e.preventDefault();

    if (!name.trim()) return;

    const slug = slugify(name);

    await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, slug }),
    });

    setName("");
    fetchCategories();
  };

  const deleteCategory = async (cat: any) => {

  const confirmDelete = confirm(
    `If you delete "${cat.name}", all articles in this category will also be deleted.\n\nAre you sure you want to continue?`
  );

  if (!confirmDelete) return;

  const res = await fetch(`/api/categories/${cat.id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.error);
    return;
  }

  fetchCategories();
};

  const editCategory = async (cat: any) => {

    const newName = prompt("Edit category name", cat.name);

    if (!newName) return;

    const slug = slugify(newName);

    await fetch(`/api/categories/${cat.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName,
        slug,
      }),
    });

    fetchCategories();
  };

  return (

    <div className="max-w-3xl">

      <h1 className="text-3xl font-bold mb-6">
        Categories
      </h1>

      <form
        onSubmit={addCategory}
        className="flex gap-3 mb-8"
      >

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
          className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:border-red-500 outline-none"
        />

        <button className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
          Add
        </button>

      </form>

      <div className="space-y-3">

        {categories.map((cat) => (

          <div
            key={cat.id}
            className="flex justify-between items-center px-4 py-3 border border-gray-200 rounded-lg"
          >

            <span className="font-medium">
              {cat.name}
            </span>

            <div className="flex gap-4 text-sm">

              <button
                onClick={() => editCategory(cat)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>

              <button
                onClick={() => deleteCategory(cat)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}