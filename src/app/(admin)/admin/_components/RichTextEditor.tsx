"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
    ssr: false,
    loading: () => (
        <div className="h-64 bg-gray-800 border border-gray-700 rounded-xl animate-pulse flex items-center justify-center">
            <p className="text-gray-500 text-sm">Loading editor...</p>
        </div>
    ),
});

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "link", "image"],
        ["clean"],
    ],
};

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "blockquote",
    "link",
    "image",
];

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function RichTextEditor({
    value,
    onChange,
}: RichTextEditorProps) {
    return (
        <div className="rich-text-editor">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder="Write your article content here..."
                className="bg-white rounded-xl text-gray-900"
            />
            <style jsx global>{`
        .rich-text-editor .ql-toolbar {
          border: 1px solid #374151 !important;
          border-radius: 12px 12px 0 0 !important;
          background: #1f2937 !important;
        }
        .rich-text-editor .ql-toolbar .ql-stroke {
          stroke: #9ca3af !important;
        }
        .rich-text-editor .ql-toolbar .ql-fill {
          fill: #9ca3af !important;
        }
        .rich-text-editor .ql-toolbar .ql-picker-label {
          color: #9ca3af !important;
        }
        .rich-text-editor .ql-toolbar button:hover .ql-stroke,
        .rich-text-editor .ql-toolbar .ql-active .ql-stroke {
          stroke: #ef4444 !important;
        }
        .rich-text-editor .ql-toolbar button:hover .ql-fill,
        .rich-text-editor .ql-toolbar .ql-active .ql-fill {
          fill: #ef4444 !important;
        }
        .rich-text-editor .ql-container {
          border: 1px solid #374151 !important;
          border-top: none !important;
          border-radius: 0 0 12px 12px !important;
          background: #111827 !important;
          min-height: 250px;
          font-size: 15px;
          color: #e5e7eb !important;
        }
        .rich-text-editor .ql-editor {
          min-height: 250px;
          color: #e5e7eb !important;
        }
        .rich-text-editor .ql-editor.ql-blank::before {
          color: #6b7280 !important;
          font-style: normal !important;
        }
        .rich-text-editor .ql-editor h1,
        .rich-text-editor .ql-editor h2,
        .rich-text-editor .ql-editor h3 {
          color: #f9fafb !important;
        }
        .rich-text-editor .ql-editor a {
          color: #ef4444 !important;
        }
        .rich-text-editor .ql-editor blockquote {
          border-left-color: #ef4444 !important;
          color: #9ca3af !important;
        }
        .rich-text-editor .ql-snow .ql-picker-options {
          background: #1f2937 !important;
          border-color: #374151 !important;
        }
        .rich-text-editor .ql-snow .ql-picker-item {
          color: #9ca3af !important;
        }
        .rich-text-editor .ql-snow .ql-picker-item:hover {
          color: #ef4444 !important;
        }
      `}</style>
        </div>
    );
}
