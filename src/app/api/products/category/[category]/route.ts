import { NextResponse } from 'next/server';
import { productService } from '@/services/productService';

export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  try {
    const products = await productService.getProductsByCategory(params.category);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products by category' },
      { status: 500 }
    );
  }
} 