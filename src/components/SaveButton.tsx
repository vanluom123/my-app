"use client";

import { useState } from 'react';
import { MdBookmark, MdBookmarkBorder } from 'react-icons/md';
import { useSavePattern } from '@/hooks/useSavePattern';

interface SaveButtonProps {
  title: string;
}

export default function SaveButton({ title }: SaveButtonProps) {
  const { savedPatterns, savePattern } = useSavePattern();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      savePattern(title);
    } catch (error) {
      console.error('Lỗi khi lưu:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const isAlreadySaved = savedPatterns.some(pattern => pattern.title === title);

  return (
    <button
      onClick={handleSave}
      disabled={isSaving || isAlreadySaved}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors
        ${isAlreadySaved 
          ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
          : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
    >
      {isAlreadySaved ? (
        <>
          <MdBookmark size={20} />
          <span>Đã lưu</span>
        </>
      ) : (
        <>
          <MdBookmarkBorder size={20} />
          <span>{isSaving ? 'Đang lưu...' : 'Lưu mẫu'}</span>
        </>
      )}
    </button>
  );
} 