'use client';

import { useState, useEffect } from 'react';
import { Collection } from '@/types/collection';
import { Product } from '@/services/productService';
import Image from 'next/image';

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [products, setProducts] = useState<Record<number, Product>>({});

  useEffect(() => {
    // Load collections
    const savedCollections = localStorage.getItem('collections');
    if (savedCollections) {
      setCollections(JSON.parse(savedCollections));
    }

    // Load products for all collections
    const loadProducts = async () => {
      const response = await fetch('/api/products');
      const allProducts = await response.json();
      const productsMap = allProducts.reduce((acc: Record<number, Product>, product: Product) => {
        acc[product.id] = product;
        return acc;
      }, {});
      setProducts(productsMap);
    };

    loadProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Bộ sưu tập của tôi</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.map(collection => (
          <div key={collection.id} className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">{collection.name}</h2>
            <div className="grid grid-cols-2 gap-4">
              {collection.products.map(productId => {
                const product = products[productId];
                if (!product) return null;

                return (
                  <div key={productId} className="border rounded p-2">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="w-full h-24 object-contain mb-2"
                      priority={false}
                      quality={75}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
                    />
                    <p className="text-sm truncate">{product.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 