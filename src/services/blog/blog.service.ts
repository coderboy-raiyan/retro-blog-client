import env from "@/env";
import { TBlog, TServiceOptions } from "@/types";
import axios from "axios";
import { cookies } from "next/headers";

const APP_URL = `${env.BACKEND_URL}/v1/posts`;

const blogServices = {
  getBlogPosts: async (
    params?: { isFeature?: boolean; search?: string },
    options?: TServiceOptions,
  ) => {
    try {
      const url = new URL(APP_URL);

      if (params && Object.values(params)?.length) {
        Object.entries(params)?.forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value as string);
          }
        });
      }

      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options?.cache;
      }
      if (options?.revalidate) {
        config.next = { revalidate: options?.revalidate };
      }

      if (options?.tags?.length) {
        config.next = { tags: options?.tags };
      }

      const res = await fetch(url.toString(), config);
      const data = await res.json();

      return data;
    } catch (error: any) {
      return { data: null, error: error?.message || "Something went wrong!" };
    }
  },
  getBlogById: async (id: string, options?: TServiceOptions) => {
    const config: RequestInit = {};

    if (options?.cache) {
      config.cache = options?.cache;
    }

    if (options?.revalidate) {
      config.next = { revalidate: options?.revalidate };
    }

    const res = await fetch(`${APP_URL}/${id}`, config);
    const data = await res.json();
    return data;
  },

  postBlog: async (payload: Partial<TBlog>) => {
    try {
      const cookieStore = await cookies();

      const res = await axios.post(`${APP_URL}`, payload, {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      return {
        data: res.data,
        status: res.status,
        statusText: res.statusText,
      };
    } catch (error) {
      return {
        data: null,
        status: 500,
        error: "Something went wrong",
      };
    }
  },
};

export default blogServices;
