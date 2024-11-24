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
    <div className="group relative bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
      <div className="aspect-[4/3] w-full overflow-hidden">
        <Image 
          src={product.image} 
          alt={product.title}
          width={240}
          height={180}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          priority={false}
          quality={85}
          loading="lazy"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
          placeholder="blur"
        />
      </div>
      
      <div className="p-4">
        <p className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <h2 className="font-medium text-gray-900 text-sm leading-snug mb-2 line-clamp-2 font-sans">
          {product.title}
        </h2>
        <div className="flex items-center justify-between mt-auto">
          <p className="text-base font-bold text-gray-900">
            ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
          </p>
          <button
            onClick={handleSaveClick}
            className={`p-1.5 rounded-full transition-colors
              ${isSaved 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
              }`}
          >
            {isSaved ? <MdBookmark size={16} /> : <MdBookmarkBorder size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
} 