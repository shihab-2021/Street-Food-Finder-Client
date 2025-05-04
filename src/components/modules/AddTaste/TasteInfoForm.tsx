/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// "use client";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { getAlLCategory } from "@/service/Category";
// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

// export interface ITaste {
//   title: string;
//   description: string;
//   priceRange: string;
//   location: string;
//   categoryId: string;
//   status: string;
//   isPremium: boolean;
//   images: File[];
// }

// export default function TasteInfoForm() {
//   const form = useForm<ITaste>();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     reset,
//   } = form;

//   const categoryOptions = [
//     "Smoothies",
//     "Breakfast Bowls",
//     "Pasta",
//     "Harvest Bowls",
//     "Grains",
//     "Soups",
//     "Snacks",
//   ];

//   const fetchData = async () => {
//     const data = await getAlLCategory();
//     console.log(data.data);
//   };

//   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//     {

//     }
//   };
//   return (
//     <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
//       <Form {...form}>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           {/* Basic Information */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="title">Title / Taste Name *</Label>
//               <Input
//                 id="title"
//                 {...register("title", {
//                   required: "Taste name is required",
//                 })}
//               />
//               {errors.title && (
//                 <p className="text-sm text-red-500">{errors.title.message}</p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="priceRange">Price Range *</Label>
//               <Input
//                 id="priceRange"
//                 {...register("priceRange", {
//                   required: "Price Range is required",
//                 })}
//               />
//               {errors.priceRange && (
//                 <p className="text-sm text-red-500">
//                   {errors.priceRange.message}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="category">Category *</Label>
//               <Select
//                 onValueChange={(value) => setValue("categoryId", value)}
//                 {...register("categoryId", {
//                   required: "Category is required",
//                 })}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {categoryOptions.map((option) => (
//                     <SelectItem key={option} value={option}>
//                       {option}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//               {errors.categoryId && (
//                 <p className="text-sm text-red-500">
//                   {errors.categoryId.message}
//                 </p>
//               )}
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="description">Description *</Label>
//               <Textarea
//                 id="description"
//                 {...register("description", {
//                   required: "Description is required",
//                 })}
//                 className="h-24"
//               />
//               {errors.description && (
//                 <p className="text-sm text-red-500">
//                   {errors.description.message}
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Image Upload */}
//           {/* <div className="space-y-4">
//             <Label>Meal Images</Label>
//             <div className="flex items-center justify-center w-full">
//               <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
//                 <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                   <Upload className="w-8 h-8 mb-4 text-gray-500" />
//                   <p className="mb-2 text-sm text-gray-500">
//                     <span className="font-semibold">Click to upload</span> or
//                     drag and drop
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     PNG, JPG, JPEG (MAX. 5MB each)
//                   </p>
//                 </div>
//                 <input
//                   type="file"
//                   className="hidden"
//                   multiple
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   // {...register("images", {
//                   //   required: "Meal image is required",
//                   // })}
//                 />
//               </label>
//             </div>
//             <div className="flex flex-wrap gap-4 mt-4">
//               {images.map((file, index) => (
//                 <div
//                   key={index}
//                   className="mt-4 relative group w-fit border rounded-lg p-1 flex"
//                 >
//                   <Image
//                     src={URL.createObjectURL(file)}
//                     alt="Logo preview"
//                     width={100}
//                     height={100}
//                     className="w-40 object-contain"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => removeImage(index)}
//                     className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div> */}

//           {/* <Button type="submit" className="w-full" disabled={isSubmitting}>
//             {isSubmitting ? (
//               <div className="flex items-center gap-2">
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                 Creating Meal...
//               </div>
//             ) : (
//               "Create Meal"
//             )}
//           </Button> */}
//         </form>
//       </Form>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getAlLCategory } from "@/service/Category";
import { toast } from "sonner";
import { createPost } from "@/service/Posts";

interface CategoryType {
  id: string;
  name: string;
}

interface ITasteForm {
  title: string;
  description: string;
  location: string;
  priceRange: string;
  categoryId: string;
  image: File | null;
}

export default function TasteForm() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ITasteForm>({
    defaultValues: {
      title: "",
      description: "",
      location: "",
      priceRange: "",
      categoryId: "",
      image: null,
    },
    mode: "onChange",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = form;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAlLCategory();
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchData();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.success("Image size should not exceed 10MB");
        return;
      }
      setValue("image", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // const onSubmit: SubmitHandler<ITasteForm> = async (data) => {
  //   setIsSubmitting(true);
  //   try {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("title", data.title);
  //     formData.append("description", data.description);
  //     formData.append("location", data.location);
  //     formData.append("priceRange", data.priceRange);
  //     formData.append("categoryId", data.categoryId);
  //     if (data.image) {
  //       formData.append("image", data.image);
  //     }

  //     console.log("Submitting:", Object.fromEntries(formData));
  //     const result = await createPost(formData);
  //     console.log( result)
  //     reset();
  //     setPreview(null);
  //     toast.success("Form submitted successfully!");
  //   } catch (error) {
  //     console.error("Submission failed:", error);
  //     toast.error("Failed to submit form. Please try again.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const onSubmit: SubmitHandler<ITasteForm> = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Send the file under the key 'file'
      if (data.image) {
        formData.append("file", data.image);
      }

      // Send other form data as a JSON string under 'data'
      const otherData = {
        title: data.title,
        description: data.description,
        location: data.location,
        priceRange: data.priceRange,
        categoryId: data.categoryId,
      };

      formData.append("data", JSON.stringify(otherData));

      const result = await createPost(formData);

      reset();
      setPreview(null);
      toast.success("Form submitted successfully!");
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border font-sansita">
        <h1 className="text-3xl font-bold text-[#232536] mb-6 text-center">
          Create a New Taste
        </h1>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <FormField
              name="title"
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#232536] font-semibold">
                    Title *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter taste name"
                      className="border-[#232536] focus:ring-[#FFD046] focus:border-[#FFD046]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              name="description"
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#232536] font-semibold">
                    Description *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Describe the taste"
                      className="border-[#232536] focus:ring-[#FFD046] focus:border-[#FFD046]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Location */}
            <FormField
              name="location"
              rules={{ required: "Location is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#232536] font-semibold">
                    Location *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter location"
                      className="border-[#232536] focus:ring-[#FFD046] focus:border-[#FFD046]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Price Range */}
            <FormField
              name="priceRange"
              rules={{ required: "Price range is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#232536] font-semibold">
                    Price Range *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. 100Tk - 500Tk"
                      className="border-[#232536] focus:ring-[#FFD046] focus:border-[#FFD046]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              name="categoryId"
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#232536] font-semibold">
                    Category *
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-[#232536] focus:ring-[#FFD046] focus:border-[#FFD046]">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Image Upload */}
            <FormField
              name="image"
              rules={{ required: "Image is required" }}
              render={() => (
                <FormItem>
                  <FormLabel className="text-[#232536] font-semibold">
                    Upload Image *
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#232536] rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-[#232536]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 16V8m0 0L3 12m4-4l4 4m6 4v-8m0 0l4-4m-4 4l-4 4"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-[#232536]">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-[#232536]">
                            PNG, JPG, JPEG (MAX. 5MB)
                          </p>
                        </div>
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Image Preview */}
            {preview && (
              <div className="mt-4">
                <Image
                  src={preview}
                  alt="Preview"
                  width={200}
                  height={200}
                  className="rounded-lg border border-[#232536] object-cover"
                />
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-[#FFD046] text-[#232536] hover:bg-[#e6b83e] font-semibold py-3 rounded-lg transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#232536] border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </div>
              ) : (
                "Submit Taste"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
