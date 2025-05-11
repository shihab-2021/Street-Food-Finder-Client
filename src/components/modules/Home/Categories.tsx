// "use client";
// import { useGetAllCategoryQuery } from "@/redux/features/category/categoryApi";
import { getAlLCategory } from "@/service/Category";
import Image from "next/image";
import Link from "next/link";

export default async function Categories() {
  // const { data: categories, isLoading } = useGetAllCategoryQuery(undefined, {
  //   refetchOnFocus: true,
  // });
  const categories = await getAlLCategory();
  return (
    <div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 font-arima">
        <h2 className="text-2xl md:text-[37px] tracking-tighter font-semibold">
          Categories
        </h2>
        <div className="py-5 grid grid-cols-4 gap-4">
          {categories?.data?.map((category: any, index: number) => (
            <Link
              href={`/tastes?category=${category?.name}`}
              key={category?.id}
              className="border p-2 shadow-lg rounded-lg"
            >
              <div>
                <Image
                  className="mx-auto"
                  src={category?.image || "/assets/joinUs.png"}
                  alt="category image"
                  width={100}
                  height={100}
                />
              </div>
              <h1 className="font-bold text-center mt-2">{category?.name}</h1>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
