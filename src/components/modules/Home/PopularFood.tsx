import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ThumbsDown, ThumbsUpIcon } from "lucide-react";
import Image from "next/image";

export default function PopularFood() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 font-arima">
      <h2 className="text-2xl md:text-[37px] tracking-tighter font-semibold">
        <span className="text-amber-500">See the Sizzling </span>Tastes
        <span className="text-amber-500"> of Some</span> Popular Cities{" "}
      </h2>
      <div id="pc-carousel" className="py-5">
        <Carousel className="w-full max-w-full">
          <CarouselContent className="-ml-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1/2 lg:basis-1/3"
              >
                <div className="px-4">
                  <div className="">
                    <div className="bg-white shadow-md rounded overflow-hidden relative border">
                      <a href="/bharatpur/gopal-mishthan-bhandar-ki-daal-kachauri-laxman-temple">
                        <Image
                          src="/assets/joinUs.png"
                          width={500}
                          height={500}
                          alt="Gopal Mishthan Bhandar ki Daal Kachauri"
                          //   onError={(e) =>
                          //     (e.currentTarget.src =
                          //       "https://s3-ap-southeast-1.amazonaws.com/img.tasteofcity.com/tasteimages/taste_blank.jpg")
                          //   }
                          className="w-full h-[150px] object-cover"
                        />
                      </a>

                      {/* Like & Comment Section */}
                      <div
                        // onClick={() =>
                        //   (window.location.href =
                        //     "/bharatpur/gopal-mishthan-bhandar-ki-daal-kachauri-laxman-temple")
                        // }
                        className="absolute top-2 right-2 flex items-center gap-2 cursor-pointer bg-white/80 rounded px-2 py-1"
                      >
                        <div className="flex items-center gap-1">
                          <ThumbsUpIcon />
                          <span className="text-sm">0</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsDown />
                          <span className="text-sm">0</span>
                        </div>
                      </div>

                      {/* Footer */}
                      <a href="/bharatpur/gopal-mishthan-bhandar-ki-daal-kachauri-laxman-temple">
                        <div className="px-4 py-3 bg-gray-50 border-t flex justify-between items-center">
                          <div>
                            <h3 className="text-sm font-semibold leading-tight">
                              Gopal Mishthan Bhandar ki Daal Kachauri
                            </h3>
                            <h4 className="text-xs text-gray-600">
                              Bharatpur, Rajasthan
                            </h4>
                          </div>
                          <span className="text-sm font-bold text-gray-700 bg-amber-500 p-1">
                            0.0
                          </span>
                        </div>
                      </a>
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
