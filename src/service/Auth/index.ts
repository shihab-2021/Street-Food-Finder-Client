import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

// export const getCurrentUser = async () => {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("accessToken")?.value;
//   console.log(token);
//   const accessToken = (await cookies()).get("accessToken")?.value;
//   let decodedData = null;

//   if (accessToken) {
//     decodedData = await jwtDecode(accessToken);
//     console.log(decodedData);
//     return decodedData;
//   } else {
//     return null;
//   }
// };

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data?.data);
    return data?.data;
  } catch (error: any) {
    return Error(error.message);
  }
};
