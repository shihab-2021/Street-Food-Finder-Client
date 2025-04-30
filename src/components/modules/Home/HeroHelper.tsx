"use client";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@/components/ui/carousel";
import Fade from "embla-carousel-fade";

export default function HeroHelper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 5000,
        }),
        Fade(),
      ]}
    >
      {children}
    </Carousel>
  );
}
