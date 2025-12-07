"use client";
import React, { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { DialogClose } from "@radix-ui/react-dialog";
import { Input } from "../ui/input";
export default function CheckOut({ cartId }: { cartId: string }) {
  let detailsInput = useRef<HTMLInputElement | null>(null);
  let phoneInput = useRef<HTMLInputElement | null>(null);
  let cityInput = useRef<HTMLInputElement | null>(null);

  //method checkOut
  async function checkOutSession() {
    const shippingAddress = {
      details: detailsInput.current?.value,
      phone: phoneInput.current?.value,
      city: cityInput.current?.value,
    };
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      {
        method: "POST",
        body: JSON.stringify({ shippingAddress }),
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MjBjZWZhZWQwZmEzYjU4ZGFiOGI4YiIsIm5hbWUiOiJhaG1lZCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY0NDU1MDY4LCJleHAiOjE3NzIyMzEwNjh9.Njfu67zT57TCgEVW4Ks9J5H6D8_lFo5ioW5MNHYK5vs",
          "content-type": "application/json",
        },
      }
    );
    const data = await response.json();
    // console.log(data);
    if (data.status == "success") {
      window.location.href = data.session.url;
    }
  }

  return (
    <>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button
              className="mt-6 w-full rounded-md py-6 font-medium  cursor-pointer bg-black text-white hover:bg-gray-900 hover:text-white"
              variant="outline"
            >
              Proceed to Checkout
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Address</DialogTitle>
              <DialogDescription>
                Add a shipping address for your deliveries.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label>City:</Label>
                <Input ref={detailsInput} type="text" id="City" name="City" />
              </div>
              <div className="grid gap-3">
                <Label>Details:</Label>
                <Input
                  ref={phoneInput}
                  type="text"
                  id="Details"
                  name="Details"
                />
              </div>
              <div className="grid gap-3">
                <Label>Phone number:</Label>
                <Input
                  ref={cityInput}
                  type="number"
                  id="Phone"
                  name="Phone number"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose className="me-auto" asChild>
                <Button className="cursor-pointer" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={() => checkOutSession()}
                className="cursor-pointer"
                type="submit"
              >
                Visa
              </Button>
              <Button className="cursor-pointer" type="submit">
                Cash
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
