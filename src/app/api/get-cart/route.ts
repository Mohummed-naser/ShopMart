import { CartResponse } from "@/components/interface";
import { getUserToken } from "@/Helper/getUserToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const token = await getUserToken();
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
    headers: {
     token: token!,
    },
  });
  const data: CartResponse = await response.json();
  return NextResponse.json(data);
}
