"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export interface ITaste {
  title: string;
  description: string;
  priceRange: string;
  location: string;
  categoryId: string;
  status: string;
  isPremium: boolean;
  images: File[];
}

export default function TasteInfoForm() {
  const form = useForm<ITaste>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = form;

  const categoryOptions = [
    "Smoothies",
    "Breakfast Bowls",
    "Pasta",
    "Harvest Bowls",
    "Grains",
    "Soups",
    "Snacks",
  ];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    {
    }
  };
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title / Taste Name *</Label>
              <Input
                id="title"
                {...register("title", {
                  required: "Taste name is required",
                })}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="priceRange">Price Range *</Label>
              <Input
                id="priceRange"
                {...register("priceRange", {
                  required: "Price Range is required",
                })}
              />
              {errors.priceRange && (
                <p className="text-sm text-red-500">
                  {errors.priceRange.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                onValueChange={(value) => setValue("categoryId", value)}
                {...register("categoryId", {
                  required: "Category is required",
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.categoryId && (
                <p className="text-sm text-red-500">
                  {errors.categoryId.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                {...register("description", {
                  required: "Description is required",
                })}
                className="h-24"
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          {/* Image Upload */}
          {/* <div className="space-y-4">
            <Label>Meal Images</Label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, JPEG (MAX. 5MB each)
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  // {...register("images", {
                  //   required: "Meal image is required",
                  // })}
                />
              </label>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              {images.map((file, index) => (
                <div
                  key={index}
                  className="mt-4 relative group w-fit border rounded-lg p-1 flex"
                >
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="Logo preview"
                    width={100}
                    height={100}
                    className="w-40 object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div> */}

          {/* <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating Meal...
              </div>
            ) : (
              "Create Meal"
            )}
          </Button> */}
        </form>
      </Form>
    </div>
  );
}
