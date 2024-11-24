"use client";

import SavedItem from "./SavedItem";
import { useSavePattern } from "@/hooks/useSavePattern";

export interface SavedPattern {
  id: string;
  title: string;
  timestamp: string;
}

export default function SavedList() {
  const { savedPatterns, removePattern } = useSavePattern();

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa mẫu này?')) {
      removePattern(id);
    }
  };

  const handleView = (id: string) => {
    console.log('Xem mẫu:', id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {savedPatterns.map((pattern) => (
        <SavedItem 
          key={pattern.id} 
          pattern={pattern} 
          onDelete={handleDelete}
          onView={handleView}
        />
      ))}
      {savedPatterns.length === 0 && (
        <p className="text-gray-500 col-span-full text-center py-8">
          Chưa có mẫu nào được lưu
        </p>
      )}
    </div>
  );
} 