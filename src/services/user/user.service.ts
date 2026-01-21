import env from "@/env";
import { cookies } from "next/headers";

export const userService = {
  getSession: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.BACKEND_URL}/auth/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const session = await res.json();
      if (!session?.user) {
        return { data: null, error: "Something went wrong!" };
      }
      return { data: session, error: null };
    } catch (error: any) {
      return { data: null, error: error?.message || "Something went wrong!" };
    }
  },
};
