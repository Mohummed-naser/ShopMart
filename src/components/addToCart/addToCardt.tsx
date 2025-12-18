"use client";
import React, { useContext, useState } from "react";
import { CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { HeartIcon, Loader, ShoppingCartIcon } from "lucide-react";
import toast from "react-hot-toast";
import { CartContext } from "../context/CartContext";
import { addToCartActionAction } from "@/app/api/_action/addToCartAction.action";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
//
export default function AddToCart({ productId }: { productId: string }) {
  const { getCart, setCartData } = useContext(CartContext);
  const [isloading, setIsLoading] = useState(false);
  const session = useSession()
  const router = useRouter();
  async function addProductTocart() {
    if (session.status=='authenticated') {
      setIsLoading(true);
    const data = await addToCartActionAction(productId); // Server action
    data.status == "success" && toast.success("product added successfully");
    // await getCart();
    setCartData(data);
    // console.log(data);
    setIsLoading(false);
    } else {
      router.push('/login')
   }
  }
  return (
    <CardFooter className="gap-2 mt-2">
      <Button onClick={addProductTocart} className="grow cursor-pointer ">
        {isloading ? <Loader className="animate-spin" /> : <ShoppingCartIcon />}
        Add to card
      </Button>
      <HeartIcon></HeartIcon>
    </CardFooter>
  );
}
