import { NextResponse } from 'next/server';
import { productService } from '@/services/productService';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await productService.getProductById(Number(params.id));
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
} 