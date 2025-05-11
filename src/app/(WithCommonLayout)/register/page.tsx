"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSignupMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Register() {
  const form = useForm();
  const [signup] = useSignupMutation();
  const router = useRouter();

  const {
    formState: { isSubmitting },
  } = form;

  const password = form.watch("password");
  const passwordConfirm = form.watch("passwordConfirm");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));

      const res = await signup(formData).unwrap();
      //   setIsLoading(true);
      if (res?.success) {
        toast.success(res?.message);
        router.push("/login");
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center font-arima">
      <div className="border-2 border-gray-200 shadow-lg rounded-2xl flex-grow max-w-md w-full p-6 bg-white my-20">
        {/* Logo & Title */}
        <div className="flex items-center space-x-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Register</h1>
            <p className="text-sm text-gray-500">
              Join us today and start your journey!
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-5 space-y-4"
          >
            {/* Form Fields */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1.5 text-gray-400">
                        👤
                      </span>
                      <Input
                        {...field}
                        value={field.value || ""}
                        className="pl-9"
                        required
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1.5 text-gray-400">
                        📧
                      </span>
                      <Input
                        type="email"
                        {...field}
                        value={field.value || ""}
                        className="pl-9"
                        required
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1.5 text-gray-400">
                        🔒
                      </span>
                      <Input
                        type="password"
                        {...field}
                        value={field.value || ""}
                        className="pl-9"
                        required
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1.5 text-gray-400">
                        🔒
                      </span>
                      <Input
                        type="password"
                        {...field}
                        value={field.value || ""}
                        className="pl-9"
                        required
                      />
                    </div>
                  </FormControl>
                  {passwordConfirm && password !== passwordConfirm ? (
                    <FormMessage> ❌ Passwords do not match</FormMessage>
                  ) : (
                    <FormMessage />
                  )}
                </FormItem>
              )}
            />

            {/* Register Button */}
            <Button
              disabled={
                password && passwordConfirm && password !== passwordConfirm
                  ? true
                  : false
              }
              type="submit"
              className="mt-5 w-full cursor-pointer"
            >
              {isSubmitting ? "Registering...." : "Register"}
            </Button>
          </form>
        </Form>

        {/* Login Link */}
        <p className="text-sm text-gray-600 text-center my-4">
          Already have an account?
          <Link
            href="/login"
            className="text-blue-400 underline font-semibold hover:text-blue-500 "
          >
            {" "}
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
