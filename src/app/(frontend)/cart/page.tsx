import CartClient from '@/components/cart/CartClient';
import { getAllProducts } from '@/data/products';

export const metadata = { title: 'Your Cart' };
export const revalidate = 60;

export default async function CartPage() {
  const allProducts = await getAllProducts();
  return <CartClient allProducts={allProducts} />;
}
