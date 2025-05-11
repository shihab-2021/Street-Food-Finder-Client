"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { GemIcon, ThumbsDown, ThumbsUpIcon } from "lucide-react";
import Image from "next/image";
import DemoTaste1 from "@/assets/hero2.jpg";
import DemoTaste2 from "@/assets/hero5.jpg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import { useProfileQuery } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";

const demoTastes = [
  {
    title: "Burger King in Chinhat",
    image: DemoTaste1,
    location: "Near Powerhouse, Shubornopur, Gazipur",
  },
  {
    title: "Sandwich Master",
    image: DemoTaste2,
    location: "Near Powerhouse, Shubornopur, Gazipur",
  },
];

export default function PopularFood() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = useAppSelector(useCurrentToken);
  const { data: profile } = useProfileQuery(token);
  const router = useRouter();

  const handleClickCard = () => {
    if (profile?.data?.isPremium) {
      router.push("/proPosts");
    } else {
      setIsModalOpen(true);
    }
  };
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 font-arima">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <div>
            <div className="p-8 max-w-md w-full text-center relative font-sansita">
              {/* Premium Badge */}
              <div className="mb-4">
                <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Premium Access
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Upgrade to Premium
              </h2>
              <p className="text-gray-600 text-sm mb-6">
                Unlock all food posts, premium reviews, and exclusive offers.
                Enjoy the full experience!
              </p>

              {/* Call to Action */}
              <button
                onClick={() => router.push("/subscription")}
                className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:from-orange-600 hover:to-yellow-500 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-300 w-full cursor-pointer"
              >
                Upgrade Now 🚀
              </button>

              {/* Footer Link */}
              <p className="text-xs text-gray-400 mt-4">
                Already subscribed?{" "}
                <span
                  onClick={() => router.push("/login")}
                  className="text-orange-500 hover:underline cursor-pointer"
                >
                  Login
                </span>
              </p>
            </div>
            {/* <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            </div> */}
          </div>
        </DialogContent>
      </Dialog>
      <h2 className="text-2xl md:text-[37px] tracking-tighter font-semibold">
        <span className="text-amber-500">See the Sizzling </span>Tastes
        <span className="text-amber-500"> of Some</span> Popular Cities{" "}
      </h2>
      <div id="pc-carousel" className="py-5">
        <Carousel className="w-full max-w-full">
          <CarouselContent className="-ml-1">
            {demoTastes?.map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div
                  onClick={() => handleClickCard()}
                  className="px-4 cursor-pointer"
                >
                  <div className="">
                    <div className="bg-white shadow-md rounded overflow-hidden relative border">
                      <Image
                        src={_.image || "/assets/joinUs.png"}
                        width={500}
                        height={500}
                        alt="food image"
                        className="w-full h-[150px] object-cover"
                      />

                      {/* Like & Comment Section */}
                      <div className="absolute top-2 right-2 flex items-center gap-2 cursor-pointer bg-white/80 rounded px-2 py-1">
                        <div className="flex items-center gap-1">
                          <ThumbsUpIcon />
                          <span className="text-sm">9</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsDown />
                          <span className="text-sm">1</span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="px-4 py-3 bg-gray-50 border-t flex justify-between items-center">
                        <div>
                          <h3 className="text-sm font-semibold leading-tight">
                            {_.title}
                          </h3>
                          <h4 className="text-xs text-gray-600">
                            {_.location}
                          </h4>
                        </div>
                        <span className="text-sm font-bold text-gray-700 bg-amber-500 p-1">
                          4.6
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}

            <CarouselItem className="pl-1 md:basis-1/2 lg:basis-1/3">
              <div className="px-4 flex items-center justify-center h-full">
                <button
                  onClick={() => router.push("/subscription")}
                  className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:from-orange-600 hover:to-yellow-500 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-300 cursor-pointer flex items-center gap-2"
                >
                  <GemIcon /> Upgrade Now
                </button>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
