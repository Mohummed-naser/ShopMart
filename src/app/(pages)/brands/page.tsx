import { BrandI } from "@/components/interface";
import Image from "next/image";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
export default async function Brands() {
  const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
  const { data: brands }: { data: BrandI[] } = await response.json();
  // console.log(brands[0].name);
  return (
    <>
      <div className="mt-10 text-3xl">
        <h2>Brands</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 my-10 mx-10 xl:mx-0">
        {brands.map((brand) => (
          <div key={brand._id} className="cursor-pointer">
            <Card>
              <Link href={"/brands/" + brand._id}>
                <CardHeader className="text-center">
                  <Image
                    src={brand.image}
                    alt=""
                    className="w-full"
                    width={400}
                    height={400}
                  />
                  <CardTitle>{brand.name}</CardTitle>
                </CardHeader>
              </Link>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
