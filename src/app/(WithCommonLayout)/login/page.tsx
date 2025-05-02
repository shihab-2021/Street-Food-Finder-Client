/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { setUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

const LoginPage = () => {
  const form = useForm();
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  const router = useRouter();

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await login(data).unwrap();
      const user = verifyToken(res.data.accessToken);
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      // setIsLoading(true);
      console.log(res);
      if (res?.success) {
        toast.success("Successfully Logged In!");
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/");
        }
      } else {
        toast.error(res?.error);
      }
    } catch (err: any) {
      console.error(err);
    }
  };
  return (
    <>
      <div className="min-h-screen flex justify-center items-center font-arima">
        <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5">
          <div className="flex items-center space-x-4 mb-4">
            {/* <Image src={Logo} alt="logo" className="w-32" /> */}
            <div>
              <h1 className="text-xl font-semibold">Sign In</h1>
              <p className="font-extralight text-sm text-gray-600">
                Please sign in to continue to your account
              </p>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                          className="pl-9 mb-2"
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
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="mt-5 w-full cursor-pointer">
                {isSubmitting ? "Logging...." : "Login"}
              </Button>
            </form>
          </Form>
          <p className="text-sm text-gray-600 text-center my-3">
            Do not have any account?{" "}
            <Link
              href="/register"
              className="text-blue-400 underline font-semibold hover:text-blue-500 "
            >
              Register
            </Link>
          </p>
          {/* <div className="flex justify-center gap-4 mt-4">
            <button
              className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full shadow-md hover:bg-gray-200"
              //   onClick={() => handleOAuthLogin("google")}
            >
              <Image
                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
                width={30}
                height={30}
                alt="Google logo"
              />
            </button>
            <button
              className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full shadow-md hover:bg-gray-200"
              //   onClick={() => handleOAuthLogin("github")}
            >
              <Image
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                width={25}
                height={25}
                alt="GitHub logo"
              />
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default LoginPage;
