"use client"; // for event click
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {signIn} from 'next-auth/react'
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { Loader } from "lucide-react";
const formSchema = z.object({
  email: z.email("invalid").nonempty("email is required"),
  password: z
    .string()
    .nonempty("password is required")
    .min(8, "password must be at least 8 characters")
    // .regex(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
    //   "password must contain uppercase, lowercase, and a number"
    // ),
});
type FormFields = z.infer<typeof formSchema>;
export default function Login() {
  // error in bath
  const searchParams = useSearchParams()
  console.log(searchParams.get('error'));
  const [isLoading, setIsLoading] = useState(false)
  // 1. Define your form.
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: FormFields) {
    setIsLoading(true)
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const response = await signIn('credentials', {
      email: values.email,
      password: values.password,
      callbackUrl: '/',
      redirect: true
    });
    // console.log(values);
    setIsLoading(false);

  }
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-[75vh]">
        <h2 className="my-3 text-2xl">Login</h2>
        <Card className="p-5 w-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="@example.com" {...field} />
                      {/* {...field} like register */}
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="" {...field} />
                      {/* {...field} like register */}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {searchParams.get("error") && (
                <h3 className="text-center text-red-700">
                  {searchParams.get("error")}
                </h3>
              )}
              <Button className="w-full cursor-pointer" type="submit">
                {isLoading&&<Loader className="animate-spin"/>}
                Login
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
}
