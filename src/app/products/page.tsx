'use client';

import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/ProductCard';

export default function ProductsPage() {
  const { products, loading, error } = useProducts();

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="title-large mb-8">Sản phẩm</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
} 