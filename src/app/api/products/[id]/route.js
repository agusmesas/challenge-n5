import { NextResponse } from "next/server";

export async function GET(request, { params: { id } }) {
  const response = await fetch('http://localhost:3000/api/products');
  const data = await response.json();

  return new Promise((resolve) => {
    setTimeout(() => {
      const productDetail = data.find(product => product.id === Number(id));

      resolve(NextResponse.json(productDetail));
    }, 500);
  });
}
