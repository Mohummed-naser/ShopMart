"use client";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { CartResponse } from "../interface";
export const CartContext = createContext<{
  cartData: CartResponse | null;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void; //void mean don't return anything
  setCartData: (value: CartResponse | null) => void;
  getCart: () => void;
  cartOwner: CartResponse["data"] | null;
  setCartOwner: (value: CartResponse["data"] | null) => void;
}>({
  cartData: null,
  isLoading: false,
  setIsLoading: () => {},
  setCartData: () => {},
  getCart: () => {},
  setCartOwner: () => {},
  cartOwner: null,
}); //generic in typescript ==> < >
export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartData, setCartData] = useState<CartResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [cartOwner, setCartOwner] = useState<string | null>(null);
  const [cartOwner, setCartOwner] = useState<CartResponse["data"] | null>(null);

  async function getCart() {
    setIsLoading(true);
    const response = await fetch("http://localhost:3000/api/get-cart"); //Route Handler
    const data: CartResponse = await response.json();
    setCartData(data);
    setCartOwner(data.data);
    setIsLoading(false);
    // console.log(data);
    // console.log(data.data.cartOwner);
  }
  useEffect(() => {
    getCart();
  }, []);
  return (
    <>
      <CartContext.Provider
        value={{
          cartData,
          isLoading,
          setIsLoading,
          setCartData,
          getCart,
          setCartOwner,
          cartOwner,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}
