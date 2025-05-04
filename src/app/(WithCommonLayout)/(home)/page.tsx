import Categories from "@/components/modules/Home/Categories";
import HeroSection from "@/components/modules/Home/HeroSection";
import JoinUs from "@/components/modules/Home/JoinUs";
import PopularFood from "@/components/modules/Home/PopularFood";
import WeeklyFood from "@/components/modules/Home/WeeklyFood";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PopularFood />
      <JoinUs />
      <Categories />
      <WeeklyFood />
      {/* <WhyMealMart />
      <StartShopping />
      <FAQ /> */}
    </main>
  );
}
