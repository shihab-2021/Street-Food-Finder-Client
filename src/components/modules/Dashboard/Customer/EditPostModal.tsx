// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useEffect, useState } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import { getAlLCategory } from "@/service/Category";
// import { toast } from "sonner";
// import { createPost } from "@/service/Posts";

// interface CategoryType {
//   id: string;
//   name: string;
// }

// interface ITasteForm {
//   title: string;
//   description: string;
//   location: string;
//   priceRange: string;
//   categoryId: string;
//   image: File | null;
// }

// interface TasteFormProps {
//   post?: any;
//   onClose?: () => void;
//   isEditMode?: boolean;
// }

// export default function TasteForm({ post, onClose, isEditMode = false }: TasteFormProps) {
//   const [categories, setCategories] = useState<CategoryType[]>([]);
//   const [preview, setPreview] = useState<string | null>(post?.image || null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const form = useForm<ITasteForm>({
//     defaultValues: {
//       title: post?.title || "",
//       description: post?.description || "",
//       location: post?.location || "",
//       priceRange: post?.priceRange || "",
//       categoryId: post?.categoryId || "",
//       image: null,
//     },
//     mode: "onChange",
//   });

//   const {
//     handleSubmit,
//     setValue,
//     formState: { errors },
//     reset,
//   } = form;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await getAlLCategory();
//         setCategories(res.data);
//       } catch (error) {
//         console.error("Failed to fetch categories:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.size > 10 * 1024 * 1024) {
//         toast.error("Image size should not exceed 10MB");
//         return;
//       }
//       setValue("image", file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const onSubmit: SubmitHandler<ITasteForm> = async (data) => {
//     setIsSubmitting(true);
//     try {
//       const formData = new FormData();
//       if (data.image) {
//         formData.append("file", data.image);
//       }
//       const otherData = {
//         title: data.title,
//         description: data.description,
//         location: data.location,
//         priceRange: data.priceRange,
//         categoryId: data.categoryId,
//       };
//       formData.append("data", JSON.stringify(otherData));

//       if (isEditMode && post?.id) {
//         // await updatePost(post.id, formData); 
//         toast.success("Post updated successfully!");
//       } else {
//         await createPost(formData);
//         toast.success("Post created successfully!");
//       }

//       reset();
//       setPreview(null);
//       if (onClose) onClose();
//     } catch (error) {
//       console.error("Submission failed:", error);
//       toast.error(`Failed to ${isEditMode ? "update" : "create"} post. Please try again.`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold text-[#232536] mb-6">
//         {isEditMode ? "Edit Post" : "Create a New Taste"}
//       </h1>
//       <Form {...form}>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           <FormField
//             name="title"
//             rules={{ required: "Title is required" }}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Title *</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="Enter taste name"
//                     className="border-[#232536] focus:ring-[#FFD046]"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage className="text-red-500" />
//               </FormItem>
//             )}
//           />
//           <FormField
//             name="description"
//             rules={{ required: "Description is required" }}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Description *</FormLabel>
//                 <FormControl>
//                   <Textarea
//                     rows={4}
//                     placeholder="Describe the taste"
//                     className="border-[#232536] focus:ring-[#FFD046]"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage className="text-red-500" />
//               </FormItem>
//             )}
//           />
//           <FormField
//             name="location"
//             rules={{ required: "Location is required" }}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Location *</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="Enter location"
//                     className="border-[#232536] focus:ring-[#FFD046]"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage className="text-red-500" />
//               </FormItem>
//             )}
//           />
//           <FormField
//             name="priceRange"
//             rules={{ required: "Price range is required" }}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Price Range *</FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="e.g. 100Tk - 500Tk"
//                     className="border-[#232536] focus:ring-[#FFD046]"
//                     {...field}
//                   />
//                 </FormControl>
//                 <FormMessage className="text-red-500" />
//               </FormItem>
//             )}
//           />
//           <FormField
//             name="categoryId"
//             rules={{ required: "Category is required" }}
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Category *</FormLabel>
//                 <Select
//                   onValueChange={field.onChange}
//                   defaultValue={field.value}
//                 >
//                   <FormControl>
//                     <SelectTrigger className="border-[#232536] focus:ring-[#FFD046]">
//                       <SelectValue placeholder="Select category" />
//                     </SelectTrigger>
//                   </FormControl>
//                   <SelectContent>
//                     {categories.map((cat) => (
//                       <SelectItem key={cat.id} value={cat.id}>
//                         {cat.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 <FormMessage className="text-red-500" />
//               </FormItem>
//             )}
//           />
//           <FormField
//             name="image"
//             render={() => (
//               <FormItem>
//                 <FormLabel>Upload Image</FormLabel>
//                 <FormControl>
//                   <div className="flex items-center justify-center w-full">
//                     <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#232536] rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
//                       <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                         <svg
//                           className="w-8 h-8 mb-4 text-[#232536]"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             d="M7 16V8m0 0L3 12m4-4l4 4m6 4v-8m0 0l4-4m-4 4l-4 4"
//                           />
//                         </svg>
//                         <p className="mb-2 text-sm text-[#232536]">
//                           <span className="font-semibold">Click to upload</span>{" "}
//                           or drag and drop
//                         </p>
//                         <p className="text-xs text-[#232536]">
//                           PNG, JPG, JPEG (MAX. 10MB)
//                         </p>
//                       </div>
//                       <Input
//                         type="file"
//                         accept="image/*"
//                         className="hidden"
//                         onChange={handleImageChange}
//                       />
//                     </label>
//                   </div>
//                 </FormControl>
//                 <FormMessage className="text-red-500" />
//               </FormItem>
//             )}
//           />
//           {preview && (
//             <div className="mt-4">
//               <Image
//                 src={preview}
//                 alt="Preview"
//                 width={200}
//                 height={200}
//                 className="rounded-lg border border-[#232536] object-cover"
//               />
//             </div>
//           )}
//           <div className="flex gap-4">
//             <Button
//               type="submit"
//               className="w-full bg-[#FFD046] text-[#232536] hover:bg-[#e6b83e]"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? (
//                 <div className="flex items-center gap-2">
//                   <div className="w-4 h-4 border-2 border-[#232536] border-t-transparent rounded-full animate-spin" />
//                   {isEditMode ? "Updating..." : "Submitting..."}
//                 </div>
//               ) : (
//                 <>{isEditMode ? "Update Post" : "Submit Taste"}</>
//               )}
//             </Button>
//             {onClose && (
//               <Button
//                 type="button"
//                 variant="outline"
//                 className="w-full border-[#232536] text-[#232536]"
//                 onClick={onClose}
//               >
//                 Cancel
//               </Button>
//             )}
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { createPost, updatePost } from "@/service/Posts";
import { X, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

interface TasteFormProps {
  post?: any;
  onClose?: () => void;
  isEditMode?: boolean;
}

export default function TasteForm({ post, onClose, isEditMode = false }: TasteFormProps) {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [preview, setPreview] = useState<string | null>(post?.image || null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ITasteForm>({
    defaultValues: {
      title: post?.title || "",
      description: post?.description || "",
      location: post?.location || "",
      priceRange: post?.priceRange || "",
      categoryId: post?.categoryId || "",
      image: null,
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isDirty },
    reset,
  } = form;

  const description = watch("description");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAlLCategory();
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        toast.error("Failed to load categories");
      }
    };
    fetchData();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("Image size should not exceed 10MB");
        return;
      }
      setValue("image", file, { shouldValidate: true });
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setValue("image", null);
    setPreview(null);
  };

  const handleCancel = () => {
    if (isDirty) {
      if (window.confirm("You have unsaved changes. Are you sure you want to cancel?")) {
        reset();
        setPreview(post?.image || null);
        if (onClose) onClose();
      }
    } else {
      if (onClose) onClose();
    }
  };

  const onSubmit: SubmitHandler<ITasteForm> = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      if (data.image) {
        formData.append("file", data.image);
      }
      const otherData = {
        title: data.title,
        description: data.description,
        location: data.location,
        priceRange: data.priceRange,
        categoryId: data.categoryId,
      };
      formData.append("data", JSON.stringify(otherData));

      if (isEditMode && post?.id) {
        await updatePost(post.id, formData); 
        toast.success("Post updated successfully!", { duration: 3000 });
      } else {
        await createPost(formData);
        toast.success("Post created successfully!", { duration: 3000 });
      }

      reset();
      setPreview(null);
      if (onClose) onClose();
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error(`Failed to ${isEditMode ? "update" : "create"} post. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto max-h-[80vh] overflow-y-auto">
  <h1 className="text-2xl font-bold text-[#232536] mb-6">
    {isEditMode ? "Edit Post" : "Create a New Taste"}
  </h1>
  <Form {...form}>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          name="title"
          rules={{ required: "Title is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#232536] font-medium">Title *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter taste name"
                  className="border-[#232536] focus:ring-[#FFD046] rounded-md"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500 flex items-center gap-1">
                {errors.title && <span className="text-xs">⚠ {errors.title.message}</span>}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          name="location"
          rules={{ required: "Location is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#232536] font-medium">Location *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter location"
                  className="border-[#232536] focus:ring-[#FFD046] rounded-md"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500 flex items-center gap-1">
                {errors.location && <span className="text-xs">⚠ {errors.location.message}</span>}
              </FormMessage>
            </FormItem>
          )}
        />
      </div>

      <FormField
        name="description"
        rules={{ required: "Description is required", maxLength: { value: 500, message: "Description cannot exceed 500 characters" } }}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#232536] font-medium">Description *</FormLabel>
            <FormControl>
              <Textarea
                rows={4}
                placeholder="Describe the taste"
                className="border-[#232536] focus:ring-[#FFD046] rounded-md"
                {...field}
              />
            </FormControl>
            <div className="text-sm text-gray-500 mt-1">
              {description?.length || 0}/500 characters
            </div>
            <FormMessage className="text-red-500 flex items-center gap-1">
              {errors.description && <span className="text-xs">⚠ {errors.description.message}</span>}
            </FormMessage>
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          name="priceRange"
          rules={{ required: "Price range is required" }}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel className="text-[#232536] font-medium">Price Range *</FormLabel>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info size={16} className="text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Example: 100Tk - 500Tk</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <FormControl>
                <Input
                  placeholder="e.g. 100Tk - 500Tk"
                  className="border-[#232536] focus:ring-[#FFD046] rounded-md"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500 flex items-center gap-1">
                {errors.priceRange && <span className="text-xs">⚠ {errors.priceRange.message}</span>}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          name="categoryId"
          rules={{ required: "Category is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#232536] font-medium">Category *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-[#232536] focus:ring-[#FFD046] rounded-md">
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
              <FormMessage className="text-red-500 flex items-center gap-1">
                {errors.categoryId && <span className="text-xs">⚠ {errors.categoryId.message}</span>}
              </FormMessage>
            </FormItem>
          )}
        />
      </div>

      <FormField
        name="image"
        render={() => (
          <FormItem>
            <FormLabel className="text-[#232536] font-medium">Upload Image</FormLabel>
            <FormControl>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-[#232536] rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-10 h-10 mb-3 text-[#232536]"
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
                    <p className="mb-2 text-sm text-[#232536] font-semibold">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 10MB)</p>
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
            <FormMessage className="text-red-500 flex items-center gap-1">
              {errors.image && <span className="text-xs">⚠ {errors.image.message}</span>}
            </FormMessage>
          </FormItem>
        )}
      />

      {preview && (
        <div className="mt-4 relative">
          <Image
            src={preview}
            alt="Preview"
            width={200}
            height={200}
            className="rounded-lg border border-[#232536] object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600"
            onClick={removeImage}
          >
            <X size={16} />
          </Button>
        </div>
      )}

      <div className="flex gap-4 mt-8">
        <Button
          type="submit"
          className="w-full bg-[#FFD046] text-[#232536] hover:bg-[#e6b83e] font-semibold rounded-md transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-[#232536] border-t-transparent rounded-full animate-spin" />
              {isEditMode ? "Updating..." : "Submitting..."}
            </div>
          ) : (
            <>{isEditMode ? "Update Post" : "Submit Taste"}</>
          )}
        </Button>
        {onClose && (
          <Button
            type="button"
            variant="outline"
            className="w-full border-[#232536] text-[#232536] hover:bg-gray-100 rounded-md"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  </Form>
</div>
  );
}