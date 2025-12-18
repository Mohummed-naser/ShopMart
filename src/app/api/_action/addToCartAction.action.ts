'use server'

import { getUserToken } from "@/Helper/getUserToken";

//Server action
export async function addToCartActionAction(productId: string) {
 const token= await getUserToken()
  const response = await fetch(`${process.env.API_URL}/cart`, {
    method: "POST",
    body: JSON.stringify({ productId }), //Convert JavaScript object → Raw JSON string //==>To convert data into raw JSON in JavaScript
    headers: {
      token: token!,
      'content-type':"application/json" // for row json,
    },
  });
  const data = await response.json();
  return data
}
