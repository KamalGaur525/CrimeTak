"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/slugify";
import RichTextEditor from "../_components/RichTextEditor";
 
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

 
export default function CreateArticlePage() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
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
    watch,
    formState: { errors },
  } = useForm<ArticleFormData>();

  const titleValue = watch("title");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setValue("title", title);
    setValue("slug", slugify(title));
  };
const [categories, setCategories] = useState<any[]>([]);

useEffect(() => {
  async function fetchCategories() {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
  }

  fetchCategories();
}, []);

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

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      setImageUrl(data.url);
    } catch {
      setSubmitStatus({ type: "error", message: "Image upload failed" });
    } finally {
      setUploading(false);
    }
  };

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
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          content,
          image: imageUrl,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to create article");
      }

      setSubmitStatus({
        type: "success",
        message: "Article published successfully!",
      });

      setTimeout(() => {
        router.push("/admin/articles");
      }, 1500);
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error ? error.message : "Failed to create article",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl">

      {/* Header */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A]">
          Create Article
        </h1>

        <p className="text-[#64748B] mt-1">
          Write and publish a new article to the portal
        </p>
      </div>


      {/* Status */}

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
          <label className="block text-sm font-medium text-[#0F172A] mb-2">
            Title <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            onChange={handleTitleChange}
            className="w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter article title"
          />

          {errors.title && (
            <p className="mt-1 text-sm text-red-500">
              {errors.title.message}
            </p>
          )}
        </div>


        {/* Slug */}

        <div>
          <label className="block text-sm font-medium text-[#0F172A] mb-2">
            Slug <span className="text-red-500">*</span>
          </label>

          <input
  type="text"
  {...register("slug", { required: "Slug is required" })}
  readOnly
  className="w-full px-4 py-3 bg-gray-100 border border-[#E2E8F0] rounded-lg text-gray-500 cursor-not-allowed"
  placeholder="auto-generated-slug"
/>

          {errors.slug && (
            <p className="mt-1 text-sm text-red-500">
              {errors.slug.message}
            </p>
          )}
        </div>


        {/* Author + Category */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">
              Author <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              {...register("author", { required: "Author is required" })}
              className="w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Author name"
            />

            {errors.author && (
              <p className="mt-1 text-sm text-red-500">
                {errors.author.message}
              </p>
            )}
          </div>


          <div>
            <label className="block text-sm font-medium text-[#0F172A] mb-2">
              Category <span className="text-red-500">*</span>
            </label>

            <select
  {...register("category", { required: "Category is required" })}
  className="w-full px-4 py-3 bg-white border border-[#E2E8F0] rounded-lg text-[#0F172A]"
>
  <option value="">Select category</option>

  {categories.map((cat) => (
    <option key={cat.id} value={cat.id}>
      {cat.name}
    </option>
  ))}

</select>

            {errors.category && (
              <p className="mt-1 text-sm text-red-500">
                {errors.category.message}
              </p>
            )}
          </div>

        </div>


        {/* Image Upload */}

        <div>

          <label className="block text-sm font-medium text-[#0F172A] mb-2">
            Thumbnail Image <span className="text-red-500">*</span>
          </label>

          <div className="border-2 border-dashed border-[#E2E8F0] rounded-lg p-6 hover:border-red-400 transition">

            {imageUrl ? (

              <div className="relative">

                <img
                  src={imageUrl}
                  alt="Thumbnail preview"
                  className="w-full h-48 object-cover rounded-lg"
                />

                <button
                  type="button"
                  onClick={() => setImageUrl("")}
                  className="absolute top-2 right-2 bg-white border border-gray-200 px-3 py-1 rounded text-xs hover:bg-gray-50"
                >
                  Remove
                </button>

              </div>

            ) : (

              <label className="flex flex-col items-center cursor-pointer">

                {uploading ? (
                  <Loader2 size={40} className="text-gray-400 animate-spin" />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center mb-3">
                    <ImageIcon size={24} className="text-gray-500" />
                  </div>
                )}

                <p className="text-[#64748B] text-sm font-medium">
                  {uploading
                    ? "Uploading..."
                    : "Click to upload thumbnail image"}
                </p>

                <p className="text-gray-400 text-xs mt-1">
                  JPG, PNG, GIF, WebP (max 5MB)
                </p>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
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

          <RichTextEditor value={content} onChange={setContent} />
        </div>


        {/* Submit */}

        <div className="flex items-center gap-4 pt-4">

          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition disabled:opacity-50 flex items-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <Upload size={18} />
                Publish Article
              </>
            )}
          </button>

        </div>

      </form>
    </div>
  );
}