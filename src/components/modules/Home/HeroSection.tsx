"use server";
import {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SlideImg1 from "@/assets/hero1.jpg";
import SlideImg2 from "@/assets/hero2.jpg";
import SlideImg3 from "@/assets/hero3.jpg";
import SlideImg4 from "@/assets/hero4.jpg";
import SlideImg5 from "@/assets/hero5.jpg";
import SlideImg6 from "@/assets/hero6.jpg";
import Image from "next/image";
import HeroHelper from "./HeroHelper";
import Link from "next/link";
// import SlideImg4 from "@/assets/hero4.jpg";

export default async function HeroSection() {
  return (
    <div id="carousel" className="font-arima">
      <HeroHelper>
        <CarouselContent className="max-h-[100vh]">
          {[
            SlideImg1,
            SlideImg2,
            SlideImg3,
            SlideImg4,
            SlideImg5,
            SlideImg6,
          ].map((image, index) => (
            <CarouselItem key={index} className="relative overflow-hidden">
              <div className="relative h-[100vh] overflow-hidden">
                {/* Premium image treatment */}
                <Image
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                  src={image}
                  alt={`Culinary experience slide ${index + 1}`}
                  priority={index === 0}
                />

                {/* Premium gradient overlay instead of simple opacity */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80"></div>

                {/* Content container with refined positioning */}
                <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
                  {/* Decorative element */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="h-px w-8 bg-amber-400"></div>
                    <span className="mx-3 text-amber-400 text-xs tracking-widest uppercase font-light">
                      Exclusive Taste
                    </span>
                    <div className="h-px w-8 bg-amber-400"></div>
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight leading-none max-w-3xl">
                    Discover the{" "}
                    <span className="text-amber-400">Exceptional</span> Tastes
                    of Your City!
                  </h1>

                  <h2 className="text-xl text-gray-200 mb-8 max-w-xl">
                    Embark on a culinary journey with our expert-led food
                    experiences
                  </h2>

                  {/* Premium button styling */}
                  <Link
                    href={"/addtaste"}
                    className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-white font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-lg font-sansita"
                  >
                    Join Our Food Squad
                  </Link>
                </div>

                {/* Slide indicator dots */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {[0, 1, 2, 3, 4, 5].map((dot) => (
                    <div
                      key={dot}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === dot ? "w-6 bg-amber-400" : "bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </HeroHelper>
    </div>
  );
}
