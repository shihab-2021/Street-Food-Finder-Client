"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetAllPostQuery } from "@/redux/features/post/postApi";
import Image from "next/image";
import Link from "next/link";

export default function WeeklyFood() {
  const { data: posts, isLoading } = useGetAllPostQuery(undefined, {
    refetchOnFocus: true,
  });
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 font-arima">
      <h2 className="text-2xl md:text-[37px] tracking-tighter font-semibold">
        Tastes
        <span className="text-amber-500"> of the </span>Week
      </h2>
      <div id="pc-carousel" className="py-5">
        <Carousel className="w-full max-w-full">
          <CarouselContent className="-ml-1">
            {posts?.data?.map((post: any, index: number) => (
              <CarouselItem
                key={post.id}
                className="pl-1 md:basis-1/3 lg:basis-1/4"
              >
                <div className="px-4">
                  <div className="">
                    <div className="bg-white shadow-md rounded overflow-hidden relative border">
                      <Link href={`/postDetails/${post.id}`}>
                        <Image
                          src={post.image || "/assets/joinUs.png"}
                          width={500}
                          height={500}
                          alt="food image"
                          className="w-full h-[150px] object-cover"
                        />
                      </Link>
                      {/* Like & Comment Section */}
                      {post?.isPremium && (
                        <div className="absolute top-2 right-2">
                          <span className="p-1 text-xs bg-[#FFD700] mx-2 text-yellow-900 shadow-lg rounded font-bold">
                            PRO
                          </span>
                        </div>
                      )}

                      {/* Footer */}
                      <Link href={`/postDetails/${post.id}`}>
                        <div className="px-4 py-3 bg-gray-50 border-t flex justify-between items-center">
                          <div>
                            <h3 className="text-sm font-semibold leading-tight">
                              {post.title}
                            </h3>
                            <h4 className="text-xs text-gray-600">
                              {post.location}
                            </h4>
                          </div>
                          {/* <span className="text-sm font-bold text-gray-700 bg-amber-500 p-1">
                            0.0
                          </span> */}
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
