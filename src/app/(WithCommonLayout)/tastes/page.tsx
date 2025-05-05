"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { MessageSquare, Search, Sliders } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useGetAllPostQuery } from "@/redux/features/post/postApi";
import Link from "next/link";
import { getAlLCategory } from "@/service/Category";

export default function Tastes() {
  const searchParams = useSearchParams();
  const { data: meals, isLoading } = useGetAllPostQuery(undefined, {
    refetchOnFocus: true,
  });
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const query = searchParams.get("category");

  useEffect(() => {
    const getCategory = async () => {
      const categories = await getAlLCategory();
      setCategories(categories?.data);
      return categories?.data;
    };
    getCategory();
  }, []);

  useEffect(() => {
    if (query) {
      const findCat = categories?.find(
        (category: any) => category.name === query
      ) as any;
      setSelectedCategory(findCat?.id);
    }
  }, [query, categories]);

  const filteredMeals = meals?.data?.filter((meal: any) => {
    const matchesSearch = meal?.title
      ?.toLowerCase()
      .includes(searchTerm?.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || meal.categoryId === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-20 font-sansita">
      {/* Filters Section */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search tastes..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-60">
              <Sliders className="mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"all"}>All</SelectItem>
              {categories?.map((category: any) => (
                <SelectItem key={category?.id} value={category?.id}>
                  {category?.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Meal Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-56 rounded-xl" />
          ))}
        </div>
      ) : filteredMeals?.length === 0 ? (
        <div className="text-center py-12 space-y-4">
          <p className="text-xl text-muted-foreground">
            No tastes found matching your criteria
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMeals?.map((meal: any) => (
            <Link href={`/postDetails/${meal?.id}`} key={meal?.id} className="">
              <div className="bg-white shadow-md rounded overflow-hidden relative border">
                <Image
                  src={meal?.image || "/assets/joinUs.png"}
                  width={500}
                  height={500}
                  alt="Taste image"
                  className="w-full h-[150px] object-cover"
                />

                {/* Like & Comment Section */}
                <div className="absolute top-2 right-2 flex items-center gap-2 cursor-pointer bg-white/80 rounded px-2 py-1">
                  <div className="flex items-center gap-1">
                    <MessageSquare />
                    <span className="text-sm">
                      {meal?.comments?.length || 0}
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-4 py-3 bg-gray-50 border-t flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-semibold leading-tight">
                      {meal?.title}
                    </h3>
                    <h4 className="text-xs text-gray-600">{meal?.title}</h4>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
