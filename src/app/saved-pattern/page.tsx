"use client";

import SavedList from "@/components/SavedList";

export default function SavedPatternPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 font-[family-name:var(--font-geist-sans)]">
        Các mẫu đã lưu
      </h1>
      <SavedList />
    </div>
  );
} 