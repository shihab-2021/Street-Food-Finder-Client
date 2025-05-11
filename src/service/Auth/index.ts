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

// export const getCurrentUser = async () => {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("accessToken")?.value;
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/me`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const data = await res.json();
//     return data?.data;
//   } catch (error: any) {
//     return Error(error.message);
//   }
// };

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) return null;

  try {
    let res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/me`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401) {
      // Refresh token
      const refreshRes = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (refreshRes.ok) {
        const newToken = (await refreshRes.json()).accessToken;
        cookieStore.set("accessToken", newToken, {
          secure: true,
          sameSite: "strict",
        });
        // Retry user fetch
        res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/user/me`, {
          method: "GET",
          headers: { Authorization: `Bearer ${newToken}` },
        });
      } else {
        return null;
      }
    }

    if (!res.ok) return null;
    const data = await res.json();
    return data?.data || null;
  } catch (error: any) {
    console.error("Error fetching user:", error.message);
    return null;
  }
};
