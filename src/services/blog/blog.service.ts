import env from "@/env";
const APP_URL = `${env.BACKEND_URL}/v1/posts`;

const blogServices = {
  getBlogPosts: async (
    params?: { isFeature?: boolean; search?: string },
    options?: {
      cache?: RequestCache;
      revalidate?: number;
    },
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

      const res = await fetch(url.toString(), config);
      const data = await res.json();

      return data;
    } catch (error: any) {
      return { data: null, error: error?.message || "Something went wrong!" };
    }
  },
  getBlogById: async (
    id: string,
    options?: { cache?: RequestCache; revalidate?: number },
  ) => {
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
};

export default blogServices;
