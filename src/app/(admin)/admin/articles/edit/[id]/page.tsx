"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { slugify } from "@/lib/slugify";
import RichTextEditor from "../../../_components/RichTextEditor";

import {
Upload,
Image as ImageIcon,
Loader2,
CheckCircle2,
AlertCircle,
} from "lucide-react";

interface ArticleFormData {
title: string;
slug: string;
author: string;
category: string;
}

export default function EditArticlePage() {
const { id } = useParams();
const router = useRouter();

const [content, setContent] = useState("");
const [imageUrl, setImageUrl] = useState("");
const [categories, setCategories] = useState<any[]>([]);
const [loading, setLoading] = useState(true);

const [uploading, setUploading] = useState(false);
const [submitting, setSubmitting] = useState(false);

const [submitStatus, setSubmitStatus] = useState<{
type: "success" | "error";
message: string;
} | null>(null);

const {
register,
handleSubmit,
setValue,
formState: { errors },
} = useForm<ArticleFormData>();

/* LOAD ARTICLE */

useEffect(() => {
async function loadArticle() {
try {
const res = await fetch(`/api/articles/${id}`);
const data = await res.json();


    setValue("title", data.title);
    setValue("slug", data.slug);
    setValue("author", data.author);
    setValue("category", String(data.categoryId));

    setContent(data.content);
    setImageUrl(data.image);
  } catch {
    setSubmitStatus({
      type: "error",
      message: "Failed to load article",
    });
  } finally {
    setLoading(false);
  }
}

if (id) loadArticle();


}, [id, setValue]);

/* LOAD CATEGORIES */

useEffect(() => {
async function fetchCategories() {
const res = await fetch("/api/categories");
const data = await res.json();
setCategories(data);
}


fetchCategories();


}, []);

/* TITLE AUTO SLUG */

const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
const title = e.target.value;
setValue("title", title);
setValue("slug", slugify(title));
};

/* IMAGE UPLOAD */

const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
const file = e.target.files?.[0];
if (!file) return;


setUploading(true);

const formData = new FormData();
formData.append("file", file);

try {
  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  setImageUrl(data.url);
} catch {
  setSubmitStatus({
    type: "error",
    message: "Image upload failed",
  });
} finally {
  setUploading(false);
}


};

/* UPDATE ARTICLE */

const onSubmit = async (data: ArticleFormData) => {
if (!content || content === "<p><br></p>") {
setSubmitStatus({
type: "error",
message: "Article content is required",
});
return;
}


if (!imageUrl) {
  setSubmitStatus({
    type: "error",
    message: "Thumbnail image is required",
  });
  return;
}

setSubmitting(true);
setSubmitStatus(null);

try {
  const res = await fetch(`/api/articles/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
      content,
      image: imageUrl,
    }),
  });

  if (!res.ok) throw new Error("Update failed");

  setSubmitStatus({
    type: "success",
    message: "Article updated successfully!",
  });

  setTimeout(() => {
    router.push("/admin/articles");
  }, 1500);

} catch {
  setSubmitStatus({
    type: "error",
    message: "Failed to update article",
  });
} finally {
  setSubmitting(false);
}


};

if (loading) {
return ( <div className="flex justify-center py-20"> <Loader2 className="animate-spin text-gray-400" size={40} /> </div>
);
}

return ( <div className="max-w-4xl">


  <div className="mb-8">
    <h1 className="text-3xl font-bold text-[#0F172A]">
      Edit Article
    </h1>
    <p className="text-[#64748B] mt-1">
      Update your article details
    </p>
  </div>

  {submitStatus && (
    <div
      className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
        submitStatus.type === "success"
          ? "bg-green-50 border border-green-200 text-green-600"
          : "bg-red-50 border border-red-200 text-red-600"
      }`}
    >
      {submitStatus.type === "success" ? (
        <CheckCircle2 size={20} />
      ) : (
        <AlertCircle size={20} />
      )}
      <span className="text-sm font-medium">
        {submitStatus.message}
      </span>
    </div>
  )}

  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

    {/* Title */}

    <div>
      <label className="block text-sm font-medium mb-2">
        Title *
      </label>

      <input
        {...register("title", { required: "Title required" })}
        onChange={handleTitleChange}
        className="w-full px-4 py-3 border rounded-lg"
      />

      {errors.title && (
        <p className="text-red-500 text-sm mt-1">
          {errors.title.message}
        </p>
      )}
    </div>

    {/* Slug */}

   <div>
  <label className="block text-sm font-medium mb-2">
    Slug *
  </label>

  <input
    {...register("slug", { required: "Slug required" })}
    readOnly
    className="w-full px-4 py-3 border rounded-lg bg-gray-100 cursor-not-allowed"
  />
</div>

    {/* Author + Category */}

 <div className="grid md:grid-cols-2 gap-6">

  {/* Author */}

  <div>
    <label className="block text-sm font-medium text-[#0F172A] mb-2">
      Author <span className="text-red-500">*</span>
    </label>

    <input
      {...register("author", { required: "Author required" })}
      placeholder="Author"
      className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg"
    />
  </div>


  {/* Category */}

  <div>
    <label className="block text-sm font-medium text-[#0F172A] mb-2">
      Category <span className="text-red-500">*</span>
    </label>

    <select
      {...register("category", { required: "Category required" })}
      className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg"
    >
      <option value="">Select category</option>

      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}

    </select>
  </div>

</div>

    {/* Image Upload */}

   {/* Image Upload */}

<div>

<label className="block text-sm font-medium text-[#0F172A] mb-2">
Thumbnail Image *
</label>

<div className="border-2 border-dashed border-[#E2E8F0] rounded-lg p-6">

{imageUrl ? (

<div className="relative">

<img
src={imageUrl}
className="w-full h-48 object-cover rounded-lg"
/>

<div className="absolute top-2 right-2 flex gap-2">

<button
type="button"
onClick={() => setImageUrl("")}
className="bg-white border px-3 py-1 text-xs rounded"
>
Delete
</button>

<label className="bg-white border px-3 py-1 text-xs rounded cursor-pointer">
Reupload

<input
type="file"
accept="image/*"
onChange={handleImageUpload}
className="hidden"
/>

</label>

</div>

</div>

) : (

<label className="flex flex-col items-center cursor-pointer">

{uploading ? (
<Loader2 size={40} className="animate-spin" />
) : (
<ImageIcon size={40} />
)}

<p className="text-sm mt-2">
Click to upload image
</p>

<input
type="file"
accept="image/*"
onChange={handleImageUpload}
className="hidden"
/>

</label>

)}

</div>

</div>

    {/* Editor */}
 <div>
  <label className="block text-sm font-medium text-[#0F172A] mb-2">
    Content <span className="text-red-500">*</span>
  </label>

  <div className="  rounded-lg overflow-hidden">
    <RichTextEditor value={content} onChange={setContent} />
  </div>
</div>
    <button
      disabled={submitting}
      className="px-8 py-3 bg-red-500 text-white rounded-lg flex gap-2"
    >
      {submitting ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          Updating...
        </>
      ) : (
        <>
          <Upload size={18} />
          Update Article
        </>
      )}
    </button>

  </form>

</div>


);
}
