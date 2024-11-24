'use client';

import { useState, useEffect } from 'react';
import { Collection } from '@/types/collection';
import { Product } from '@/services/productService';
import Image from 'next/image';
import Link from 'next/link';

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
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Bộ sưu tập của tôi</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map(collection => (
          <Link 
            href={`/collections/${collection.id}`}
            key={collection.id} 
            className="block group"
          >
            <div className="border rounded-lg p-4 hover:shadow-lg transition-all duration-300">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">{collection.name}</h2>
              <div className="grid grid-cols-2 gap-3">
                {collection.products.slice(0, 4).map(productId => {
                  const product = products[productId];
                  if (!product) return null;

                  return (
                    <div key={productId} className="aspect-square overflow-hidden rounded border bg-white">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={150}
                        height={150}
                        className="w-full h-full object-contain p-2"
                        loading="lazy"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 