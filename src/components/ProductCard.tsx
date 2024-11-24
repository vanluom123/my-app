'use client';

import { useState, useEffect } from 'react';
import { MdBookmarkBorder, MdBookmark } from 'react-icons/md';
import { Product } from '@/services/productService';
import SaveProductModal from './SaveProductModal';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [collections, setCollections] = useState<any[]>([]);

  useEffect(() => {
    checkIfProductIsSaved();
  }, [product.id]);

  const checkIfProductIsSaved = () => {
    const savedCollections = localStorage.getItem('collections');
    if (savedCollections) {
      const parsedCollections = JSON.parse(savedCollections);
      setCollections(parsedCollections);
      // Kiểm tra xem sản phẩm có trong bất kỳ bộ sưu tập nào không
      const isInAnyCollection = parsedCollections.some(
        (collection: any) => collection.products.includes(product.id)
      );
      setIsSaved(isInAnyCollection);
    }
  };

  const handleSaveClick = () => {
    if (isSaved) {
      // Nếu đã lưu, xóa khỏi tất cả các bộ sưu tập
      const updatedCollections = collections.map(collection => ({
        ...collection,
        products: collection.products.filter((id: number) => id !== product.id)
      }));
      localStorage.setItem('collections', JSON.stringify(updatedCollections));
      setIsSaved(false);
    } else {
      // Nếu chưa lưu, mở modal
      setIsSaveModalOpen(true);
    }
  };

  const onSaveComplete = () => {
    checkIfProductIsSaved();
    setIsSaveModalOpen(false);
  };

  return (
    <div className="border rounded-lg p-4">
      <Image 
        src={product.image} 
        alt={product.title}
        width={300}
        height={300}
        className="w-full h-48 object-contain mb-4"
        priority={false}
        quality={75}
        loading="lazy"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
      />
      <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
      <p className="text-gray-600 mb-2">${product.price}</p>
      <p className="text-sm text-gray-500 mb-4">{product.category}</p>
      
      <button
        onClick={handleSaveClick}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-colors
          ${isSaved 
            ? 'bg-blue-500 text-white border-blue-500 hover:bg-blue-600' 
            : 'border-gray-300 hover:bg-gray-50'
          }`}
      >
        {isSaved ? (
          <>
            <MdBookmark size={20} />
            <span>Đã lưu</span>
          </>
        ) : (
          <>
            <MdBookmarkBorder size={20} />
            <span>Lưu</span>
          </>
        )}
      </button>

      <SaveProductModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        productId={product.id}
        onSaveComplete={onSaveComplete}
      />
    </div>
  );
} 