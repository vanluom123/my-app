'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Product } from '@/services/productService';
import ProductCard from '@/components/ProductCard';
import { MdArrowBack } from 'react-icons/md';

export default function CollectionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [collection, setCollection] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCollectionData = async () => {
      // Get collection data from localStorage
      const savedCollections = localStorage.getItem('collections');
      if (savedCollections) {
        const collections = JSON.parse(savedCollections);
        const currentCollection = collections.find((c: any) => c.id === params.id);
        setCollection(currentCollection);

        // Get product data
        const response = await fetch('/api/products');
        const allProducts = await response.json();
        const collectionProducts = allProducts.filter((product: Product) => 
          currentCollection.products.includes(product.id)
        );
        setProducts(collectionProducts);
      }
      setLoading(false);
    };

    loadCollectionData();
  }, [params.id]);

  if (loading) return <div>Đang tải...</div>;
  if (!collection) return <div>Không tìm thấy bộ sưu tập</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <MdArrowBack size={20} />
          <span className="font-medium">Quay lại</span>
        </button>
        <h1 className="text-2xl font-bold text-gray-900">{collection.name}</h1>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
} 